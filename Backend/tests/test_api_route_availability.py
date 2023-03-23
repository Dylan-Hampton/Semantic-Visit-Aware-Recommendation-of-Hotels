import pytest
from app import app

def test_cities_route():
    response = app.test_client().get('/cities')

    assert response.status_code == 200