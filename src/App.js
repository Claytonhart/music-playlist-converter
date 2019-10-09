import React from "react";
import { Router } from "react-router-dom";

import Main from "./components/Main";
import Header from "./components/Header";

import "./styles/app.scss";

import history from "./history";

function App() {
  return (
    <div className="app-container">
      <Router history={history}>
        <Header />
        <Main></Main>
      </Router>
    </div>
  );
}

export default App;
