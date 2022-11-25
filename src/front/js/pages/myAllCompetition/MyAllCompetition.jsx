import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import logo from "../../../img/logo-GOutside.png";
import "./MyAllCompetition.css";

const MyAllCompetitions = () => {
  const [myCompetitions, setMyCompetitions] = useState([]);
  const { store, actions } = useContext(Context);

  useEffect(() => {
    getMyCompetitions();
  }, []);

  const getMyCompetitions = async () => {
    const url = process.env.BACKEND_URL + "/api/my-competitions";
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + actions.getTokenLS(),
      },
      method: "GET",
    };
    const resp = await fetch(url, options);
    const data = await resp.json();
    resp.status === 200 && setMyCompetitions(data);
  };

  return (
    <>
      <div className="row">
        {myCompetitions.length === 0 ? (
          <div className="d-flex justify-content-center mt-5">
            <h1 className="col-12 text-center">
              Todavía no tienes ninguna competición
            </h1>
          </div>
        ) : (
          myCompetitions.map((myCompetition) => {
            return (
              <div
                key={myCompetition.id}
                className="card m-2 myCompetition-card-size"
              >
                <img
                  src={
                    !myCompetition.poster_image_url
                      ? logo
                      : myCompetition.poster_image_url
                  }
                  className="mt-2 rounded myCompetition-img-card"
                  alt="cartel competicion"
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold card-title">
                    {myCompetition.competition_name}
                  </h5>
                  <p className="m-0 myCompetition-text-p">
                    {myCompetition.qualifier_date}
                  </p>
                  <p className="m-0 myCompetition-text-p">
                    {myCompetition.location}
                  </p>
                  <p className="myCompetition-text-p">
                    {myCompetition.stage?.toString()?.replace("_", " ")}
                  </p>
                  <div className="d-flex justify-content-center gap-3 mb-3 position-absolute bottom-0 start-50 translate-middle-x">
                    <Link to={`/competition/${myCompetition.id}`}>
                      <button className="btn shadow btn-sucessfull">
                        +INFO
                      </button>
                    </Link>

                    {myCompetition.adminid === store.userId && (
                      <Link to={`/edit-competition/${myCompetition.id}`}>
                        <button className="btn shadow btn-validacion">
                          Editar
                        </button>
                      </Link>
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

export default MyAllCompetitions;
