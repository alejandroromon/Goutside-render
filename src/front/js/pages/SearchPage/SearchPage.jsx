import React from "react";
import InputSearch from "../../component/inputSearch/InputSearch.jsx";

const SearchPage = () => {
  return (
    <div className="card align-items-center justify-content-md-center text-center home-user-card">
        <div className="align-items-center text-center">
            <h2 className="m-3">¡Busca a tus oponentes!</h2>
        </div>
        <div className="align-items-center justify-content-center text-center m-5">
            <InputSearch />
        </div>
    </div>
  );
};

export default SearchPage;
