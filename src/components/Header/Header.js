import React from "react";
import "./Header.scss";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../../assets/images/ProjectLogo.svg";
import { useAuth } from "../../contexts/AuthContext";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";

const Header = () => {
  const { isAuthenticated, user, isAdmin } = useAuth();
  console.log('isAuthenticated:', isAuthenticated);


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
            {isAuthenticated && (
              <>
                <Nav.Link href="/booking">Booking</Nav.Link>
                <Nav.Link href="/my-bookings">My Bookings</Nav.Link>
                {isAdmin && <Nav.Link href="/admin">Admin</Nav.Link>}
              </>
            )}
          </Nav>
          <Nav className="ml-auto align-items-center">
            {isAuthenticated ? (
              <>
                <Navbar.Text className="mr-3 text-light">
                  {user?.name}
                </Navbar.Text>
                <LogoutButton />
              </>
            ) : (
              <LoginButton />
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;