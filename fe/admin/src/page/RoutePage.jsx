import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import routeService from "../service/routeService";
import { useNavigate } from "react-router-dom";
import queryLocation from "../utils/queryLocation";
import { Box } from "@mui/material";

const formatTime = (hours, minutes) => {
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};
export default function RoutePage() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  const fetchRouteData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const routeData = await routeService.getAllRoute(urlParams.toString());
    if (
      Array.isArray(routeData.content) &&
      routeData.content.every(
        (route) => route && route.startTime && route.endTime
      )
    ) {
      const formattedRoutes = routeData.content.map((route) => ({
        ...route,
        startTime: formatTime(route.startTime[0], route.startTime[1]),
        endTime: formatTime(route.endTime[0], route.endTime[1]),
        totalPage: routeData.totalPages,
        totalElement: routeData.totalElements,
      }));
      setRoutes(formattedRoutes);
    } else {
      console.error("Invalid route data structure");
    }
  };

  useEffect(() => {
    navigate(
      `?${queryLocation.toString({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      })}`
    );
    fetchRouteData();
  }, [pagination.pageIndex, pagination.pageSize]);
  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    const data = await routeService.editRoute(values);
    alert(data.error);

    // tableData[row.index] = values;
    // setTableData([...tableData]);
    // exitEditingMode();
  };
  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "Id",
      enableEditing: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      enableEditing: false,
    },
    {
      accessorKey: "distance",
      header: "Distance",
    },
    {
      accessorKey: "duration",
      header: "Duration",
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
    },
    {
      accessorKey: "endTime",
      header: "End Time",
    },
    {
      accessorKey: "routeNum",
      header: "Route Num",
      enableEditing: false,
    },
    {
      accessorKey: "direction",
      header: "Direction",
      enableEditing: false,
    },
    {
      accessorKey: "tripSpacing",
      header: "Trip Spacing",
    },
  ]);
  return (
    <Box className="table--container">
      <MaterialReactTable
        columns={columns}
        data={routes}
        onPaginationChange={setPagination}
        manualPagination
        enableEditing
        state={{ pagination }}
        rowCount={routes.length > 0 ? routes[0].totalElement : 5}
        onEditingRowSave={handleSaveRow}
      />
    </Box>
  );
}
