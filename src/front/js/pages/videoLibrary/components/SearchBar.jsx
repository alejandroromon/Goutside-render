import React from "react";

const SearchBar = (props) => {

  const handleChange = (event) => {
    event.persist()
    const term = event.target.value
    props.handleFormSubmit(term);
  };

  return (
      <div className="container-fluid search-bar">
        <div className="field">
          <input
            className="form-control"
            onChange={(event) => handleChange(event)}
            name="video-search"
            type="text"
            placeholder="Busca tu ejercicio aquí"
          />
        </div>
      </div>
  );
};

export default SearchBar;
