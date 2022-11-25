import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../../store/appContext.js";
import { Navigate, useNavigate } from "react-router-dom";
import Select from "react-select";
import PosterCompetition from "../../component/posterCompetition/PosterCompetition.jsx";
import Mensaje from "../../component/mensaje/Mensaje.jsx";
import "./CreateCompetition.css";
import { useEffect } from "react";

const categories = [
  { label: "RX Femenino", value: "rx_femenino" },
  { label: "RX Masculino", value: "rx_masculino" },
  { label: "Scalled Femenino", value: "scalled_femenino" },
  { label: "Scalled Masculino", value: "scalled_masculino" },
  { label: "Elite Femenino", value: "elite_femenino" },
  { label: "Elite Masculino", value: "elite_masculino" },
  { label: "Equipos", value: "equipos" },
];

const stages = [
  { label: "Inscripción abierta", value: "inscripción_abierta" },
  { label: "Inscripción cerrada", value: "inscripción_cerrada" },
  { label: "Competición finalizada", value: "competición_finalizada" },
];

function CreateCompetition() {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  if (store.userRol && store.userRol != "Rol.administration") {
    return <Navigate to="/" replace />;
  }

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState([]);
  const [requirements, setRequirements] = useState("");
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const validation = () => {
    if (
      name === "" ||
      date === "" ||
      category === [] ||
      requirements === "" ||
      description === "" ||
      stage === []
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleName = () => {
    if (name.length > 12) {
      setMensaje("El nombre es demasiado largo, máximo 12 caracteres.");
      setTipoMensaje("mensaje-error");
    } else {
      setMensaje("");
      setTipoMensaje("");
    }
  };

  const create_competition = (e) => {
    e.preventDefault();
    const url = process.env.BACKEND_URL + "/api/create-competition";
    if (validation()) {
      const body = {
        competition_name: name,
        qualifier_date: date,
        location: location,
        category: category.map((cat) => cat.value),
        requirements: requirements,
        description: description,
        stage: stage,
        poster_image_url: store.posterImagenUrl,
      };
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + store.tokenLS,
        },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(body),
      };

      fetch(url, options)
        .then((response) => {
          if (response.status === 401) {
            setTipoMensaje("mensaje-error");
          } else {
            setTipoMensaje("mensaje-correcto");
          }
          return response.json();
        })
        .then((data) => {
          setMensaje(data.result);
          setTimeout(() => {
            setMensaje("");
            setTipoMensaje("");
            actions.deleteUrlImg();
            navigate("/home/user");
          }, 2500);
        });
    } else {
      setMensaje("Todos los campos son obligatorios");
      setTipoMensaje("mensaje-error");
      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 2500);
    }
  };

  return (
    <div className="container-lg-fluid">
      <div className="row create-title">
        <h1 className="text-center m-0">Crea tu competición</h1>
        {mensaje && <Mensaje tipo={tipoMensaje}>{mensaje}</Mensaje>}
      </div>
      <div className="text-center">
        <div className="d-lg-flex">
          <div className="col-12 col-lg-8 align-items-center text-center">
            <PosterCompetition />
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="d-flex flex-column gap-3"
      >
        <input
          placeholder="Nombre de la competición"
          className="form-control"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
            handleName();
          }}
        />
        <div className="d-lg-flex justify-content-center align-items-center text-center gap-1">
          <input
            className="d-flex justify-content-start rounded col-pill input-date mt-2"
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />

          <Select
            name="stage"
            placeholder="Estado"
            options={stages}
            className="basic-single col-12 col-lg-4 mt-2"
            classNamePrefix="select"
            isSearchable={false}
            onChange={(e) => {
              setStage(e.value);
            }}
          />

          <Select
            isMulti
            name="category"
            placeholder="Categoría"
            options={categories}
            className="basic-multi-select col-12 col-lg-5 mt-2"
            classNamePrefix="select"
            isSearchable={false}
            onChange={(e) => {
              setCategory(e);
            }}
          />
        </div>

        <div>
          <input
            placeholder="Dirección"
            className="form-control"
            type="text"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>

        <textarea
          className="form-control create-requirements"
          placeholder="Requisitos"
          aria-label="With textarea"
          onChange={(e) => {
            setRequirements(e.target.value);
          }}
        ></textarea>

        <textarea
          className="form-control create-description"
          aria-label="With textarea"
          placeholder="Descripción de la competición"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <button
          className="btn col-12 mb-5 btn-sucessfull"
          onClick={(e) => create_competition(e)}
        >
          Crear competición
        </button>
      </form>
    </div>
  );
}

export default CreateCompetition;
