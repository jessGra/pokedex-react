import "./Footer.css";
import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
/* import ThemeContext from "../../contextos/ThemeContext"; */

const Footer = () => {
  const [active, setActive] = useState("inicio");
  const handleItemActive = (ruta) => {
    setActive(ruta);
  };
  /* const { theme } = useContext(ThemeContext); //variable thema en el context */
  return (
    <footer className="mt-auto p-3 text-center bg-dark text-light">
      {/* <p>mi pie de pag @JesGra - Theme:  {theme}</p> */}

      <Row className="fixed-bottom nav-footer">
        <Col
          className={
            `p-0 nav-footer-item ` +
            (active === "inicio" ? "nav-footer-item-active" : "")
          }
          onClick={() => handleItemActive("inicio")}
        >
          <Link to="/" className="p-3 nav-footer-link">
            Inicio
          </Link>
        </Col>
        <Col
          className={
            `p-0 nav-footer-item ` +
            (active === "favoritos" ? "nav-footer-item-active" : "")
          }
          onClick={() => handleItemActive("favoritos")}
        >
          <Link to="/favoritos" className="p-3 nav-footer-link">
            Favoritos
          </Link>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
