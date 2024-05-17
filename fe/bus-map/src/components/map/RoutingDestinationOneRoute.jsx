import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CreateRoutineMachineLayer = () => {
  // stations with routes
  const destination = useSelector((state) => state.storeStations.destination);
  const stationsOneRoute = useSelector(
    (state) => state.storeStations.stationsOneRoute
  );
  const stationsTwoRoute = useSelector(
    (state) => state.storeStations.stationsTwoRoute
  );
  const stationsThreeRoute = useSelector(
    (state) => state.storeStations.stationsThreeRoute
  );

  let waypoints = [
    L.latLng(
      stationsOneRoute[stationsOneRoute.length - 1].lat,
      stationsOneRoute[stationsOneRoute.length - 1].lon
    ),
    L.latLng(destination.lat, destination.lon),
  ];

  const instance = L.Routing.control({
    waypoints: waypoints,
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    useZoomParameter: false,
    routeWhileDragging: false,
    show: false,
    formatter: null,
    autoRoute: true, // Automatically add the route to the map view
    createMarker: () => null,
  });

  return instance;
};

const RoutingDestinationOneRoute = createControlComponent(CreateRoutineMachineLayer);

export default RoutingDestinationOneRoute;
