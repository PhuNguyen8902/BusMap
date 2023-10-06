import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import routeService from "../service/routeService";
import { useNavigate } from "react-router-dom";
import queryLocation from "../utils/queryLocation";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

const formatTime = (hours, minutes) => {
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};

export default function RouteDeletedPage() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [routes, setRoutes] = useState([]);
  const [openActive, setOpenActive] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const navigate = useNavigate();

  const fetchRouteData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const routeData = await routeService.getAllRouteDeleted(
      urlParams.toString()
    );
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

  const handleOpenActive = (row) => {
    setActiveId(row._valuesCache.id);
    setOpenActive(true);
  };
  //   const handleClickOpenDelete = (row) => {
  //     // console.log(row._valuesCache);
  //     setDeleteId(row._valuesCache.id);

  //     setOpenDelete(true);
  //   };

  const handleCloseActive = () => {
    setOpenActive(false);
  };
  const handleActive = async () => {
    const data = await routeService.activeRoute(activeId);
    if (data == true) {
      alert("thanh cong roi");
      setOpenActive(false);
      fetchRouteData();
    } else {
      alert("bi loi roi");
    }

    // console.log(activeId);
    // setOpenActive(false);
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
    <>
      <Box className="table--container">
        <Typography variant="h3">Route Deleted</Typography>
        <MaterialReactTable
          columns={columns}
          data={routes}
          onPaginationChange={setPagination}
          manualPagination
          state={{ pagination }}
          rowCount={routes.length > 0 ? routes[0].totalElement : 5}
          enableRowActions
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <Button
                variant="container"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => {
                  handleOpenActive(row);
                }}
              >
                Active
              </Button>
            </Box>
          )}
        />
      </Box>
      <Dialog
        open={openActive}
        onClose={handleCloseActive}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Active"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Want to make Route ID {activeId} active? It will enable both routes
            with Route Num along with it. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseActive}>Cancel</Button>
          <Button onClick={handleActive} autoFocus variant="contained">
            Active
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
