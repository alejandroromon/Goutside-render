import React, { useContext } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../../component/inputSearch/InputSearch.jsx";
import { Context } from "../../store/appContext.js";
import AllCompetition from "../allCompetition/AllCompetition.jsx";
import MyAllCompetitions from "../myAllCompetition/MyAllCompetition.jsx";
import Card from "./cards/Card.jsx";
import "./HomeUser.css";

const HomeUser = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="align-items-center justify-content-md-center text-center home-user-container">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
        {/* CARROUSEL ITEM */}
          <div className="carousel-item">
            <div className="card align-items-center justify-content-md-center text-center home-user-card">
              <div className="container-fluid align-items-center d-flex justify-content-between">
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <h2 className="mt-3">
                  ¿Te atreves con más ejercicios? Visita nuestra{" "}
                  <Link to="/Video-library" className="color-link">
                    Biblioteca
                  </Link>
                </h2>
                <span
                  className="carousel-control-next-icon "
                  aria-hidden="true"
                ></span>
              </div>
              <div className="ratio ratio-4x3 home-user-video-container">
                <iframe
                  className="p-5"
                  src="https://www.youtube.com/embed/1ZXobu7JvvE"
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          {/* CARROUSEL ITEM */}
          <div className="carousel-item active">
            <div className="card align-items-center justify-content-md-center text-center home-user-card">
              <div className="container-fluid align-items-center d-flex justify-content-between p-2">
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <h2 className="mt-3">
                  Echa un vistazo a las{" "}
                  <Link to="/competitions" className="color-link">
                    competiciones
                  </Link>
                </h2>
                <span
                  className="carousel-control-next-icon "
                  aria-hidden="true"
                ></span>
              </div>
              <div className="mx-5">
                <AllCompetition />
              </div>
            </div>
          </div>
          {store.userRol != "Rol.administration" && (
            <>
              {/* CARROUSEL ITEM */}
              <div className="carousel-item">
                <div className="card align-items-center justify-content-md-center text-center home-user-card">
                  <div className="container-fluid align-items-center d-flex justify-content-between p-2">
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <h2 className="mt-3">MIS COMPETICIONES</h2>
                    <span
                      className="carousel-control-next-icon "
                      aria-hidden="true"
                    ></span>
                  </div>
                  <MyAllCompetitions />
                </div>
              </div>
              {/* CARROUSEL ITEM */}
              <div className="carousel-item">
                <div className="card align-items-center justify-content-md-center text-center home-user-card">
                  <div className="container-fluid align-items-center d-flex justify-content-between">
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <h2 className="mt-3">
                      Descubre tu próximo reto... ¡APÚNTATE!
                    </h2>
                    <span
                      className="carousel-control-next-icon "
                      aria-hidden="true"
                    ></span>
                  </div>
                  <div className="align-items-center justify-content-md-center text-center mb-5">
                    <Card />
                  </div>
                </div>
              </div>
              {/* CARROUSEL END*/}
            </>
          )}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon visually-hidden"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon visually-hidden"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default HomeUser;
