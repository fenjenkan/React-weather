import React, { useState, useEffect } from "react";
import axios from "axios";
import { addUser, updateUser } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Grid, Box, Typography,IconButton } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import ReplySharpIcon from '@mui/icons-material/ReplySharp';
const styles = createTheme({
  contenedor: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },
  form:{
    width: "500px",
    padding: "10px"
  },
  nada:{
  }
});
const UserForm = () => {

  const [user, setUser] = useState({
    user: "",
    ciudad: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const users = useSelector((state) => state.user);

  const handleChange = (e) => {
    console.log(e.target.name);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  async function servicio(city) {
    const apikey = "fc5ceb11ff4ef490580c7f66bee332d5";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await axios.get(url);
    console.log(response.data.coord.lat);
    
    if (params.id) {
      dispatch(
        updateUser({
          ...user,
          lat: response.data.coord.lat,
          lon: response.data.coord.lon,
        })
      );
    } else {
      dispatch(
        addUser({
          ...user,
          id: uid(),
          lat: response.data.coord.lat,
          lon: response.data.coord.lon,
        })
      );
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    servicio(user.ciudad);
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setUser(users.find((user) => user.id == params.id));
    }
  }, []);
  return (
    <div style={params.id? styles.contenedor: styles.nada}>
      <form action="" onSubmit={handleSubmit} style={styles.form}>
      {params.id ?<IconButton aria-label="delete" color="default"  onClick={()=>navigate("/")}>
        <ReplySharpIcon  />
      </IconButton>: ""}
        { params.id ? <Typography variant="h3" textAlign={"center"} color="white" >Editar Usuario</Typography> : ""}
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems={"center"}
          maxWidth={450}
          margin="auto"
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            backgroundColor: 'white',
            ":hover": {
            boxShadow: "10px 10px 20px #ccc",
            
          }}}
          
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="user"
            variant="standard"
            value={user.user}
            name="user"
            onChange={handleChange}
          />
          <br />
          <TextField
            margin="dense"
            id="Ciudad"
            label="Ciudad"
            type="user"
            variant="standard"
            value={user.ciudad}
            name="ciudad"
            onChange={handleChange}
          />
          <Button type="submit">Guardar</Button>
        </Box>
      </form>
    </div>
  );
};

export default UserForm;
