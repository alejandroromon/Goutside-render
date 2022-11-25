import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import logo from "../../../img/logo-GOutside.png";
import X_transp from "../../../img/X_transp.png";
import "./home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container text-center">
      <h1 className="d-flex mt-5 justify-content-center align-items-center home-title-size">
        ¡Bienvenid{" "}
        <img className="home-X-icon" src={X_transp} alt="titulo bienvenidos" />
        s!
      </h1>

      <div className="d-md-flex align-items-center justify-content-evenly">
        <img className="home-logo" src={logo} />
        <div className="row mx-auto home-buttons">
          <div className="row mx-auto">
            <div className="col-md-12 ms-auto align-items-center justify-content-center home-subtitle">
              <p className="home-p-size">
                ¿Quieres estar al día de las competiciones de tu región?
              </p>
            </div>
            <div className="col-md-12 d-flex gap-2 align-items-center justify-content-evenly">
              <Link to="/Signup">
                <button className="btn btn-validacion">
                  Conviértete en GOutsider
                </button>
              </Link>
              <Link to="/Login">
                <button className="btn btn-validacion">Inicia sesión</button>
              </Link>
            </div>
          </div>
          <div>
            <p className="mt-5 home-p-size">
              ¿Eres organizador de eventos deportivos?{" "}
            </p>
            <p className="home-p-size">
              ¿Te gustaría gestionar tus eventos con nosotros?
            </p>
            <Link to="/about-us" className="color-link">
              Nosotros te ayudamos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
