import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import UserCard from "./UserCard";
import { createTheme } from "@mui/material/styles";
import Image from "/img/bg.jpg";

import FormDialog from "./FormDialog";


const styles = createTheme({
  App: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
    padding: "10px"
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  },
  user:{
    fontSize: "xxx-large",
    
  }
});

const UserList = () => {
  const Users = useSelector((state) => state.user);
  return (
    <div style={styles.App}>
      <Grid container padding={3}>
        <Grid item md={4}></Grid>
        <Grid item md={4} style={styles.item}>
          <Typography variant="h3" color='info'>Usuarios {Users.length}</Typography>
        </Grid>
        <Grid item md={4} style={styles.item}>
          <FormDialog/>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center">
        {Users.map((user) => (
          <Grid item md={4} xs={10} key={user.id}>
            <UserCard
              name={user.user}
              ciudad={user.ciudad}
              lat={user.lat}
              lon={user.lon}
              id={user.id}
            ></UserCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserList;
