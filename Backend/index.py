import os
import pickle
def get_index_from_pickle(path_to_pickle):
    if os.path.exists(path_to_pickle):
        print("Start Loading Container Index from Pickle file......")

        with open(path_to_pickle, 'rb') as f:
            container_index = pickle.load(f)

        print("Container Index Has Been Loaded......")
        print("=================================================")
        return container_index
    else:
        print("No Index Found!!!")
        exit()