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
from map_package.graph import get_generic_graph
from map_package.result import *
import map_package.CONSTANTS as CONSTANTS

app = Flask(__name__)
CORS(app)

def setup(self=app):
    global first_request
    first_request = True

@app.route('/cities')
def cities():
    city_data = [{
        'cityName':
        'New York City',
        'poiTypes': ['Memorial', 'Attraction', 'Entertainment', 'Shop', 'Museum', 'Park'],
        'lat': 40.731491,
        'lng': -73.997093
    }, {
        'cityName':
        'Chicago',
        'poiTypes': ['Memorial', 'Attraction', 'Entertainment', 'Shop', 'Museum', 'Park'],
        'lat': 41.878113,
        'lng': -87.629799
    }]
    return jsonify(city_data)

@app.before_first_request(setup)
@app.route('/routes', methods=['POST'])
def routes():

    # This is a dictionary that will hold the city data for each city, 
    # so we don't have to build it every time we get a request
    global city_data 
    global first_request
    if first_request:
        # Begin the city data dictionary on the first call of the function
        city_data = {}
        first_request = False

    # Get request body contents
    content = request.json
    algorithm = content['algorithm']
    theta = content['categories']
    max_dist = content['distance']
    num_required_origin = content['origins']
    city = content['city'] 

    if city.lower() == "new york city" or city.lower() == "new york" or city.lower() == "nyc" or city.lower() == "ny": 
        city = "NY"
    elif city.lower() == "chicago" or city.lower() == "chi":
        city = "Chicago"
    else:
        return "Invalid argument for: city", status.HTTP_400_BAD_REQUEST

    # Only build city data if it's not already in the dictionary, 
    # this lets us build each city only once, and one at a time
    if city not in city_data: 
        if city == "NY":
            num_poi = 623
        elif city == "Chicago":
            num_poi = 594
        g = get_generic_graph(city, num_poi)
        container_index = get_index_from_pickle(
            "./PaDOC_Query/PoI_Network/Index/MatrixContainer_" + str(city) 
            + '_' + str(num_poi) + ".pickle")
        origins, origin_name_mapping = get_origins(
            "./PaDOC_Query/PoI_Network/" + str(city) + "_ns.csv")
        g.rtree_build(origins)

        city_data[city] = (num_poi, g, container_index, origins, origin_name_mapping)
    
    num_poi, g, container_index, origins, origin_name_mapping = city_data[city]

    max_time = 2

    # Run algorithm based on request and store the resulting route
    route_res = None
    if (algorithm == CONSTANTS.GREEDY_DIJKSTRA):
        route_res = greedy_dijkstra(g,
                                    origins,
                                    theta,
                                    max_dist,
                                    num_required_origin,
                                    verbal=False,
                                    complexity=False)
    elif (algorithm == CONSTANTS.RANDOM_WALK_RESTART):
        route_res = random_walk_restart(g,
                                        origins,
                                        theta,
                                        max_dist,
                                        3 * max_time,
                                        num_required_origin,
                                        verbal=False,
                                        complexity=False)
    elif (algorithm == CONSTANTS.POI_FIRST):
        route_res = GreedySearch.greedy_process_PoI(g,
                                                    container_index,
                                                    theta,
                                                    max_dist,
                                                    origins,
                                                    num_required_origin,
                                                    index_matrix=True,
                                                    verbal=False,
                                                    complexity=False)
    elif (algorithm == CONSTANTS.ORIGIN_FIRST):
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

    # Return formatted route as response
    return jsonify(get_result_JSON(g, route_res, origin_name_mapping))


if __name__ == '__main__':
    app.run()