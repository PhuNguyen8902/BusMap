import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Rating, Stack, TextField } from "@mui/material";
import { TextFields } from "@mui/icons-material";

export default function WriteRating(props) {
  const handleClose = () => {
    props.onClose();
  };

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
          <Rating sx={{ marginBottom: "5%" }} />
          <TextField
            placeholder="Write here..."
            multiline
            rows={20}
            maxRows={20}
            sx={{
              backgroundColor: "rgb(252, 249, 243)",
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
