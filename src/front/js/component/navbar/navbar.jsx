import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import {
  BsHouseFill,
  BsFillCollectionPlayFill,
  BsFillTrophyFill,
} from "react-icons/bs";
import {FaSearch} from "react-icons/fa"
import InputSearch from "../inputSearch/InputSearch.jsx";
import logo from "../../../img/logo-GOutside.png";
import "./navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    actions.deleteTokenLS();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-color ">
      <div className="container-fluid d-flex justify-content-between">
        <Link to="/" className="navbar-brand d-flex justify-content-center">
          <img src={logo} className="navbar-logo-size" alt="GOutside Logo" />
        </Link>

        <div className="col-5 col-md-4 col-lg-6 justify-content-between">
          <div className="d-flex justify-content-between align-items-center text-center">
            <Link to="/search">
              <button className="btn btn-menu me-2">
                <FaSearch className="btn-icon" />
                <span className="btn-text">BUSCAR</span>
              </button>
            </Link>
            <Link to="/home/user">
              <button className="btn btn-menu ms-2 me-2">
                <BsHouseFill className="btn-icon" />
                <span className="btn-text">HOME</span>
              </button>
            </Link>
            <Link to="/video-library">
              <button className="btn btn-menu ms-2 me-2">
                <BsFillCollectionPlayFill className="btn-icon" />

                <span className="btn-text">BIBLIOTECA</span>
              </button>
            </Link>
            <Link to="/competitions">
              <button className="btn btn-menu ms-2 me-2">
                <BsFillTrophyFill className="btn-icon" />

                <span className="btn-text">COMPETICIONES</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="btn-group">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={
                store.userProfileImagen === null
                  ? logo
                  : store.userProfileImagen
              }
              className="navbar-photo-profile"
              alt="profile photo"
            />
          </button>
          <ul className="dropdown-menu dropdown-menu-end navbar-menu-size me-5">
            <li>
              <Link
                to="/edit-profile"
                className="dropdown-item mb-3 text-capitalize navbar-menu-li "
              >
                editar perfil
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="btn dropdown-item text-uppercase border-top border-bottom border-secondary navbar-menu-button"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
