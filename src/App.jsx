import React, { useState, useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Weather from "./components/Weather";
import { createTheme } from "@mui/material/styles";
import Image from "/img/bg2.jpg"

const styles = createTheme( {
    App:{
      backgroundImage:   `url(${Image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      minHeight: "100vh"
    }
})

function App() {

  return (
    <div style={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList/>}/>
          <Route path="/create" element={<UserForm/>}/>
          <Route path="/edit/:id" element={<UserForm/>}/>
          <Route path="/clima/:id/:city" element={<Weather/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
