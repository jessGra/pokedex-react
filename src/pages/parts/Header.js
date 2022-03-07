import logo from "../../pokeball-logo.svg";

import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import ThemeContext from "../../contexts/ThemeContext";

const Header = () => {
  const { theme, handleChangeTheme } = useContext(ThemeContext);
  const { auth, handleAuth } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect variant={theme} bg={theme === 'dark' && theme} className="mb-auto p-3">
      <Container>
        <Navbar.Brand>
          <img src={logo} className="logo" alt="logo pokeball" /> React Pokedex
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link onClick={() => handleAuth(false)}>
              {auth && "Cerrar Sesión"}
            </Nav.Link>
            <Nav.Link onClick={handleChangeTheme}>
              {theme === "light" ? "🌚" : "☀️"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
