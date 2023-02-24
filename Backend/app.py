from flask import Flask, jsonify, request
from flask_api import status
from flask_cors import CORS

import sys
import csv, pickle, time
import random
import math
import heapq
import os

sys.path.insert(1, "./PaDOC-Query/")
import ContractPoINetwork, CONSTANTS
import GreedySearch
import Node
from Experiment import random_walk_restart
from Experiment import greedy_dijkstra

app = Flask(__name__)
CORS(app)

@app.route('/cities')
def cities():
    '''
    If we had a database for cities we could get the data from there.
    For now as we have one city, this is hard coded along with an extra
    city for the frontend to test their functionality.
    '''
    city_data = [
        {
            'cityName': 'New York City',
            'poiTypes': [
                'Museum',
                'Statue',
                'Mall',
                'Park',
                'Zoo',
                'Aquarium'
            ]
        },
        {
            'cityName': 'Chicago',
            'poiTypes': [
                'Museum',
                'Restaurant',
                'Beach',
                'Market',
                'Library',
                'Book Store'
            ]
        }
    ]
    return jsonify(city_data)


@app.route('/routes')
def routes():
    # TODO: Separate the setup parts (graph, index, origins) into different functions that can be called or ran on setup of Apache
    num_poi = 623

    if os.path.exists("./PaDOC-Query/PoI_Network/PKL/NY_" + str(num_poi) + "_PoI_network_euclidean.pickle"):
        print("Start Loading PoI Network from Pickle file......")

        with open("./PaDOC-Query/PoI_Network/PKL/NY_" + str(num_poi) + "_PoI_network_euclidean.pickle", 'rb') as f:
            g = pickle.load(f)

        print("PoI Network Has Been Loaded......")
        print("=================================================")
    elif os.path.exists("./PaDOC-Query/PoI_Network/CSV/NY_CH_es_euclidean.csv") and \
            os.path.exists("./PaDOC-Query/PoI_Network/CSV/NY_CH_ns_euclidean.csv") and \
            os.path.exists("./PaDOC-Query/PoI_Network/CSV/NY_PoI_info.csv"):
        print("Start Loading PoI Network from CSV files......")

        print("Start Loading Diversity......")

        with open("./PaDOC-Query/PoI_Network/CSV/NY_PoI_info.csv", 'r') as rf:
            spamreader = csv.reader(rf)
            next(spamreader)

            poi_dict = {}

            for eachPoI in spamreader:
                poi_id, poi_name, category_idx = int(eachPoI[0]), eachPoI[1], int(eachPoI[2])

                poi_dict[poi_name] = Node.PoI(poi_id=poi_id, name=poi_name, category=category_idx)

        ############################################################################################
        ############################################################################################
        ############################################################################################

        print("Start Pairing Node with PoIs......")

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

    ############################################################################################
    ############################################################################################
    ############################################################################################

    if os.path.exists("./PaDOC-Query/PoI_Network/Index/MatrixContainer_" + str(num_poi) + ".pickle"):
        print("Start Loading Container Index from Pickle file......")

        with open("./PaDOC-Query/PoI_Network/Index/MatrixContainer_" + str(num_poi) + ".pickle", 'rb') as f:
            container_index = pickle.load(f)

        print("Container Index Has Been Loaded......")
        print("=================================================")
    else:
        print("No Index Found!!!")
        exit()

    ############################################################################################
    ############################################################################################
    ############################################################################################
    if os.path.exists("./PaDOC-Query/PoI_Network/NY_ns.csv"):
        print("Starting Locating Origins/Hotels......")
        origins = set()

        with open("./PaDOC-Query/PoI_Network/NY_ns.csv", 'r', encoding="cp1252") as rf:
            spamreader = csv.reader(rf)
            next(spamreader)

            for each_row in spamreader:
                node_id, hotel_flag = int(each_row[0]), each_row[4]

                if hotel_flag == 'Y':  origins.add(node_id)

        print("In total ", len(origins), " Origins/Hotels found......")
        print("==================================================")
    else:
        print("No Hotel/Origin Info!!!")
        exit()

    # Generate new sample from all origins
    new_sample_origin = False
    # If want sampled subset of origins OR all origins
    sampled_origin = False

    baseline_greedy_dijkstra = True
    baseline_rwr = True

    if sampled_origin:
        num_origin = 120
    else:
        num_origin = len(origins)

    if new_sample_origin:
        origins = random.sample(list(origins), k=num_origin)

        with open('./PaDOC-Query/ExperimentRelated/random' + str(num_origin) + '.csv', 'w') as f:
            writer = csv.writer(f)
            writer.writerow([str(x) for x in origins])

        origins = set(origins)

        print("Origins Sampling Completed...")
        print("==================================================")
    elif sampled_origin:
        with open('./PaDOC-Query/ExperimentRelated/random' + str(num_origin) + '.csv', 'r') as f:
            rf = csv.reader(f)

            for row in rf:
                if not row:  break
                origins = set([int(x) for x in row])

        print("Sampled Origins Loaded Completed...")
        print("==================================================")
    else:
        print("Use All ", len(origins), " Origins")
        print("==================================================")

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
    if(algorithm == GREEDY_DIJKSTRA):
        route_res = greedy_dijkstra(g, origins, theta, max_dist, num_required_origin, verbal=False, complexity=False)
    elif(algorithm == RANDOM_WALK_RESTART):
        route_res = random_walk_restart(g, origins, theta, max_dist, 3*max_time, num_required_origin, verbal=False, complexity=False)
    elif(algorithm == POI_FIRST):
        route_res = GreedySearch.greedy_process_PoI(g, container_index, theta, max_dist, origins, num_required_origin, index_matrix=True, verbal=False, complexity=False)
    elif(algorithm == ORIGIN_FIRST):
        route_res = GreedySearch.greedy_process_origin(g, container_index, theta, max_dist, origins, num_required_origin, index_matrix=True, verbal=False, complexity=False)
    else:
        return "Invalid argument for: algorithm", status.HTTP_400_BAD_REQUEST
    
    return jsonify(get_result_JSON(g, route_res))

def get_result_JSON(g, route_res):
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
        path_JSON['origin'] = get_node_JSON(g.nodes[origin_id])

        for node_id in path:
            path_JSON['nodes'].append(get_node_JSON(g.nodes[node_id]))

        path_JSON['distance'] = distance

        for poi in pois:
            path_JSON['pois'].append(get_poi_JSON(g, path, poi))
        
        result.append(path_JSON)
    return result

def get_node_JSON(node):
        return {'lng': node.lng, 'lat': node.lat}

# TODO: Find a way to not have to iterate through all nodes in the path to find PoI's lat,long
def get_poi_JSON(g, path, poi):
    # PoIs don't have lat,long attributes in their class, so we need to iterate through each node in the path to find the PoI's lat,long
    for node_id in path:
        node = g.nodes[node_id]
        if poi in node.PoIs:
            return {'name': poi.name, 'category': poi.category, 'lng': node.lng, 'lat': node.lat}


if __name__ == '__main__':
    app.run()