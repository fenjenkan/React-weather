import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import UserForm from "./userForm";
import { createTheme } from "@mui/material/styles";

const styles = createTheme({
  icon:{
    fontSize: "45px"
  }
})
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="delete" color="success"  onClick={handleClickOpen}>
        <PersonAddAlt1Icon style={styles.icon} />
      </IconButton>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Crea un nuevo usuario con su nombre y la ciudad
          </DialogContentText>
          <UserForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
