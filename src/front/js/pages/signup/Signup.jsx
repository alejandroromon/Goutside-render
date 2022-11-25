import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Mensaje from "../../component/mensaje/Mensaje.jsx";
import logo from "../../../img/logo-GOutside.png";
import "./signup.css";
import "../../component/mensaje/mensaje.css";

const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [mensaje, setMensaje] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let regexEmail = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );

    let regexPassword = new RegExp(
      "^(?=.*d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])S{8,16}$"
    );

    if (store.error === true) {
      setMensaje("El correo electrónico ya dispone de cuenta");
      setTimeout(() => {
        setMensaje("");
        actions.changeError();
      }, 2500);
      return;
    }
    if ([email, password1, password2].includes("")) {
      setMensaje("Todos los campos son obligatorios");

      setTimeout(() => {
        setMensaje("");
      }, 2500);
      return;
    } else if (password1 != password2) {
      setMensaje("Las contraseñas deben ser iguales");

      setTimeout(() => {
        setMensaje("");
      }, 2500);
      return;
    } else if (!regexEmail.test(email)) {
      setMensaje("E-mail no válido");

      setTimeout(() => {
        setMensaje("");
      }, 2500);
      return;
    } else if (regexPassword.test(password1)) {
      setMensaje(
        "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico."
      );
      setTimeout(() => {
        setMensaje("");
      }, 5000);
      return;
    }
    let signupUser = await actions.signup(email, password1, password2);

    if (signupUser) {
      navigate("/home/user");
    }
  };
  return (
    <div className="d-md-flex align-items-center justify-content-evenly text-center">
      <Link to="/">
        <img className="signup-logo-size" src={logo} alt="GOutside" />
      </Link>
      <form
        className="d-flex flex-column col-md-5 gap-1 ms-2 me-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-capitalize text-center">Crear cuenta</h1>
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
          onChange={(e) => setPassword1(e.target.value)}
        />
        <input
          placeholder="Repetir contraseña..."
          className="h-100 form-control mb-1"
          type="password"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button className="btn text-uppercase mb-1 shadow btn-validacion">
          crear usuario
        </button>
        <div className="d-flex mt-2 justify-content-around">
          <p>¿Ya tienes cuenta?</p>
          <Link
            to="/login"
            className="text-decoration-none text-capitalize color-link"
          >
            Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
