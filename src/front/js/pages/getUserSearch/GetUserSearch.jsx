import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import logo from "../../../img/logo-GOutside.png";

const GetUserSearch = () => {
  const { store, actions } = useContext(Context);
  return store.temporalUserSearch.map((user) => {
    return (
      <div key={user.id}>
        <div className="container-fluid mb-3 rounded infocompetition-card-size">
          <div className="row">
            <div className="col-md-3 m-2 d-flex justify-content-center align-items-center">
              <img
                src={!user.profile_image ? logo : user.profile_image}
                className="rounded infocompetition-img-card"
                alt="cartel competicion"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body col-12">
                <div className="d-flex">
                  <div className="col-8">
                    <h5 className="card-title fw-bold text-capitalize">
                      {user.name || "n/a"}
                    </h5>
                    <div className="d-flex gap-3">
                      <p className="text-black">Apellidos</p>
                      <p className="infocompetition-text-p text-capitalize">
                        {user.last_name || "n/a"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default GetUserSearch;
