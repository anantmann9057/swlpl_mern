import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function AttendanceDialog(props){
    const [openDialog, setOpenDialog] = useState(props.openDialog);
    return <><Dialog
    open={openDialog}
    onClose={() => {
      setOpenDialog(false);
    }}
    slotProps={{
      paper: {
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          console.log(email);
        },
      },
    }}
  >
    <DialogTitle>Are you Sure?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        you want to submit this request?
      </DialogContentText>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="email"
        label="notes"
        type="text"
        fullWidth
        variant="outlined"
      />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => {
          setOpenDialog(false);
        }}
      >
        Cancel
      </Button>
      <Button type="submit">Subscribe</Button>
    </DialogActions>
  </Dialog></>
}