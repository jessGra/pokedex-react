import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import ThemeContext from "../contexts/ThemeContext";
import "./Login.css";
import Message from "./parts/Message";
const user = {
  username: "ash",
  password: "ketchum",
  token: "qwerty",
};
const Login = () => {
  const { theme } = useContext(ThemeContext);
  let from = useLocation().state?.from?.pathname || null;
  const [form, setForm] = useState({
    username: "",
    password: "",
  }); //variable que aloja la información del form

  const { handleAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (form.username === user.username && form.password === user.password) {
      alert("bienvevido", user.username);
      //establezco en el storages el token
      localStorage.setItem("_token", JSON.stringify(user.token));
      handleAuth(true);
      navigate(from || "/");
    } else {
      alert("Credenciales incorrectas");
      localStorage.removeItem("_token");
    }
  };

  return (
    <main className="p-md-3 p-0 text-center mb-5 mx-auto w-lg-50">
      <h1 className="title">Login</h1>
      {from && (
        <Message
          msg={`Debes iniciar sesión primero`}
          bgColor="#902022"
          className="mt-3 mx-auto w-50"
        />
      )}
      <form className="mt-5 p-3 mx-auto" onSubmit={handleLogin}>
        <div className="row mb-3">
          <label htmlFor="inputUsername" className="col-sm-2 col-form-label">
            Usuario
          </label>

          <div className="col">
            <input
              type="text"
              className={`form-control ${theme === "dark" && "dark"}`}
              id="inputUsername"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Contraseña
          </label>
          <div className="col">
            <input
              type="password"
              className={`form-control ${theme === "dark" && "dark"}`}
              id="inputPassword"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-dark">
          Iniciar Sesión
        </button>
      </form>
    </main>
  );
};

export default Login;
