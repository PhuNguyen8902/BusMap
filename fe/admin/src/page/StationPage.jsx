import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryLocation from "../utils/queryLocation";
import { Box } from "@mui/material";
import stationService from "../service/stationService";

export default function StationPage() {
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
  return (
    <Box className="table--container">
      <MaterialReactTable
        columns={columns}
        data={data}
        onPaginationChange={setPagination}
        enableEditing
        manualPagination
        state={{ pagination }}
        rowCount={data.length > 0 ? data[0].totalElement : 5}
        onEditingRowSave={handleSaveRow}
      />
    </Box>
  );
}
