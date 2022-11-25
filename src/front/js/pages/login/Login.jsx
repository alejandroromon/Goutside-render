import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Mensaje from "../../component/mensaje/Mensaje.jsx";
import logo from "../../../img/logo-GOutside.png";
import "./login.css";
import "../../component/mensaje/mensaje.css";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setMensaje("Todos los campos son obligatorios");

      setTimeout(() => {
        setMensaje("");
      }, 2500);
      return;
    }

    let loginUser = await actions.login(email, password);
    if (loginUser) {
      navigate("/home/user");
      return;
    } else {
      setMensaje("Datos Inválidos");

      setTimeout(() => {
        setMensaje("");
      }, 2500);
      return;
    }
  };

  return (
    <div className="d-md-flex align-items-center text-center justify-content-evenly">
      <Link  to="/">
        <img className="login-logo-size" src={logo} alt="GOutside" />
      </Link>
      <form
        className="d-flex flex-column col-md-5 gap-1 ms-2 me-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-capitalize text-center">Iniciar sesión</h1>
        {mensaje && <Mensaje tipo="mensaje-error">{mensaje}</Mensaje>}
        <input
          placeholder="Email..."
          className="h-100 form-control mb-1"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Contraseña..."
          className="h-100 form-control mb-1"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn text-uppercase mb-1 shadow btn-validacion">
          login
        </button>
        <div className="d-flex mt-2 justify-content-around">
          <p>¿Todavía no tienes cuenta?</p>
          <Link
            to="/signup"
            className="text-decoration-none text-capitalize color-link"
          >
            Crear cuenta
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
