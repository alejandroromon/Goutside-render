import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import logo from "../../../img/logo-GOutside.png";
import "./posterCompetition.css";

const PosterCompetition = () => {
  const { store, actions } = useContext(Context);
  const [files, setFiles] = useState(null);

  const uploadPosterImage = async (e) => {
    e.preventDefault();

    let body = new FormData();
    body.append("poster_image", files[0]);

    const options = {
      method: "POST",
      body,
      headers: { Authorization: "Bearer " + actions.getTokenLS() },
    };
    try {
      const resp = await fetch(
        process.env.BACKEND_URL + "/api/poster-upload",
        options
      );
      const data = await resp.json();
      actions.setUrlImagen(data.url);
    } catch (error) {
      console.log("Error loading message from backend", error);
    }
  };
  return (
    <div className="col-md-12 d-md-flex">
      <img
        src={store.posterImagenUrl === null ? logo : store.posterImagenUrl}
        className="img-fluid rounded poster-competition-photo"
        alt="poster photo"
      />
      <form
        className="d-flex flex-column align-items-center justify-content-center m-2"
        onSubmit={uploadPosterImage}
      >
        <input
          type="file"
          className="form-control"
          onChange={(e) => setFiles(e.target.files)}
        />
        <button
          className="btn col-12 m-2 btn-validacion"
          onClick={uploadPosterImage}
        >
          Añadir cartel
        </button>
      </form>
    </div>
  );
};

export default PosterCompetition;
