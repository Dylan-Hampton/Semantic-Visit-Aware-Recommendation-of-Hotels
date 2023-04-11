
import os
import csv
import random

def get_origins(origins_csv_path):
    if os.path.exists(origins_csv_path):
        print("Starting Locating Origins/Hotels......")
        origins = set()
        origin_name_mapping = {}

        with open(origins_csv_path, 'r', encoding="cp1252") as rf:
            spamreader = csv.reader(rf)
            next(spamreader)

            for each_row in spamreader:
                node_id, hotel_flag, hotel_name = int(each_row[0]), each_row[4], each_row[5]

                if hotel_flag == 'Y':  
                    origins.add(node_id)
                    origin_name_mapping[node_id] = hotel_name

        print("In total ", len(origins), " Origins/Hotels found......")
        print("==================================================")
    else:
        print("No Hotel/Origin Info!!!")
        exit()

    # Generate new sample from all origins
    new_sample_origin = False
    # If want sampled subset of origins OR all origins
    sampled_origin = False

    baseline_greedy_dijkstra = True
    baseline_rwr = True

    if sampled_origin:
        num_origin = 120
    else:
        num_origin = len(origins)

    if new_sample_origin:
        origins = random.sample(list(origins), k=num_origin)

        with open('./PaDOC_Query/ExperimentRelated/random' + str(num_origin) + '.csv', 'w') as f:
            writer = csv.writer(f)
            writer.writerow([str(x) for x in origins])

        origins = set(origins)

        print("Origins Sampling Completed...")
        print("==================================================")
    elif sampled_origin:
        with open('./PaDOC_Query/ExperimentRelated/random' + str(num_origin) + '.csv', 'r') as f:
            rf = csv.reader(f)

            for row in rf:
                if not row:  break
                origins = set([int(x) for x in row])

        print("Sampled Origins Loaded Completed...")
        print("==================================================")
    else:
        print("Use All ", len(origins), " Origins")
        print("==================================================")
    return origins, origin_name_mapping