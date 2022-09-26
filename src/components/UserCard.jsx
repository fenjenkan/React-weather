import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/users/userSlice";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Grid,
} from "@mui/material";
import ThermostatSharpIcon from "@mui/icons-material/ThermostatSharp";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme } from "@mui/material/styles";

const styles = createTheme( {
  header:{
    backgroundColor: "cornflowerblue"
  },
 
})

const UserCard = ({ name, ciudad, lat, lon, id }) => {
  const [random, setRandom] = useState();
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    setRandom(getRandomInt(30));
  }, []);

  return (
    <Card>
      <CardHeader
        style={styles.header}
        title={name}
        subheader={ciudad}
        avatar={<Avatar src={`https://robohash.org/${random}`} />}
        action={
          <Link to={`/clima/${id}/${ciudad}`}>
            <IconButton aria-label="settings">
              <ThermostatSharpIcon />
            </IconButton>
          </Link>
        }
      />
      <CardContent>
        <Grid container justifyContent="center">
          <Grid item md={6} padding={1}>
            <Typography variant="h5">Latitud</Typography>
            <Typography variant="subtitle">{lat}</Typography>
          </Grid>
          <Grid item md={6} padding={1}>
            <Typography variant="h5">Longitud</Typography>
            <Typography>{lon}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Delete" onClick={() => handleDelete(id)}>
          <DeleteIcon/>
        </IconButton>
        <Link to={`/edit/${id}`}><IconButton aria-label="Edit">
          <EditIcon />
        </IconButton></Link>
      </CardActions>
    </Card>
  );
};

export default UserCard;
