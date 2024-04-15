import React from "react";
import "./Header.scss";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../../assets/images/ProjectLogo.svg";

const Header = () => {
  return (
    <>
      <Navbar className="custom-navbar" expand="lg">
        <Navbar.Brand href="/">
          <img className="logo" src={Logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/menu">Menu</Nav.Link>
            <Nav.Link href="/halls">Halls</Nav.Link>
            <Nav.Link href="/booking">Booking</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
