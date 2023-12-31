import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import routeService from "../../service/routeService";
import { Link, useNavigate } from "react-router-dom";
import queryLocation from "../../utils/queryLocation";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import RouteIcon from "@mui/icons-material/Route";
import MessageIcon from "@mui/icons-material/Message";
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
import { Delete, Edit } from "@mui/icons-material";
import { CreateNewAccountModal } from "../index";

const formatTime = (hours, minutes) => {
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};
export default function RouteTable() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [routes, setRoutes] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const navigate = useNavigate();

  const fetchRouteData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const routeData = await routeService.getAllRoute(urlParams.toString());

    if (routeData.totalElements > 0) {
      const formattedRoutes = routeData.content.map((route) => ({
        ...route,
        startTime: formatTime(route.startTime[0], route.startTime[1]),
        endTime: formatTime(route.endTime[0], route.endTime[1]),
        totalPage: routeData.totalPages,
        totalElement: routeData.totalElements,
      }));
      setRoutes(formattedRoutes);
    } else {
      alert("Null");
    }
  };

  useEffect(() => {
    if (globalFilter == undefined) {
      setGlobalFilter("");
    }
    navigate(
      `?${queryLocation.toString({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        kw: globalFilter,
      })}`
    );
    fetchRouteData();
  }, [pagination.pageIndex, pagination.pageSize, globalFilter]);
  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    const data = await routeService.editRoute(values);
    alert(data.mess);
    fetchRouteData();
    exitEditingMode();
  };
  const handleDeleteRow = async () => {
    const data = await routeService.deleteRoute(deleteId);
    alert(data.mess);
    fetchRouteData();
    setOpenDelete(false);
  };
  const handleClickOpenDelete = (row) => {
    setDeleteId(row._valuesCache.id);

    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCreateNewRow = async (values) => {
    let hasEmptyValue = false;
    Object.keys(values).forEach((key) => {
      if (values[key] === "") {
        hasEmptyValue = true;
        alert(key + " cannot be null");
      }
    });

    if (!hasEmptyValue) {
      const data = await routeService.addRoute(values);
      console.log(data);
      alert(data.mess);
      fetchRouteData();
    }
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
  const column2s = useMemo(() => [
    {
      accessorKey: "distance",
      header: "Distance (11.1)",
    },
    {
      accessorKey: "duration",
      header: "Duration (11)",
    },
    {
      accessorKey: "startTimeA",
      header: "Start Time For The Route (HH:MM)",
    },
    {
      accessorKey: "endTimeA",
      header: "End Time For The Route (HH:MM)",
    },
    {
      accessorKey: "startTimeB",
      header: "Start Time For Return Route (HH:MM)",
    },
    {
      accessorKey: "endTimeB",
      header: "End Time For Return Route (HH:MM)",
    },
    {
      accessorKey: "routeNum",
      header: "Route Num",
      enableEditing: false,
    },
    {
      accessorKey: "locationA",
      header: "Location For The Route",
      enableEditing: false,
    },
    {
      accessorKey: "locationB",
      header: "Location For Return Route",
      enableEditing: false,
    },
    {
      accessorKey: "tripSpacing",
      header: "Trip Spacing (11)",
    },
  ]);
  return (
    <>
      <Box className="table--container">
        <Typography variant="h3">Route</Typography>
        <MaterialReactTable
          columns={columns}
          data={routes}
          onPaginationChange={setPagination}
          // manualFiltering
          manualPagination
          enableEditing
          state={{ pagination }}
          rowCount={routes.length > 0 ? routes[0].totalElement : 5}
          onEditingRowSave={handleSaveRow}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Trips">
                <Link to={`/trip/route/${row.original.id}`}>
                  <IconButton>
                    <DriveEtaIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip arrow placement="right" title="Station-Route">
                <Link to={`/station-route/route/${row.original.id}`}>
                  <IconButton>
                    <RouteIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip arrow placement="right" title="Feedback">
                <Link to={`/feedback/route/${row.original.id}`}>
                  <IconButton>
                    <MessageIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton
                  color="error"
                  onClick={() => handleClickOpenDelete(row)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Route
            </Button>
          )}
          onGlobalFilterChange={setGlobalFilter}
        />
      </Box>
      <CreateNewAccountModal
        columns={column2s}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete id {deleteId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDeleteRow} autoFocus variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
