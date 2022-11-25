import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import Mensaje from "../../component/mensaje/Mensaje.jsx";
import logo from "../../../img/logo-GOutside.png";
import "./InfoCompetition.css";

const InfoCompetition = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const [datas, setData] = useState({});

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [navegar, setNavegar] = useState(false);

  const competition_date = new Date(datas.qualifier_date).toLocaleDateString(
    "es-ES"
  );

  const navigate = useNavigate();

  useEffect(() => {
    getCompetitionInfo();
  }, [id]);

  const getCompetitionInfo = () => {
    const url = process.env.BACKEND_URL + `/api/competition/${id}`;

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + actions.getTokenLS(),
      },
      method: "GET",
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setData(data.competition);
      });
  };

  const addCompetitorToCompetition = (competition_id) => {
    const url = process.env.BACKEND_URL + "/api/my-competitions";

    const body = {
      competition_id,
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + actions.getTokenLS(),
      },
      method: "POST",
      body: JSON.stringify(body),
    };
    const resp = fetch(url, options).then((response) => response.json());
    if (resp.status === 200) {
      setMensaje(
        "¡FELICIDADES! Tu inscripción se ha realizado con éxito. Por favor, acude a tu correo electrónico para finalizar el proceso"
      );
      setTipoMensaje("mensaje-correcto");
      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 7000);
      return;
    } else {
      setMensaje(
        "se ha producido un error en la inscripción. Contacte con el administrador"
      );
      setTipoMensaje("mensaje-error");

      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 3000);
      return;
    }
  };

  const navigateProfile = () => {
    navigate("/edit-profile");
  };

  const handleInscription = () => {
    if (
      store.userName === null ||
      store.userLastName === null ||
      store.userAdress === null ||
      store.userGender === null ||
      store.userPhone === null
    ) {
      setMensaje(
        "Para poder inscribirse debe completar todos los datos de su perfil. Una vez completados, vuelva a la inscripción."
      );
      setTipoMensaje("mensaje-error");
      setNavegar(true);
      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
        setNavegar(false);
      }, 3000);
      return;
    } else {
      addCompetitorToCompetition();
    }
  };

  return (
    <>
      {mensaje && <Mensaje tipo={tipoMensaje}>{mensaje}</Mensaje>}

      {navegar && (
        <button className="btn btn-sucessfull" onClick={navigateProfile}>
          Editar Perfil
        </button>
      )}

      <div className="container-fluid mb-3 rounded infocompetition-card-size">
        <div className="row">
          <div className="col-md-3 m-2 d-flex justify-content-center align-items-center">
            <img
              src={!datas.poster_image_url ? logo : datas.poster_image_url}
              className="rounded infocompetition-img-card"
              alt="cartel competicion"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body col-12">
              <div className="d-flex">
                <div className="col-8">
                  <h5 className="card-title fw-bold">
                    {datas.competition_name}
                  </h5>
                  <p className="infocompetition-text-p ">
                    {datas.qualifier_date}
                  </p>
                  <p className="infocompetition-text-p ">{datas.location}</p>
                </div>

                <div>
                  <h5 className="fw-bold infocompetition-text-p">Estado</h5>
                  <p className="infocompetition-text-p ">
                    {datas.stage?.toString()?.replace("_", " ")}
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div>
                  <h5 className="fw-bold infocompetition-text-p">Categorías</h5>
                  <div className="d-lg-flex gap-4 col-8">
                    {datas.category?.map((categoria) => (
                      <p key={categoria} className="infocompetition-text-p col">
                        {categoria.toString()?.replace("_", " ")}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <h5 className="fw-bold infocompetition-text-p">Requisitos</h5>
              <p className="infocompetition-text-p ">{datas.requirements}</p>
              <h5 className="fw-bold infocompetition-text-p">Descripción</h5>
              <p className="infocompetition-text-p ">{datas.description}</p>
              <div className="">
                <Link to={-1}>
                  <button className="btn col-12 col-md-5 m-1 btn-sucessfull">
                    Volver
                  </button>
                </Link>

                {datas.adminid === store.userId ? (
                  <Link to={`/edit-competition/${datas.id}`}>
                    <button className="btn col-12 col-md-5 m-1 btn-validacion">
                      Editar
                    </button>
                  </Link>
                ) : (
                  <button
                    className="btn col-12 col-md-5 m-1 btn-validacion"
                    onClick={() => handleInscription()}
                  >
                    Participar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCompetition;
