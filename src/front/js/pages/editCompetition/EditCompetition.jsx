import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import Select from "react-select";
import PosterCompetition from "../../component/posterCompetition/PosterCompetition.jsx";
import Mensaje from "../../component/mensaje/Mensaje.jsx";
import "./editCompetition.css";

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
  { label: "Inscripción abierta", value: "inscripcion_abierta" },
  { label: "Inscripción cerrada", value: "inscripcion_cerrada" },
  { label: "Competición finalizada", value: "competicion_finalizada" },
];

function EditCompetition() {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [datas, setData] = useState({});

  let navigate = useNavigate();

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
        actions.setUrlImagen(data.competition.poster_image_url);
      });
  };

  const validation = () => {
    if (
      datas.competition_name === "" ||
      datas.qualifier_date === "" ||
      datas.category === [] ||
      datas.requirements === "" ||
      datas.description === "" ||
      datas.stage === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const edit_competition = (e) => {
    e.preventDefault();
    const url = process.env.BACKEND_URL + `/api/edit-competition/${id}`;
    if (validation()) {
      const body = {
        competition_name: datas.competition_name,
        qualifier_date: datas.qualifier_date,
        location: datas.location,
        category: datas.category,
        requirements: datas.requirements,
        description: datas.description,
        stage: datas.stage,
        poster_image_url: store.posterImagenUrl,
      };
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + store.tokenLS,
        },
        method: "PUT",
        body: JSON.stringify(body),
      };
      fetch(url, options).then(() => {
        setMensaje("Competición modificada");
        setTipoMensaje("mensaje-correcto");
        setTimeout(() => {
          setMensaje("");
          setTipoMensaje("");
          actions.deleteUrlImg();
          navigate("/home/user");
        }, 5000);
        return;
      });
    } else {
      setMensaje("Todos los campos son obligatorios");
      setTipoMensaje("mensaje-error");
      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 2500);
      return;
    }
  };

  const convertDate = (date) => {
    if (date) {
      let curr = new Date(date);
      curr.setDate(curr.getDate() + 3);
      return curr.toISOString().substring(0, 10);
    }
    return "";
  };

  if (
    store.userRol &&
    store.userRol != "Rol.administration" &&
    store.loading === false
  ) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="container-lg-fluid">
      <div>
        <div className="row create-title">
          <h1 className="text-center my-4">Edita tu competición</h1>
          {mensaje && <Mensaje tipo={tipoMensaje}>{mensaje}</Mensaje>}
        </div>
        <div className="text-center">
          <div className="d-lg-flex">
            <div className="col-12 col-lg-8">
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
              setData({
                ...datas,
                competition_name: e.target.value,
              });
            }}
            value={datas?.competition_name}
          />
          <div className="d-lg-flex justify-content-center align-items-center text-center gap-1">
            <input
              className="rounded col-pill input-date mt-2"
              type="date"
              onChange={(e) => {
                setData({
                  ...datas,
                  qualifier_date: e.target.value,
                });
              }}
              defaultValue={convertDate(datas?.qualifier_date)}
            />

            <Select
              name="stage"
              placeholder="Estado de la competición"
              options={stages}
              className="basic-single col-12 col-lg-4 mt-2"
              classNamePrefix="select"
              onChange={(e) => {
                setData({
                  ...datas,
                  stage: e.value,
                });
              }}
              value={{
                label: datas.stage?.toString()?.replace("_", " "),
                value: datas.stage?.toString()?.replace("_", " "),
              }}
            />

            <Select
              isMulti
              name="category"
              placeholder="Categoría"
              options={categories}
              className="basic-multi-select col-12 col-lg-5 mt-2"
              classNamePrefix="select"
              onChange={(e) => {
                setData({
                  ...datas,
                  category: e.map((cat) => cat.value),
                });
              }}
              value={
                datas?.category?.length &&
                datas.category.map((cat) => {
                  return cat
                    ? {
                        label: cat,
                        value: cat,
                      }
                    : null;
                })
              }
            />
          </div>

          <div>
            <input
              placeholder="Dirección"
              className="form-control"
              type="text"
              onChange={(e) => {
                setData({ ...datas, location: e.target.value });
              }}
              value={datas?.location}
            />
          </div>

          <textarea
            className="form-control create-requirements"
            placeholder="Requisitos"
            aria-label="With textarea"
            onChange={(e) => {
              setData({
                ...datas,
                requirements: e.target.value,
              });
            }}
            defaultValue={datas.requirements}
          ></textarea>

          <textarea
            className="form-control create-description"
            aria-label="With textarea"
            placeholder="Descripción de la competición"
            onChange={(e) => {
              setData({
                ...datas,
                description: e.target.value,
              });
            }}
            defaultValue={datas.description}
          ></textarea>

          <div className="col-md-12 d-flex align-items-center justify-content-evenly">
            <button
              className="btn col-5 btn-sucessfull"
              onClick={(e) => edit_competition(e)}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCompetition;
