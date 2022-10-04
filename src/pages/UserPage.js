import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const UserPage = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  //removes authenticated user from global context and navigates user back to login page
  const logout = async () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <div>
      <h1>UserPage!</h1>
      <div className="flex flex-col p-4 mt-4 bg-slate-500 rounded-md ">
        <button onClick={logout}>Sign Out</button>
      </div>
    </div>
  );
};

export default UserPage;
