import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Characters from "./containers/Characters";
import Character from "./containers/Character";
import Starship from "./containers/Starship";

function App() {
  const [refresh, setRefresh] = useState(false); // Permet de rafraîchir un composant
  const [search, setSearch] = useState(""); // Input pour l'utilisateur
  const [page, setPage] = useState(1); // Permet de gérer la pagination

  return (
    <Router>
      <Header
        refresh={refresh}
        setRefresh={setRefresh}
        setSearch={setSearch}
        setPage={setPage}
      />
      <Switch>
        <Route path="/starship/:id">
          <Starship />
        </Route>
        <Route path="/character/:id">
          <Character />
        </Route>
        <Route path="/">
          <Characters
            refresh={refresh}
            search={search}
            setSearch={setSearch}
            page={page}
            setPage={setPage}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
