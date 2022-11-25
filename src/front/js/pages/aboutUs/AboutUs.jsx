import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../img/logo-GOutside.png";
import Mensaje from "../../component/mensaje/Mensaje.jsx";
import coFundadorRaquel from "../../../img/co_fundador_raquel.jpeg";
import coFundadorNico from "../../../img/cofundador_Nico.jpeg";
import coFundadorAle from "../../../img/cofundador_Ale.jpeg";
import "./AboutUs.css";

function AboutUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactRequest, setContactRequest] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  let navigate = useNavigate();

  const sendContact = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "" || contactRequest === "") {
      setMensaje("Todos los campos son obligatorios");
      setTipoMensaje("mensaje-error");
      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 2500);
    } else {
      setMensaje(
        "Muchas gracias por contactar con el equipo de GOutside. En breve, un agente se pondrá en contacto con usted"
      );
      setTipoMensaje("mensaje-correcto");
      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
        navigate("/home/user");
      }, 5000);
      contactUs();
    }
  };

  const contactUs = () => {
    const url = process.env.BACKEND_URL + "/api/about-us";
    const body = {
      name: name,
      email: email,
      phone: phone,
      contact_request: contactRequest,
    };
    const options = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(body),
    };
    fetch(url, options);
  };

  return (
    <div className="container">
      <h1 className="text-center text-capitalize mt-3 aboutUs-title-color">
        ¿Quiénes somos?
      </h1>
      <div className="d-lg-flex align-items-center justify-content-evenly text-center">
        <Link to="/">
          <img src={logo} className="me-2 aboutUs-logo-size" alt="GOutside" />
        </Link>
        <div className="d-lg-flex-column align-items-center justify-content-evenly ms-auto">
          <p className="text-sm-start lh-lg aboutUs-title-color">
            {" "}
            Hemos venido a revolucionar las competiciones de entrenamiento
            funcional.
          </p>
          <p className="text-sm-start lh-lg aboutUs-title-color">
            {" "}
            Hasta ahora las pruebas deportivas dependían del boca a boca en los
            propios box, desde ahora podrás promocionar tus eventos de nuestra
            mano accediendo de forma inmediata a un mercado de más de 100.000
            usuarios.
          </p>
          <p className="text-sm-start lh-lg aboutUs-title-color">
            {" "}
            Unete a nuestra comunidad, crezcamos juntos.
          </p>
        </div>
      </div>
      <h3 className="fw-bold text-center aboutUs-title-color">Co-Fundadores</h3>
      <div className="d-flex justify-content-around mt-3">
        <div className="text-center">
          <img
            src={coFundadorAle}
            className="shadow text-center cofundador-img"
            alt="Co-fundador foto"
          />
          <p className="mt-1 aboutUs-title-color">Ale Romero</p>
        </div>
        <div className="text-center">
          <img
            src={coFundadorRaquel}
            className="shadow text-center cofundador-img"
            alt="Co-fundador foto"
          />
          <p className="mt-1 aboutUs-title-color">Raquel Martín</p>
        </div>
        <div className="text-center">
          <img
            src={coFundadorNico}
            className="shadow text-center cofundador-img"
            alt="Co-fundador foto"
          />
          <p className="mt-1 aboutUs-title-color">Nico Martín</p>
        </div>
      </div>

      {mensaje && <Mensaje tipo={tipoMensaje}>{mensaje}</Mensaje>}

      <h2 className="text-center text-capitalize aboutUs-title-color">
        Contacta con nosotros
      </h2>
      <form className="d-flex flex-column gap-4">
        <input
          placeholder="Nombre"
          className="form-control"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="form-control"
          placeholder="Correo electrónico"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="Telefono"
          className="form-control"
          type="tel"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <input
          className="form-control"
          aria-label="With textarea"
          placeholder="Queremos escucharte, hablemos y compartamos ideas"
          onChange={(e) => {
            setContactRequest(e.target.value);
          }}
        ></input>
        <div className="d-flex justify-content-md-end justify-content-center gap-2 ">
          <button
            className="btn btn-validacion"
            onClick={(e) => sendContact(e)}
          >
            Quiero más información
          </button>
          <Link to={-1}>
            <button className="btn btn-cancelar">Volver atrás</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AboutUs;
