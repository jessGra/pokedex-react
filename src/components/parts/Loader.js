import React, { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import "./Loader.css";

function Loader() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ textAlign: "center" }}>
      <div className={`lds-roller lds-roller-${theme}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
