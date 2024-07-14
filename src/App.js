import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Home from "./page/homePage";
import Contact from "./page/contact";
import Detail from "./page/sectionDetail";
import AddSection from "./page/addSection";
import Dashboard from "./page/dashBoard";
import ServicePage from "./page/servicePage";
import Trangmoi from "./page/trangmoi";

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6" style={{ marginLeft: "20px" }}>
            <Link
              to="/dashboard"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Dashboard
            </Link>
          </Typography>
          <Typography variant="h6" style={{ marginLeft: "20px" }}>
            <Link
              to="/contact"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Contact
            </Link>
          </Typography>
          <Typography variant="h6" style={{ marginLeft: "20px" }}>
            <Link
              to="/trangmoi"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Trang moi
            </Link>
          </Typography>

        

        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trangmoi" element={<Trangmoi />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/add" element={<AddSection />} />
      </Routes>
    </Router>
  );
};

export default App;
