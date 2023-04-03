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