import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import "./InputSearch.css";

const InputSearch = () => {
  const { store, actions } = useContext(Context);
  const [nameInput, setNameInput] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const navigate = useNavigate();

  const searchUser = (name) => {
    setNameInput(name.toLowerCase());
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + actions.getTokenLS(),
      },
    };
    try {
      const resp = await fetch(
        process.env.BACKEND_URL + `/api/user/${nameInput}`
      );
      const data = await resp.json();
      if (data.number > 0) {
        actions.addTemporalUserSearch(data);
        navigate(`user/${nameInput}`);
        setNameInput("");
      } else {
        setMensaje("No existen usuarios con ese nombre");
        setTipoMensaje("mensaje-error");
        setTimeout(() => {
          setMensaje("");
          setTipoMensaje("");
        }, 2500);
      }
    } catch (error) {
      console.log("Error loading message from backend", error);
    }
  };

  return (
    <div className="row align-items-center text-center">
      <form
        className="d-flex inputForm p-0 "
        onSubmit={(e) => handleSearch(e)}
        role="search">
        <input
          id="search"
          type="search"
          className="inputSearch p-2"
          placeholder="Buscar..."
          onChange={(e) => searchUser(e.target.value)}
          value={nameInput}
          autoFocus
          required
        />
        <button
          type="submit"
          className="inputButton"
          onClick={(e) => handleSearch(e)}
        >
          GO!
        </button>
      </form>
      <br />
      <div className="">
        {mensaje && <div className="card msg-card">{mensaje}</div>}
      </div>
    </div>
  );
};

export default InputSearch;
