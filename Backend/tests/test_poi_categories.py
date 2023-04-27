import pytest
from app import app
import map_package.CONSTANTS as CONSTANTS


def test_origin_first_generation_poi1():
    # 1 origin, 1 PoI of first category
    response = app.test_client().post('/routes',
                                      json={
                                          "algorithm": CONSTANTS.ORIGIN_FIRST,
                                          "origins": 10,
                                          "distance": 1000,
                                          "categories": [1, 0, 0, 0, 0, 0],
                                          "city": "Chicago"
                                      })

    assert response.json[0]["pois"][0]["category"] == 1

    def test_origin_first_generation_poi2():
        # 1 origin, 1 PoI of first category
        response = app.test_client().post('/routes',
                                          json={
                                              "algorithm":
                                              CONSTANTS.ORIGIN_FIRST,
                                              "origins": 10,
                                              "distance": 1000,
                                              "categories": [0, 1, 0, 0, 0, 0],
                                              "city": "Chicago"
                                          })

        assert response.json[0]["pois"][0]["category"] == 2

    def test_origin_first_generation_poi3():
        # 1 origin, 1 PoI of first category
        response = app.test_client().post('/routes',
                                          json={
                                              "algorithm":
                                              CONSTANTS.ORIGIN_FIRST,
                                              "origins": 10,
                                              "distance": 1000,
                                              "categories": [0, 0, 1, 0, 0, 0],
                                              "city": "Chicago"
                                          })

        assert response.json[0]["pois"][0]["category"] == 3

    def test_origin_first_generation_poi4():
        # 1 origin, 1 PoI of first category
        response = app.test_client().post('/routes',
                                          json={
                                              "algorithm":
                                              CONSTANTS.ORIGIN_FIRST,
                                              "origins": 10,
                                              "distance": 1000,
                                              "categories": [0, 0, 0, 1, 0, 0],
                                              "city": "Chicago"
                                          })

        assert response.json[0]["pois"][0]["category"] == 4

    def test_origin_first_generation_poi5():
        # 1 origin, 1 PoI of first category
        response = app.test_client().post('/routes',
                                          json={
                                              "algorithm":
                                              CONSTANTS.ORIGIN_FIRST,
                                              "origins": 10,
                                              "distance": 1000,
                                              "categories": [0, 0, 0, 0, 1, 0],
                                              "city": "Chicago"
                                          })

        assert response.json[0]["pois"][0]["category"] == 5

    def test_origin_first_generation_poi5():
        # 1 origin, 1 PoI of first category
        response = app.test_client().post('/routes',
                                          json={
                                              "algorithm":
                                              CONSTANTS.ORIGIN_FIRST,
                                              "origins": 10,
                                              "distance": 1000,
                                              "categories": [0, 0, 0, 0, 1, 0],
                                              "city": "Chicago"
                                          })

        assert response.json[0]["pois"][0]["category"] == 6
