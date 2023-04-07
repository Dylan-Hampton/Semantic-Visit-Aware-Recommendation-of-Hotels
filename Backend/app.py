from flask import Flask, jsonify, request
from flask_api import status
from flask_cors import CORS

import sys

sys.path.insert(1, "./PaDOC-Query/")
import GreedySearch
from Experiment import random_walk_restart
from Experiment import greedy_dijkstra

from map_package.origin import get_origins
from map_package.index import get_index_from_pickle
from map_package.graph import get_ny_graph
from map_package.result import *

app = Flask(__name__)
CORS(app)


@app.route('/cities')
def cities():
    '''
    If we had a database for cities we could get the data from there.
    For now as we have one city, this is hard coded along with an extra
    city for the frontend to test their functionality.
    '''
    city_data = [{
        'cityName':
        'New York City',
        'poiTypes': ['Museum', 'Statue', 'Mall', 'Park', 'Zoo', 'Aquarium']
    }, {
        'cityName':
        'Chicago',
        'poiTypes':
        ['Museum', 'Restaurant', 'Beach', 'Market', 'Library', 'Book Store']
    }]
    return jsonify(city_data)


@app.route('/routes', methods=['POST'])
def routes():
    # TODO: Separate the setup parts (graph, index, origins) into different functions that can be called or ran on setup of Apache
    num_poi = 623

    g = get_ny_graph()
    ############################################################################################
    ############################################################################################
    ############################################################################################

    container_index = get_index_from_pickle(
        "./PaDOC-Query/PoI_Network/Index/MatrixContainer_NY_" + str(num_poi) +
        ".pickle")

    ############################################################################################
    ############################################################################################
    ############################################################################################
    origins, origin_name_mapping = get_origins(
        "./PaDOC-Query/PoI_Network/NY_ns.csv")

    g.rtree_build(origins)

    GREEDY_DIJKSTRA = 0
    RANDOM_WALK_RESTART = 1
    POI_FIRST = 2
    ORIGIN_FIRST = 3

    content = request.json

    algorithm = content['algorithm']
    theta = content['categories']
    max_dist = content['distance']
    num_required_origin = content['origins']

    # Not really sure what this should be set to, but for now 2 seems good
    max_time = 2

    route_res = None
    if (algorithm == GREEDY_DIJKSTRA):
        route_res = greedy_dijkstra(g,
                                    origins,
                                    theta,
                                    max_dist,
                                    num_required_origin,
                                    verbal=False,
                                    complexity=False)
    elif (algorithm == RANDOM_WALK_RESTART):
        route_res = random_walk_restart(g,
                                        origins,
                                        theta,
                                        max_dist,
                                        3 * max_time,
                                        num_required_origin,
                                        verbal=False,
                                        complexity=False)
    elif (algorithm == POI_FIRST):
        route_res = GreedySearch.greedy_process_PoI(g,
                                                    container_index,
                                                    theta,
                                                    max_dist,
                                                    origins,
                                                    num_required_origin,
                                                    index_matrix=True,
                                                    verbal=False,
                                                    complexity=False)
    elif (algorithm == ORIGIN_FIRST):
        route_res = GreedySearch.greedy_process_origin(g,
                                                       container_index,
                                                       theta,
                                                       max_dist,
                                                       origins,
                                                       num_required_origin,
                                                       index_matrix=True,
                                                       verbal=False,
                                                       complexity=False)
    else:
        return "Invalid argument for: algorithm", status.HTTP_400_BAD_REQUEST

        embedded_poi_node = {}

        '''
        {
            node_1: set(Node.PoI(), Node.PoI(), ...),
            ...
        }
        Note: Only contain the node with PoI embedded
        This step is necessary because CH_ns does not have info related to PoI
        '''

        with open("./PaDOC-Query/PoI_Network/NY_ns.csv", 'r') as rf:
            spamreader = csv.reader(rf)
            next(spamreader)

            for each_node in spamreader:
                node_id, node_lng, node_lat, node_pois_str = int(each_node[0]), float(each_node[1]), \
                                                             float(each_node[2]), each_node[3]

                if node_pois_str != '':
                    node_pois = set()
                    pois_name_list = node_pois_str.split('|')

                    for each_poi_name in pois_name_list:
                        node_pois.add(poi_dict[each_poi_name])

                    embedded_poi_node[node_id] = node_pois

        ############################################################################################
        ############################################################################################
        ############################################################################################

        g = ContractPoINetwork.ContractPoINetwork()

        print("Start Inserting Nodes......")
        with open("./PaDOC-Query/PoI_Network/CSV/NY_CH_ns_euclidean.csv", 'r') as rf:
            spamreader = csv.reader(rf)
            next(spamreader)

            counter = 1

            for each_row in spamreader:
                node_id, node_lng, node_lat, node_depth, node_order = int(each_row[0]), float(each_row[1]), \
                                                                      float(each_row[2]), int(each_row[3]), \
                                                                      int(each_row[4])

                if node_id not in embedded_poi_node:
                    g.add_node(node_id, node_lng, node_lng)
                else:
                    g.add_node(node_id, node_lng, node_lng, embedded_poi_node[node_id])

                '''
                :param depth: Integer, Hierarchy Depth
                :param contractOrder: Integer, contract order
                '''

                g.nodes[node_id].depth, g.nodes[node_id].contract_order = node_depth, node_order

                print("Inserted ", counter, " nodes")
                g.nodes[node_id].print_info()
                print("///////////////////////")
                counter += 1

        print("Inserted all ", counter - 1, " nodes successfully......")

        ############################################################################################
        ############################################################################################
        ############################################################################################

        print("Starting Inserting Edges......")
        with open("./PaDOC-Query/PoI_Network/CSV/NY_CH_es_euclidean.csv", 'r') as rf:
            spamreader = csv.reader(rf)
            next(spamreader)

            counter = 1

            for each_row in spamreader:
                node_id1, node_id2, edge_weight, edge_isShortcut, mid_node_id = int(each_row[0]), int(each_row[1]), \
                                                                                float(each_row[2]), each_row[3], \
                                                                                int(each_row[4])

                if math.isnan(edge_weight):
                    continue

                if edge_isShortcut == 'N':
                    g.add_edge(node_id1, node_id2, edge_weight)
                    print("Inserted ", counter, " edges")
                else:
                    g.add_shortcut(node_id1, node_id2, edge_weight, mid_node_id)
                    print("Inserted ", counter, " shortcuts")

                g.edges[(node_id1, node_id2)].print_info()
                print("///////////////////////")
                counter += 1

        print("Inserted all ", counter - 1, " edges successfully......")
        print("==================================================")
    else:
        print("No PoI network data!!!")
        exit()
    return g

def get_result_JSON(g, route_res, origin_name_mapping):
    result = []
    path_JSON = {'origin': [], 'nodes': [], 'pois': [], 'distance': ''}

    # Iterate through each route (there can be multiple origins)
    for data in route_res:
        # Get node id's and poi info
        origin_id = data[0]
        path = data[1]
        distance = data[2]
        pois = data[3]

        # Construct result JSON for a certain origin
        path_JSON['origin'] = get_node_JSON(g.nodes[origin_id], origin_name=origin_name_mapping[origin_id])

        for node_id in path:
            path_JSON['nodes'].append(get_node_JSON(g.nodes[node_id]))

        path_JSON['distance'] = distance

        for poi in pois:
            path_JSON['pois'].append(get_poi_JSON(g, path, poi))
        
        # Put the PoIs in the order which they are visited in the path
        path_JSON['pois'] = order_pois(path_JSON['nodes'], path_JSON['pois'])

        result.append(path_JSON)
        path_JSON = {'origin': [], 'nodes': [], 'pois': [], 'distance': ''}
        
    return result

def get_node_JSON(node, origin_name=None):
        if origin_name:
            return {'lng': node.lng, 'lat': node.lat, 'name': origin_name}
        else:
            return {'lng': node.lng, 'lat': node.lat}

# TODO: Find a way to not have to iterate through all nodes in the path to find PoI's lat,long
def get_poi_JSON(g, path, poi):
    # PoIs don't have lat,long attributes in their class, so we need to iterate through each node in the path to find the PoI's lat,long
    for node_id in path:
        node = g.nodes[node_id]
        if poi in node.PoIs:
            return {'name': poi.name, 'category': poi.category, 'lng': node.lng, 'lat': node.lat}

def order_pois(path, pois):
    # Return idx of node with lat,lng of poi
    def idx_of_node(poi):
        for idx, node in enumerate(path):
            if node['lng'] == poi['lng'] and node['lat'] == poi['lat']:
                return idx
        # This should (hopefully) never run
        return -1

    pois.sort(key=idx_of_node)   
    return pois 


if __name__ == '__main__':
    app.run()