import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

import Unauthorized from "./pages/Unauthorized";
import UserPage from "./pages/UserPage";
import Missing from "./pages/Missing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected with RequireAuth */}
        <Route element={<RequireAuth />}>
          <Route path="userpage" element={<UserPage />} />
        </Route>

        {/* missing path */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
