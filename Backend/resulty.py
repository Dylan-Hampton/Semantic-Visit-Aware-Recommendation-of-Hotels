
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