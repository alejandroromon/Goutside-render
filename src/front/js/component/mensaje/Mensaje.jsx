import React from "react";
import "./mensaje.css";

const Mensaje = ({ children, tipo }) => {
  return (
    <div className={`mb-2 p-1 text-center text-uppercase ${tipo}`}>
      {children}
    </div>
  );
};

export default Mensaje;
