import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Grid, Fab, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { createTheme } from "@mui/material/styles";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import ReplyIcon from "@mui/icons-material/Reply";

const styles = createTheme({
  vertical: {
    transformOrigin: "0 0",
    transform: "rotate(269deg)",
  },
});
const Weather = () => {
  const params = useParams();
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(true);
  console.log(params.id, params.city);
  const users = useSelector((state) => state.user);
  useEffect(() => {
    setUser(users.find((user) => user.id == params.id));
    const apikey = "fc5ceb11ff4ef490580c7f66bee332d5";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${apikey}`;
    axios.get(url).then(response => {
        setLocation(response.data)
        setLoading(false)
    })
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Grid
        padding={3}
        display="flex"
        justifyContent={"space-between"}
      >
        <Fab variant="extended" color="primary" onClick={()=>navigate("/")}>
          <ReplyIcon sx={{ mr: 1 }} />
        </Fab>
        <Typography variant="h3" color="papayawhip">
          {user.user}
        </Typography>
      </Grid>

      <Grid container height={"90vh"} display="flex">
        <Grid
          item
          md={8}
          sm={6}
          display="flex"
          flexDirection={"column"}
          justifyContent="space-between"
          textAlign="center"
        >
          <Grid item>
            <Typography padding={1} variant="h1" color="white">
              {location.name}
            </Typography>
            <Typography padding={1} variant="h2" color="white">
            {parseInt((location.main.temp)-273.15)} C°
            </Typography>
          </Grid>
          <Grid item>
            <Icon icon={`bi:${location.weather[0].main.toLowerCase()}`} width="300" />
          </Grid>
          <Grid item>
            <Fab variant="extended">
              <OpacityOutlinedIcon sx={{ mr: 3 }} />
              {location.main.humidity}%
            </Fab>

            <Fab variant="extended">
              <AirOutlinedIcon sx={{ mr: 3 }} />
              {location.wind.speed} m/s
            </Fab>
          </Grid>
        </Grid>
        <Grid
          item
          md={4}
          sm={6}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography style={styles.vertical} variant="h4">
          {location.weather[0].main}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Weather;
