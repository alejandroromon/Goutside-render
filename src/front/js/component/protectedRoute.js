import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Navbar } from "./navbar/navbar.jsx";
import Sidebar from "./sidebar/Sidebar.jsx";
import GetUserSearch from "../pages/getUserSearch/GetUserSearch.jsx";

const ProtectedRoute = () => {
  const { store, actions } = useContext(Context);
  const token = actions.getTokenLS();

  if (token === null) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <Navbar />
      <div className="d-flex flex-nowrap row">
        <Sidebar />
        <main className="container-fluid col-8 col-md-8">
          <div className="row mt-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoute;
