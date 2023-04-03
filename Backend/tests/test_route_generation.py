import pytest
from app import app

GREEDY_DIJKSTRA = 0
RANDOM_WALK_RESTART = 1
POI_FIRST = 2
ORIGIN_FIRST = 3

def test_greedy_dijkstra_generation():
    # 1 origin, 1 PoI of first category
    response = app.test_client().post('/routes', json={
        "algorithm": GREEDY_DIJKSTRA,
        "origins": 1,
        "distance": 1000,
        "categories": [1,0,0,0,0,0]
    })

    assert response.status_code == 200
    assert response.json[0]["distance"] == 440.3207063135761
    assert len(response.json[0]["nodes"]) == 6
    assert response.json[0]["origin"]["name"] == "Grand Hyatt New York"
    assert response.json[0]["pois"][0]["category"] == 0
    assert response.json[0]["pois"][0]["name"] == "Church of Saint Agnes"

    # 3 origins, 1 PoI of each category
    response = app.test_client().post('/routes', json={
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

def test_random_walk_restart_generation():
    # 1 origin, 1 PoI of first category
    response = app.test_client().post('/routes', json={
        "algorithm": RANDOM_WALK_RESTART,
        "origins": 1,
        "distance": 1000,
        "categories": [1,0,0,0,0,0]
    })

    assert response.status_code == 200

    # Chance nothing is found
    if len(response.json) is not 0:
        assert response.json[0]["distance"] is not None
        assert len(response.json[0]["nodes"]) > 0
        assert response.json[0]["origin"]["name"] is not None
        assert response.json[0]["pois"][0]["category"] == 0
        assert response.json[0]["pois"][0]["name"] is not None

    # 3 origins, 1 PoI of each category
    response = app.test_client().post('/routes', json={
        "algorithm": RANDOM_WALK_RESTART,
        "origins": 3,
        "distance": 2000,
        "categories": [1,1,1,1,1,1]
    })
    
    assert response.status_code == 200

    # Chance nothing is found
    if len(response.json) is not 0:
        for origin_idx in range(len(response.json)):
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

def test_poi_first_generation():
    # 1 origin, 1 PoI of first category
    response = app.test_client().post('/routes', json={
        "algorithm": POI_FIRST,
        "origins": 1,
        "distance": 1000,
        "categories": [1,0,0,0,0,0]
    })

    assert response.status_code == 200
    assert response.json[0]["distance"] == 279.1751597476729
    assert len(response.json[0]["nodes"]) == 5
    assert response.json[0]["origin"]["name"] == "The Towers at Lotte New York Palace"
    assert response.json[0]["pois"][0]["category"] == 0
    assert response.json[0]["pois"][0]["name"] == "St. Patrick's Cathedral"

    # 3 origins, 1 PoI of each category
    response = app.test_client().post('/routes', json={
        "algorithm": POI_FIRST,
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

def test_origin_first_generation():
    # 1 origin, 1 PoI of first category
    response = app.test_client().post('/routes', json={
        "algorithm": ORIGIN_FIRST,
        "origins": 1,
        "distance": 1000,
        "categories": [0,0,1,0,0,0]
    })

    assert response.status_code == 200
    assert response.json[0]["distance"] == 15.85720755775575
    assert len(response.json[0]["nodes"]) == 2
    assert response.json[0]["origin"]["name"] == "Novotel New York - Times Square"
    assert response.json[0]["pois"][0]["category"] == 2
    assert response.json[0]["pois"][0]["name"] == "Gershwin Theater"

    # 3 origins, 1 PoI of each category
    response = app.test_client().post('/routes', json={
        "algorithm": ORIGIN_FIRST,
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
