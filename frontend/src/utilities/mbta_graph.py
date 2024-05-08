import networkx as nx
import json
import csv

# t_edges.txt credit: https://towardsdatascience.com/i-built-the-t-with-python-and-revamped-it-632127364f4e, Amy Vogel
def convert_to_json(f="t_edges.txt"):
    """
    Converts a networkx graph to JSON format following the graphlib structure.
    """
    with open(f, "r") as file:
        data = file.readlines()

        stations=[]
        for line in data:
            parts = line.strip().split(",")

            # Extract station names, travel time, and line color
            source, destination, travel_time, line_color = parts[0], parts[1], parts[2], parts[3]

            # Create a dictionary for each edge
            edge = {
                "v": source,
                "w": destination,
                "value": {
                    "label": f"edge {source}->{destination}",
                    "travel_time": int(travel_time),
                    "line_color": line_color
                }
            }
            stations.append(edge)

            json_data = {
            "options": {
                "directed": True,  # Assuming the network is directional (one-way travel)
                "multigraph": False,  # Assuming no parallel edges between stations
                "compound": False
            },
            "nodes": [],  # We'll populate this later
            "edges": stations
            }

            # Extract unique station names to save as nodes
            unique_stations = set(station["v"] for station in stations)
            unique_stations.update(station["w"] for station in stations)

            nodes = [{"v": station, "value": {"label": station}} for station in unique_stations]
            json_data["nodes"] = nodes

            with open("mbta_graph.json", "w") as json_file:
                # Write the JSON data to the file
                json.dump(json_data, json_file, indent=4)


if __name__ == "__main__":

    # convert to JSON
    json_data = convert_to_json()
    print(json.dumps(json_data, indent=4))