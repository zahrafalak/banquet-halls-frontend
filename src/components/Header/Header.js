import React from "react";
import "./Header.scss";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/ProjectLogo.svg";
import { useAuth } from "../../contexts/AuthContext";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";

const Header = () => {
  const { isAuthenticated, user, isAdmin } = useAuth();

  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img className="logo" src={Logo} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
          <Nav.Link as={Link} to="/halls">Halls</Nav.Link>
          {isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/booking">Booking</Nav.Link>
              <Nav.Link as={Link} to="/my-bookings">My Bookings</Nav.Link>
              {isAdmin && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
            </>
          )}
        </Nav>
        <Nav className="ms-auto align-items-start align-items-lg-center">
          {isAuthenticated ? (
            <>
              <Navbar.Text className="user-name me-2">
                {getInitials(user?.name)}
              </Navbar.Text>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;