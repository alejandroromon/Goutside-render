import React, { useState } from "react";
import Select from "react-select";

const genders = [
  { label: "Femenino", value: "femenino" },
  { label: "Masculino", value: "masculino" },
];

function CompetitorRegistrationForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [adress, setAdress] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const create_competitor = () => {
    const url = process.env.BACKEND_URL + "/api/create-competitor/id";
    const body = {
      name: name,
      last_name: surname,
      adress: adress,
      gender: gender,
      phone: phone,
    };
    const options = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(body),
    };
    fetch(url, options);
  };

  return (
    <div className="container text-center align-items-center justify-content-center">
      <h1 className="text-center">Registrate</h1>
      <div className="card p-5">
        <div className="row justify-content-center mt-5 mb-5">
          <div className="col-4 align-items-center justify-content-center">
            <input
              placeholder="Nombre"
              className="form-control"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="col-4 align-items-center justify-content-center">
            <input
              placeholder="Apellido"
              className="form-control"
              type="text"
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />
          </div>

          <div className="col-4 align-items-center justify-content-center">
            <input
              placeholder="Telefono"
              className="form-control"
              type="number"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-4 align-items-center justify-content-center ">
            <input
              placeholder="Dirección"
              className="form-control"
              type="text"
              onChange={(e) => {
                setAdress(e.target.value);
              }}
            />
          </div>

          <div className="col-4 align-items-center justify-content-center mb-5 ">
            <div className="Genero">
              <Select
                isMulti
                name="Genero"
                placeholder="Genero"
                options={genders}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) => {
                  setGender(e.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="position-absolute bottom-0 end-0 d-flex mb-3 me-5 create-button">
          <button
            className="btn btn-success"
            onClick={() => create_competitor()}
          >
            Guardar información
          </button>
          <br />
          <button className="btn btn-danger">Borrar</button>
        </div>
      </div>
    </div>
  );
}

export default CompetitorRegistrationForm;
