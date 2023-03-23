import pytest
from app import app

def test_cities_route():
    response = app.test_client().get('/cities')

    assert response.status_code == 200

def test_routes_route():
    response = app.test_client().get('/routes', json={
        "algorithm": 3,
        "origins": 1,
        "distance": 2000,
        "categories": [0,1,0,1,0,1]
    })

    assert response.status_code == 200
