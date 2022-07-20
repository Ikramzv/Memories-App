import React, { useEffect } from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Container>
  );
}

export default App;
