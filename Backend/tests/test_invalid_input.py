import pytest
from app import app

def test_invalid_algorithm():
    response = app.test_client().get('/routes', json={
        "algorithm": 10,
        "origins": 1,
        "distance": 1000,
        "categories": [1,0,0,0,0,0]
    })

    assert response.status_code == 400

    response = app.test_client().get('/routes', json={
        "algorithm": -1,
        "origins": 1,
        "distance": 1000,
        "categories": [1,0,0,0,0,0]
    })

    assert response.status_code == 400

def test_negative_distance():
    response = app.test_client().get('/routes', json={
        "algorithm": 3,
        "origins": 1,
        "distance": -1,
        "categories": [1,0,0,0,0,0]
    })

    assert response.status_code == 200
    assert response.json == []

def test_negative_poi_category():
    response = app.test_client().get('/routes', json={
        "algorithm": 3,
        "origins": 1,
        "distance": 1000,
        "categories": [-1,0,0,0,0,0]
    })

    assert response.status_code == 200
    assert response.json[0]["pois"] == []

# Invalid poi category is >= 6
def test_invalid_poi_category():
    response = app.test_client().get('/routes', json={
        "algorithm": 3,
        "origins": 1,
        "distance": 1000,
        "categories": [6,0,0,0,0,0]
    })

    assert response.status_code == 500

def test_no_request_body():
    response = app.test_client().get('/routes')

    assert response.status_code == 400


