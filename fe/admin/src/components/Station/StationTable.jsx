import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import queryLocation from "../../utils/queryLocation";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import stationService from "../../service/stationService";
import { CreateNewAccountModal } from "../form/CreateNewAccountModal";
import { Delete, Edit } from "@mui/icons-material";
import RouteIcon from "@mui/icons-material/Route";

export default function StationTable() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = await stationService.getAllStation(urlParams.toString());

    const formatted = data.content.map((station) => ({
      ...station,
      totalPage: data.totalPages,
      totalElement: data.totalElements,
    }));
    setData(formatted);
  };

  useEffect(() => {
    navigate(
      `?${queryLocation.toString({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      })}`
    );
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize]);

  const handleCreateNewRow = async (values) => {};
  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    // tableData[row.index] = values;
    // setTableData([...tableData]);
    const data = await stationService.editStation(values);

    alert(data);
    exitEditingMode();
  };

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "Id",
      size: 1,
      enableEditing: false,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "latitude",
      header: "Latitude",
      enableEditing: false,
    },
    {
      accessorKey: "longitude",
      header: "Longitude",
      enableEditing: false,
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "code",
      header: "Code",
      enableEditing: false,
    },
  ]);
  const column2s = useMemo(() => [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "latitude",
      header: "Latitude",
      enableEditing: false,
    },
    {
      accessorKey: "longitude",
      header: "Longitude",
      enableEditing: false,
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "code",
      header: "Code",
      enableEditing: false,
    },
  ]);
  return (
    <>
      <Box className="table--container">
        <Typography variant="h3">Station</Typography>
        <MaterialReactTable
          columns={columns}
          data={data}
          onPaginationChange={setPagination}
          enableEditing
          manualPagination
          state={{ pagination }}
          rowCount={data.length > 0 ? data[0].totalElement : 5}
          onEditingRowSave={handleSaveRow}
          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Station
            </Button>
          )}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Station-Route">
                <Link to={`/station-route/station/${row.original.id}`}>
                  <IconButton>
                    <RouteIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
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
