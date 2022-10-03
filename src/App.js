import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
