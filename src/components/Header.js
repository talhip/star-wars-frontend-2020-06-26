import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Header = ({ refresh, setRefresh, setSearch, setPage }) => {
  const history = useHistory();
  return (
    <div>
      <img
        alt="logo"
        src={logo}
        onClick={() => {
          setPage(1);
          setSearch("");
          setRefresh(!refresh);
          history.push("/");
        }}
      />
    </div>
  );
};

export default Header;
