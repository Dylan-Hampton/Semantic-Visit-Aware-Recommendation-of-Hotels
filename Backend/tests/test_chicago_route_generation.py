import pytest
from app import app
import map_package.CONSTANTS as CONSTANTS

def test_greedy_dijkstra_generation():
    # 1 origin, 1 PoI of first category
    response = app.test_client().post('/routes', json={
        "algorithm": CONSTANTS.GREEDY_DIJKSTRA,
        "origins": 1,
        "distance": 1000,
        "categories": [1,0,0,0,0,0],
        "city": "Chicago"
    })

    assert response.status_code == 200
    assert response.json[0]["distance"] == 495.9101714568851
    assert len(response.json[0]["nodes"]) == 7
    assert response.json[0]["origin"]["name"] == "QUIET PLACE IN PERFECT AREA TO EXPLORE CHICAGO"
    assert response.json[0]["pois"][0]["category"] == 0
    assert response.json[0]["pois"][0]["name"] == "Shrine of our Lady of Pompeii"

    # 3 origins, 1 PoI of each category
    response = app.test_client().post('/routes', json={
        "algorithm": CONSTANTS.GREEDY_DIJKSTRA,
        "origins": 3,
        "distance": 2000,
        "categories": [1,1,1,1,1,1],
        "city": "Chicago"
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
        "algorithm": CONSTANTS.RANDOM_WALK_RESTART,
        "origins": 1,
        "distance": 1000,
        "categories": [1,0,0,0,0,0],
        "city": "Chicago"
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
        "algorithm": CONSTANTS.RANDOM_WALK_RESTART,
        "origins": 3,
        "distance": 2000,
        "categories": [1,1,1,1,1,1],
        "city": "Chicago"
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
        "algorithm": CONSTANTS.POI_FIRST,
        "origins": 1,
        "distance": 1000,
        "categories": [1,0,0,0,0,0],
        "city": "Chicago"
    })

    assert response.status_code == 200
    assert response.json[0]["distance"] == 5.209068563651793
    assert len(response.json[0]["nodes"]) == 2
    assert response.json[0]["origin"]["name"] == "30 E. Huron #3103 Private Residence"
    assert response.json[0]["pois"][0]["category"] == 0
    assert response.json[0]["pois"][0]["name"] == "Holy Name Cathedral"

    # 3 origins, 1 PoI of each category
    response = app.test_client().post('/routes', json={
        "algorithm": CONSTANTS.POI_FIRST,
        "origins": 3,
        "distance": 2000,
        "categories": [1,1,1,1,1,1],
        "city": "Chicago"
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
        "algorithm": CONSTANTS.ORIGIN_FIRST,
        "origins": 1,
        "distance": 1000,
        "categories": [0,0,1,0,0,0],
        "city": "Chicago"
    })

    assert response.status_code == 200
    assert response.json[0]["distance"] == 0
    assert len(response.json[0]["nodes"]) == 1
    assert response.json[0]["origin"]["name"] == "One bed room in Bucktown 5 min walks to blue line|Wanderlust in Wicker Park! Entire, HUGE 1 bed apt|Relaxed Bucktown/Wicker Park 1B Apt|The Bucktown Penthouse Family, Business, Friends|Bright Bucktown 3 Bedroom Near the 606|Private bedroom in beautiful condo w/ private bath"
    assert response.json[0]["pois"][0]["category"] == 2
    assert response.json[0]["pois"][0]["name"] == "Team vs Time"

    # 3 origins, 1 PoI of each category
    response = app.test_client().post('/routes', json={
        "algorithm": CONSTANTS.ORIGIN_FIRST,
        "origins": 3,
        "distance": 2000,
        "categories": [1,1,1,1,1,1],
        "city": "Chicago"
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
