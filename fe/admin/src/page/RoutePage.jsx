import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import routeService from "../service/routeService";

// const data = [
//   {
//     name: {
//       firstName: "John",
//       lastName: "Doe",
//     },
//     address: "261 Erdman Ford",
//     city: "East Daphne",
//     state: "Kentucky",
//   },
//   {
//     name: {
//       firstName: "Jane",
//       lastName: "Doe",
//     },
//     address: "769 Dominic Grove",
//     city: "Columbus",
//     state: "Ohio",
//   },
//   {
//     name: {
//       firstName: "Joe",
//       lastName: "Doe",
//     },
//     address: "566 Brakus Inlet",
//     city: "South Linda",
//     state: "West Virginia",
//   },
//   {
//     name: {
//       firstName: "Kevin",
//       lastName: "Vandy",
//     },
//     address: "722 Emie Stream",
//     city: "Lincoln",
//     state: "Nebraska",
//   },
//   {
//     name: {
//       firstName: "Joshua",
//       lastName: "Rolluffs",
//     },
//     address: "32188 Larkin Turnpike",
//     city: "Charleston",
//     state: "South Carolina",
//   },
// ];
const formatTime = (hours, minutes) => {
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};
export default function () {
  const [routes, setRoutes] = useState("");
  const fetchRouteData = async () => {
    const routeData = await routeService.getAllRoute();
    if (
      Array.isArray(routeData) &&
      routeData.every((route) => route && route.startTime && route.endTime)
    ) {
      const formattedRoutes = routeData.map((route) => ({
        ...route,
        startTime: formatTime(route.startTime[0], route.startTime[1]),
        endTime: formatTime(route.endTime[0], route.endTime[1]),
      }));
      setRoutes(formattedRoutes);
    } else {
      // Handle invalid data structure
      console.error("Invalid route data structure");
    }
  };
  useEffect(() => {
    fetchRouteData();
  }, []);
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "distance",
        header: "Distance",
        size: 100,
      },
      {
        accessorKey: "duration",
        header: "Duration",
        size: 100,
      },
      {
        accessorKey: "startTime",
        header: "Start Time",
        size: 100,
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        size: 100,
      },
      {
        accessorKey: "routeNum",
        header: "Route Num",
        size: 100,
      },
      {
        accessorKey: "direction",
        header: "Direction",
        size: 100,
      },
      {
        accessorKey: "tripSpacing",
        header: "Trip Spacing",
        size: 100,
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={routes} />;
}
