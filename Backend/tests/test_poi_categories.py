import pytest
from app import app
import map_package.CONSTANTS as CONSTANTS


def test_origin_first_generation_poi1():
    # origins 3, 1 PoI of first category, MEMORIAL
    response = app.test_client().post('/routes',
                                      json={
                                          "algorithm": 3,
                                          "origins": 3,
                                          "distance": 1000,
                                          "categories": [2, 0, 0, 0, 0, 0],
                                          "city": "New York City"
                                      })

    assert response.json[0]["pois"][0]["category"] == 0

    def test_origin_first_generation_poi2():
        # origins 3, 1 PoI of first category, ATTRACTION
        response = app.test_client().post('/routes',
                                          json={
                                              "algorithm": 3,
                                              "origins": 3,
                                              "distance": 1000,
                                              "categories": [0, 2, 0, 0, 0, 0],
                                              "city": "New York City"
                                          })

        assert response.json[0]["pois"][0]["category"] == 1

    def test_origin_first_generation_poi3():
        # origins 3, 1 PoI of first category, SHOPPING
        response = app.test_client().post('/routes',
                                          json={
                                              "algorithm": 3,
                                              "origins": 3,
                                              "distance": 1000,
                                              "categories": [0, 0, 1, 0, 0, 0],
                                              "city": "New York City"
                                          })

        assert response.json[0]["pois"][0]["category"] == 2

    def test_origin_first_generation_poi4():
        # origins 3, 1 PoI of first category, ENTERTAINMENT
        response = app.test_client().post('/routes',
                                          json={
                                              "algorithm": 3,
                                              "origins": 3,
                                              "distance": 1000,
                                              "categories": [0, 0, 0, 1, 0, 0],
                                              "city": "New York City"
                                          })

        assert response.json[0]["pois"][0]["category"] == 3

    def test_origin_first_generation_poi5():
        # origins 3, 1 PoI of first category, MUSEUM
        response = app.test_client().post('/routes',
                                          json={
                                              "algorithm": 3,
                                              "origins": 3,
                                              "distance": 1000,
                                              "categories": [0, 0, 0, 0, 1, 0],
                                              "city": "New York City"
                                          })

        assert response.json[0]["pois"][0]["category"] == 4

    def test_origin_first_generation_poi5():
        # origins 3, 1 PoI of first category, PARK
        response = app.test_client().post('/routes',
                                          json={
                                              "algorithm": 3,
                                              "origins": 3,
                                              "distance": 1000,
                                              "categories": [0, 0, 0, 0, 0, 1],
                                              "city": "New York City"
                                          })
        assert response.json[0]["pois"][0]["category"] == 5
