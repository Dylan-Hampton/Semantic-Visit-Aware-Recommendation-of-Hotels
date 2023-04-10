from flask import Flask, jsonify, request
from flask_api import status
from flask_cors import CORS

import sys

sys.path.insert(1, "./PaDOC_Query/")
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
        "./paDOC_Query/PoI_Network/Index/MatrixContainer_NY_" + str(num_poi) +
        ".pickle")

    ############################################################################################
    ############################################################################################
    ############################################################################################
    origins, origin_name_mapping = get_origins(
        "./PaDOC_Query/PoI_Network/NY_ns.csv")

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


if __name__ == '__main__':
    app.run()