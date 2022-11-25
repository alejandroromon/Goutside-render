import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import Mensaje from "../mensaje/Mensaje.jsx";
import "./deleteprofile.css";

const DeleteProfile = () => {
  const { store, actions } = useContext(Context);
  const [mensaje, setMensaje] = useState("");
  let navigate = useNavigate();

  const goNavigate = () => {
    setMensaje("Datos modificados correctamente");

    setTimeout(() => {
      setMensaje("");
      actions.deleteUser();
      localStorage.clear();
      navigate("/");
    }, 2500);
  };

  return (
    <div className="delete-text-color">
      <button
        type="button"
        className="btn btn-cancelar"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Eliminar cuenta
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              {mensaje ? (
                <Mensaje tipo="mensaje-correcto">{mensaje}</Mensaje>
              ) : (
                "¿Seguro que quiere eliminar la cuenta?"
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn delete-profiile-btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  goNavigate();
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
