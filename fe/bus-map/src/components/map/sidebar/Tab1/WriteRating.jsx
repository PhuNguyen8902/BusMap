import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Rating, Stack, TextField } from "@mui/material";
import { Rtt, TextFields } from "@mui/icons-material";
import feedbackService from "../../../../service/feedbackService";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { set } from "react-hook-form";

export default function WriteRating(props) {

  const [isComment, setIsComment] = useState(false)

  // console.log("isComment: ", isComment);

  const auth = useSelector((state) => state.auth);

  const { routeId } = useParams();

  const [rate, setRate] = useState({
    id: null,
    rate: 1,
    content: "",
    routeId: routeId,
    userId: auth.user.id,
  })
  // console.log("rate in WriteRating: ", rate);

  const handleRateChange = (e) => {
    setRate({
      ...rate,
      rate: e.target.value,
    });
  }

  const handleCommentChange = (e) => {
    setRate({
      ...rate,
      content: e.target.value,
    });
  }

  const handleClose = () => {

 
    props.onClose();
  };

  const handleSubmit = () => {

    props.onChange();
    if (isComment == false) {
      const addFeedbackData = feedbackService.addFeedback(rate);
      
      setIsComment(true)
      console.log("add feedback sucessfully");
      props.onClose();
      return
    }

    const editFeedbackData = feedbackService.editFeedback(rate);
    setIsComment(true)
    
    console.log("update feedback sucessfully");
    props.onClose();
  };

  useEffect(() => {
    if (auth.isLogin) {
      const fetchFeedbackData = async () => {
        const feedbackData = await feedbackService.getFeedbackByRouteIdAndUserId(routeId, auth.user.id)

        // console.log("feedBackData: ", feedbackData);

        if (feedbackData == null) {
          console.log("data is null")
          return 0;
        }
        // console.log("log");

        setIsComment(true)

        setRate({
          id: feedbackData.id,
          rate: feedbackData.rate,
          content: feedbackData.content,
          routeId: routeId,
          userId: auth.user.id,
        });
      }

      fetchFeedbackData();
    }

  }, [auth, isComment])

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Please Submit your rating in order to improve ours service: "}
      </DialogTitle>
      <DialogContent>
        <Stack>
          <Rating
            sx={{ marginBottom: "5%" }}
            value={rate.rate}
            onChange={handleRateChange}
          />
          <TextField
            placeholder="Write here..."
            multiline
            rows={20}
            maxRows={20}
            value={rate.content}
            onChange={handleCommentChange}
            sx={{
              backgroundColor: "rgb(252, 249, 243)",
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
