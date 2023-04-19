import pytest
from map_package.index import get_index_from_pickle



def test_get_index_NY_623():
  
    num_poi = 623
    assert get_index_from_pickle("./PaDOC_Query/PoI_Network/Index/MatrixContainer_NY_" + str(num_poi) + ".pickle") != None

def test_get_index_NY_120():
  
    num_poi = 120
    assert get_index_from_pickle("./PaDOC_Query/PoI_Network/Index/MatrixContainer_NY_" + str(num_poi) + ".pickle") != None


def test_get_index_Chicago():
  
    num_poi = 594

    assert get_index_from_pickle("./PaDOC_Query/PoI_Network/Index/MatrixContainer_Chicago_" + str(num_poi) + ".pickle") != None

def test_get_index_exit():
  
    with pytest.raises(SystemExit) as e:
        get_index_from_pickle("./PaDOC_Query/PoI_Network/Index/MatrixContainer_NY_" + ".pickle")
    assert e.type == SystemExit



