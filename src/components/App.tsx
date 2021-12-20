import "./App.css";
import { Routes, Link, Route } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SignUp from "./SignUp";
import Login from "./Login";
import React from "react";
import Dashboard from "./Dashboard";


function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link to="/signin">Login</Link>
                <Link to="/signup">Sign up</Link>
                <Link to="/dashboard">Dashboard</Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/signin" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
