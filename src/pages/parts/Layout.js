import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import ThemeContext from "../../contexts/ThemeContext";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`d-flex flex-column min-vh-100 mx-auto ${theme}`}>
      {/* Navbar */}
      <Header />

      {/* aquí va el contenido de la app que cambia según la url */}
      <div>
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
