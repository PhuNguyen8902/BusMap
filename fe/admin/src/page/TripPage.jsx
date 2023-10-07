import tripService from "../service/tripService";
import { useNavigate } from "react-router-dom";
import queryLocation from "../utils/queryLocation";
import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
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
import { CreateNewAccountModal } from "../components/form/CreateNewAccountModal";

const formatTime = (hours, minutes) => {
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};
export default function TripPage(props) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [trips, setTrips] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(
      `?${queryLocation.toString({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      })}`
    );
    fetchTripData();
  }, [pagination.pageIndex, pagination.pageSize]);
  const fetchTripData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = await tripService.getAllTripByRoute(
      props.routeId,
      urlParams.toString()
    );
    if (data.totalElements > 0) {
      const formattedTrips = data.content.map((trip) => ({
        ...trip,
        startTimeNeed: formatTime(trip.startTime[0], trip.startTime[1]),
        totalPage: data.totalPages,
        totalElement: data.totalElements,
      }));
      setTrips(formattedTrips);
    } else {
      alert("You need to update the Trip Spacing for the Route");
    }
  };
  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    let form = {
      id: values.id,
      routeId: values["routeId.id"],
      startTime: values.startTimeNeed,
    };

    const data = await tripService.editTrip(form);
    alert(data.mess);
    fetchTripData();
    exitEditingMode();

    // if (data == true) {
    //   alert("thanh cong");
    //   fetchTripData();
    //   exitEditingMode();
    // } else {
    //   var errorMessages = [];
    //   data.errors.forEach(function (error) {
    //     var defaultMessage = error.defaultMessage;
    //     errorMessages.push(defaultMessage);
    //   });
    //   alert(errorMessages);
    // }
  };

  const handleDeleteRow = async () => {
    const data = await tripService.deleteTrip(deleteId);
    alert(data.mess);
    fetchTripData();
    setOpenDelete(false);

    // if (data == true) {
    //   alert("thanh cong roi");
    //   setOpenDelete(false);
    //   fetchTripData();
    // } else {
    //   alert("bi loi roi");
    // }
  };
  const handleClickOpenDelete = (row) => {
    setDeleteId(row._valuesCache.id);

    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCreateNewRow = async (values) => {
    let form = {
      routeId: props.routeId,
      startTime: values.startTime,
    };
    let hasEmptyValue = false;
    Object.keys(form).forEach((key) => {
      if (form[key] === "") {
        hasEmptyValue = true;
        alert(key + " cannot be null");
      }
    });

    if (!hasEmptyValue) {
      const data = await tripService.addTrip(form);
      alert(data.mess);
      fetchTripData();
      //   if (data == true) {
      //     alert("thanh cong roi");
      //     // setCreateModalOpen(false);
      //     fetchTripData();
      //   } else {
      //     var errorMessages = [];

      //     data.errors.forEach(function (error) {
      //       var defaultMessage = error.defaultMessage;
      //       errorMessages.push(defaultMessage);
      //     });

      //     alert(errorMessages);
      //   }
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "Id",
      enableEditing: false,
    },
    {
      accessorKey: "startTimeNeed",
      header: "Start Time",
    },
    {
      accessorKey: "routeId.id",
      header: "Route Id",
      enableEditing: false,
    },
    {
      accessorKey: "routeId.routeNum",
      header: "Route Num",
      enableEditing: false,
    },
  ]);
  const column2s = useMemo(() => [
    {
      accessorKey: "startTime",
      header: "Start Time (HH:MM)",
    },
  ]);
  return (
    <>
      <Box className="table--container">
        <Typography variant="h3">Trip Of Route Id {props.routeId}</Typography>
        <MaterialReactTable
          columns={columns}
          data={trips}
          onPaginationChange={setPagination}
          manualPagination
          enableEditing
          enableGlobalFilter={false}
          state={{ pagination }}
          rowCount={trips.length > 0 ? trips[0].totalElement : 5}
          onEditingRowSave={handleSaveRow}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
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
              Create New Trip
            </Button>
          )}
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
            If you delete it, you won't be able to restore it, are you sure?
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
