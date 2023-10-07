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
import stationRouteService from "../service/stationRouteService";

export default function StationRoutePage(props) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [stationRoutes, setStationRoutes] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const navigate = useNavigate();

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
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, globalFilter]);
  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = await stationRouteService.getAllStationRoute(
      props.routeId,
      urlParams.toString()
    );
    if (data.totalElements > 0) {
      const formatted = data.content.map((s) => ({
        ...s,
        totalPage: data.totalPages,
        totalElement: data.totalElements,
      }));
      setStationRoutes(formatted);
    } else {
      alert("You need to update the Station Route for the Route");
      setStationRoutes(data.content);
    }
  };

  const handleDeleteRow = async () => {
    const data = await stationRouteService.deleteStationRoute(deleteId);

    alert(data.mess);
    fetchData();
    setOpenDelete(false);
  };
  const handleClickOpenDelete = (row) => {
    setDeleteId(row._valuesCache.id);

    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "Id",
      enableEditing: false,
    },
    {
      accessorKey: "priority",
      header: "Priority",
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
    {
      accessorKey: "stationId.id",
      header: "Station Id",
      enableEditing: false,
    },
    {
      accessorKey: "stationId.code",
      header: "Station Code",
      enableEditing: false,
    },
  ]);
  const column2s = useMemo(() => [
    {
      accessorKey: "priority",
      header: "Priority",
    },
    {
      accessorKey: "stationId.code",
      header: "Station Code",
      enableEditing: false,
    },
  ]);

  const checkPriority = async (priority, stationId) => {
    const data = await stationRouteService.findByPriority(
      priority,
      props.routeId,
      stationId
    );

    if (data.mess == "Valid Priority") {
      return true;
    }
    alert(data.mess);
    return false;
  };

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    var rs = await checkPriority(values.priority, values["stationId.id"]);
    if (rs == true) {
      let form = {
        id: values.id,
        priority: values.priority,
      };
      const data = await stationRouteService.editStationRoute(form);

      alert(data.mess);
      fetchData();
      exitEditingMode();
    }
  };

  const handleCreateNewRow = async (values) => {
    let form = {
      routeId: props.routeId,
      code: values["stationId.code"],
      priority: values.priority,
    };
    let hasEmptyValue = false;
    Object.keys(form).forEach((key) => {
      if (form[key] === "") {
        hasEmptyValue = true;
        alert(key + " cannot be null");
      }
    });

    if (!hasEmptyValue) {
      const data = await stationRouteService.addStationRoute(form);
      alert(data.mess);
      fetchData();
    }
  };

  return (
    <>
      <Box className="table--container">
        <Typography variant="h3">
          Station-Route Of Route Id {props.routeId}
        </Typography>
        <MaterialReactTable
          columns={columns}
          data={stationRoutes}
          onPaginationChange={setPagination}
          manualPagination
          enableEditing
          state={{ pagination }}
          onGlobalFilterChange={setGlobalFilter}
          rowCount={
            stationRoutes.length > 0 ? stationRoutes[0].totalElement : 5
          }
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
              Create New
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
