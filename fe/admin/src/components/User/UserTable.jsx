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
import userService from "../../service/userService";

const formatTime = (hours, minutes) => {
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};
export default function UserTable() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = await userService.getAllUser(urlParams.toString());

    if (data.totalElements > 0) {
      const formattedUsers = data.content.map((user) => ({
        ...user,
        totalPage: data.totalPages,
        totalElement: data.totalElements,
      }));
      setUsers(formattedUsers);
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
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, globalFilter]);

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    if (!/^\d{10}$/.test(values.phone)) {
      alert("Wrong phone");
      return;
    }
    const data = await userService.editUser(values);
    alert(data.mess);
    fetchData();
    exitEditingMode();
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
      if (!/^\d{10}$/.test(values.phone)) {
        alert("Wrong phone");
        return;
      }
      const data = await userService.addUser(values);
      alert(data.mess);
      fetchData();
    }
  };
  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "Id",
      enableEditing: false,
    },
    {
      accessorKey: "username",
      header: "Username",
      enableEditing: false,
    },
    {
      accessorKey: "password",
      header: "Password",
      enableEditing: false,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      enableEditing: false,
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "role",
      header: "Role",
      enableEditing: false,
    },
  ]);
  const column2s = useMemo(() => [
    {
      accessorKey: "userName",
      header: "Username",
    },
    {
      accessorKey: "password",
      header: "Password",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
  ]);
  return (
    <>
      <Box className="table--container">
        <Typography variant="h3">User</Typography>
        <MaterialReactTable
          columns={columns}
          data={users}
          onPaginationChange={setPagination}
          manualPagination
          enableEditing
          state={{ pagination }}
          rowCount={users.length > 0 ? users[0].totalElement : 5}
          onEditingRowSave={handleSaveRow}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Feedback">
                <Link to={`/feedback/user/${row.original.id}`}>
                  <IconButton>
                    <MessageIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip arrow placement="right" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
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
              Create New User
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
    </>
  );
}
