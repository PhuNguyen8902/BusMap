import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  console.log(props.address[0][1]["longitude1"]);
  console.log(props.address[0][1]);

  const instance = L.Routing.control({
    waypoints: [
      L.latLng(
        props.address[0][0]["latitude1"],
        props.address[0][1]["longitude1"]
      ),
      L.latLng(
        props.address[1][0]["latitude2"],
        props.address[1][1]["longitude2"]
      ),
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    createMarker: () => null,
  });

  return instance;
};

const RoutingDemo = createControlComponent(createRoutineMachineLayer);

export default RoutingDemo;
