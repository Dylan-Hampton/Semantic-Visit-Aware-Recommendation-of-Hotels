import pytest

from PaDOC_Query.Node import Node
from map_package.result import get_node_JSON
from map_package.result import order_pois

def test_get_node_JSON_1():
    node = Node(1, 33.33, 55.55, None, 0, False, 1)
    assert get_node_JSON(node) == {'lng': 33.33, 'lat': 55.55}

def test_get_node_JSON_2():
    node = Node(1, 33.33, 55.55, None, 0, False, 1)
    assert get_node_JSON(node, "blah") == {'lng': 33.33, 'lat': 55.55, "name": "blah"}


def test_order_pois_1():
    nodes = []
    pois = []
    nodes.append({'lng': 33.33, 'lat': 55.55})
    nodes.append({'lng': 44.44, 'lat': 99.99})
    nodes.append({'lng': 55.55, 'lat': 23.89})
    
    pois.append({'lng': 55.55, 'lat': 23.89})
    pois.append({'lng': 44.44, 'lat': 99.99})
    


    assert order_pois(nodes, pois) == [{'lng': 44.44, 'lat': 99.99}, {'lng': 55.55, 'lat': 23.89}]



