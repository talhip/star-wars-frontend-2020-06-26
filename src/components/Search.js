import React from "react";

const Search = ({ search, setSearch, handleSubmit }) => {
  return (
    <div>
      <input
        placeholder="Quel personnage recherchez-vous ?"
        type="text"
        name="search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          handleSubmit();
        }}
      />
    </div>
  );
};

export default Search;
