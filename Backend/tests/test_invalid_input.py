import pytest
from app import app
import map_package.CONSTANTS as CONSTANTS


def test_invalid_algorithm():
    response = app.test_client().post('/routes', json={
        "algorithm": 10,
        "origins": 1,
        "distance": 1000,
        "categories": [1,0,0,0,0,0],
        "city": "New York City"
    })

    assert response.status_code == 400

    response = app.test_client().post('/routes', json={
        "algorithm": -1,
        "origins": 1,
        "distance": 1000,
        "categories": [1,0,0,0,0,0],
        "city": "Chicago"
    })

    assert response.status_code == 400

def test_negative_distance():
    response = app.test_client().post('/routes', json={
        "algorithm": CONSTANTS.ORIGIN_FIRST,
        "origins": 1,
        "distance": -1,
        "categories": [1,0,0,0,0,0],
        "city": "New York City"
    })

    assert response.status_code == 200
    assert (response.json == [] or response.json[0]["distance"] == 0)

def test_negative_poi_category():
    response = app.test_client().post('/routes', json={
        "algorithm": CONSTANTS.ORIGIN_FIRST,
        "origins": 1,
        "distance": 1000,
        "categories": [-1,0,0,0,0,0],
        "city": "Chicago"
    })

    assert response.status_code == 200
    assert response.json[0]["pois"] == []

def test_no_request_body():
    response = app.test_client().post('/routes')

    assert response.status_code == 400

def test_invalid_city():
    # Only have NYC and Chicago. Anything else should be invalid
    response = app.test_client().post('/routes', json={
        "algorithm": CONSTANTS.ORIGIN_FIRST,
        "origins": 1,
        "distance": 1000,
        "categories": [1,0,0,0,0,0],
        "city": "Ames"
    })

    assert response.status_code == 400


