import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useSelector } from "react-redux";

const CreateRoutineMachineLayer = () => {

    const stations = useSelector((state) => state.storeMarkers);
    console.log("stations in routing: ", stations);

    const waypoints = stations.map((station) =>
        L.latLng(station.lat, station.lon)
    );

    const instance = L.Routing.control({
        waypoints: waypoints,
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }],
        },
        show: true,
        summaryTemplate: ' ', // Set summary template to a space
        formatter: null,
        itineraryFormatter: null,
        distanceTemplate: " ",
        timeTemplate: " ",
        showInstructions: false, // Hide route calculation view
        autoRoute: true, // Automatically add the route to the map view
        createMarker: () => null,
    });

    return instance;
};

const RoutingMap = createControlComponent(CreateRoutineMachineLayer);

export default RoutingMap;
