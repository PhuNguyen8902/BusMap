import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import queryLocation from "../../utils/queryLocation";
import { Box, Typography } from "@mui/material";
import feedbackService from "../../service/feedbackService";

export default function FeedbackByUserTable(props) {
  const [feedbacks, setFeedbacks] = useState([]);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    navigate(
      `?${queryLocation.toString({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      })}`
    );
    fetchFeedbackData();
  }, [pagination.pageIndex, pagination.pageSize]);

  const fetchFeedbackData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = await feedbackService.gettAllFeedbackByUserId(
      userId,
      urlParams.toString()
    );
    if (data.totalElements > 0) {
      const formattedFeedbacks = data.content.map((trip) => ({
        ...trip,
        dateFormat: new Date(trip.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        totalPage: data.totalPages,
        totalElement: data.totalElements,
      }));
      setFeedbacks(formattedFeedbacks);
    } else {
      alert("There're no feedbacks in this route");
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "Id",
      enableEditing: false,
    },
    {
      accessorKey: "content",
      header: "Content",
    },
    {
      accessorKey: "rate",
      header: "Rate",
    },
    {
      accessorKey: "dateFormat",
      header: "Date",
    },
    {
      accessorKey: "routeId.id",
      header: "Route Id",
      enableEditing: false,
    },
    {
      accessorKey: "userId.id",
      header: "User Id",
      enableEditing: false,
    },
  ]);

  return (
    <>
      <Box className="table--container">
        <Typography variant="h3">
          Feedback Of Route Id {props.routeId}
        </Typography>
        <MaterialReactTable
          columns={columns}
          data={feedbacks}
          onPaginationChange={setPagination}
          manualPagination
          enableGlobalFilter={false}
          state={{ pagination }}
          rowCount={feedbacks.length > 0 ? feedbacks[0].totalElement : 5}
        />
      </Box>
    </>
  );
}
