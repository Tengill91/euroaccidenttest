import React, { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();
  const [data, setData] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  //const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // sets fokus on the user input
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // resets error message when user adjust the input
  useEffect(() => {
    setErrorMessage("");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      fetch(
        `https://my-json-server.typicode.com/proactivehealth/work-test-sample/users`
      )
        .then((response) => response.json())
        .then((fetchedData) => setData(fetchedData));
      // Maps thru user data from api and checks for a match
      // if a match is found user gets added to global context and navigated to the userpage
      data?.map((userDetails) =>
        userDetails.login === user
          ? (setAuth({ user }),
            navigate("/userpage"),
            console.log("it works! " + user))
          : ""
      );
      setUser("");
      // error handling
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("No server response...");
      } else if (error.response?.status === 400) {
        setErrorMessage("No username or password detekted");
      } else if (error.response?.status === 401) {
        setErrorMessage("Unathorized");
      } else {
        setErrorMessage("Login failed");
      }
      errorRef.current.focus();
    }
  };

  return (
    <div className=" flex flex-col w-full max-w-md max-h-sm justify-start p-4 rounded-lg bg-white ">
      <p
        ref={errorRef}
        className={
          errorMessage ? "bg-red-400 font-bold p-3 mb-4 text-red-800" : "hidden"
        }
      >
        {errorMessage}
      </p>
      <h1>Sign in</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-evenly flex-grow-1 pb-4"
      >
        <label className="flex justify-start" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          className=" text-sm p-1 rounded-lg border-2 border-rose-500"
        ></input>

        <button className="mt-4 p-1 rounded-lg bg-pink-600">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
