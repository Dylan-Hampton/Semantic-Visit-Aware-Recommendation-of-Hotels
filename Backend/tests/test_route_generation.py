import pytest
from app import app

GREEDY_DIJKSTRA = 0

def test_greedy_dijkstra_generation():

    # 1 origin, 1 PoI of first category
    response = app.test_client().get('/routes', json={
        "algorithm": GREEDY_DIJKSTRA,
        "origins": 1,
        "distance": 1000,
        "categories": [1,0,0,0,0,0]
    })
    assert response.status_code == 200
    assert response.json[0]["distance"] == 827.1345442842437
    assert len(response.json[0]["nodes"]) == 18
    assert response.json[0]["origin"]["name"] == "The Knickerbocker Hotel"
    assert response.json[0]["pois"][0]["category"] == 0
    assert response.json[0]["pois"][0]["name"] == "St. Peter's Church"

    # 3 origins, 1 PoI of each category
    response = app.test_client().get('/routes', json={
        "algorithm": GREEDY_DIJKSTRA,
        "origins": 3,
        "distance": 2000,
        "categories": [1,1,1,1,1,1]
    })
    
    # Generation of routes does not seem to be deterministic (PoIs change on different runs)
    # Testing lengths of responses to account for above
    assert response.status_code == 200
    for origin_idx in range(3):
        # Make sure a path is generated and has an origin with a name
        assert response.json[origin_idx]["distance"] is not None
        assert response.json[origin_idx]["origin"]["name"] is not None 
        
        poi_categories = set()
        for poi_idx in range(6):
            assert response.json[origin_idx]["pois"][poi_idx]["name"] is not None
            # Add category number to set
            poi_categories.add(response.json[origin_idx]["pois"][poi_idx]["category"])
        # There should be 6 PoI categories
        assert len(poi_categories) == 6

