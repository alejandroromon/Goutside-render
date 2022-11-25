import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Mensaje from "../../component/mensaje/Mensaje.jsx";
import logo from "../../../img/logo-GOutside.png";
import "./allCompetition.css";

const AllCompetition = () => {
  const [competitions, setCompetitions] = useState([]);
  const { store, actions } = useContext(Context);

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [navegar, setNavegar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getCardsInfo();
  }, []);

  const getCardsInfo = () => {
    const url = process.env.BACKEND_URL + "/api/competitions";
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
        setCompetitions(data.competitions);
        actions.getImageCompetitions(data.competitions.poster_image_url);
      });
  };

  const addCompetitorToCompetition = async (competition_id) => {
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
    const resp = await fetch(url, options);

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
        "Se ha producido un error en la inscripción. Contacte con el administrador"
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

  const handleInscription = (competitionId) => {
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
      addCompetitorToCompetition(competitionId);
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
      <div className="row">
        {competitions.length === 0 ? (
          <div className="d-flex justify-content-center mt-5">
            <h1 className="col-12 text-center">
              Todavía no hay ninguna competición
            </h1>
          </div>
        ) : (
          competitions.map((competition) => {
            return (
              <div
                key={competition.id}
                className="card m-2 allcompetition-card-size"
              >
                <img
                  src={
                    !competition.poster_image_url
                      ? logo
                      : competition.poster_image_url
                  }
                  className="mt-2 rounded allcompetition-img-card"
                  alt="cartel competicion"
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold card-title">
                    {competition.competition_name}
                  </h5>
                  <p className="m-0 allcompetition-text-p">
                    {competition.qualifier_date}
                  </p>
                  <p className="m-0 allcompetition-text-p">
                    {competition.location}
                  </p>
                  <p className="allcompetition-text-p">
                    {competition.stage?.toString()?.replace("_", " ")}
                  </p>
                  <div className="d-flex justify-content-center gap-3 mb-3 position-absolute bottom-0 start-50 translate-middle-x">
                    <Link to={`/competition/${competition.id}`}>
                      <button className="btn btn-sucessfull">+INFO</button>
                    </Link>

                    {competition.adminid === store.userId ? (
                      <Link to={`/edit-competition/${competition.id}`}>
                        <button className="btn btn-validacion">Editar</button>
                      </Link>
                    ) : (
                      <button
                        className="btn btn-validacion"
                        onClick={() => handleInscription(competition.id)}
                      >
                        Participar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default AllCompetition;
