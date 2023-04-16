import pytest
from app import app
import map_package.CONSTANTS as CONSTANTS


def test_cities_route():
    response = app.test_client().get('/cities')

    assert response.status_code == 200

def test_routes_route():
    response = app.test_client().post('/routes', json={
        "algorithm": CONSTANTS.ORIGIN_FIRST,
        "origins": 1,
        "distance": 2000,
        "categories": [0,1,0,1,0,1],
        "city": "New York City"
    })

    assert response.status_code == 200

    response = app.test_client().post('/routes', json={
        "algorithm": CONSTANTS.ORIGIN_FIRST,
        "origins": 1,
        "distance": 2000,
        "categories": [0,1,0,1,0,1],
        "city": "Chicago"
    })

    assert response.status_code == 200
