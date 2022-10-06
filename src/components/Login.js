import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();
  const [data, setData] = useState(false);
  const navigate = useNavigate();
  //const location = useLocation();
  //const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  //const [id, setId] = useState("");
  //const [fullName, setFullName] = useState("");
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
    let id;
    let fullName;

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
          ? ((id = userDetails.id),
            (fullName = userDetails.name),
            setAuth({ user, id, fullName }),
            navigate("/userpage"),
            console.log("it works! " +" "+ user +" "+ id +" "+ fullName))
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
    <div className=" flex flex-col w-full max-w-md max-h-sm justify-start p-5 rounded-xl drop-shadow-2xl bg-white ">
      <p
        ref={errorRef}
        className={
          errorMessage ? "bg-red-400 font-bold  p-3 mb-4 text-red-800" : "hidden"
        }
      >
        {errorMessage}
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-evenly flex-grow-1 pb-4"
      >
        <label className="flex mb-2 justify-start" htmlFor="username">
          <h1 className=" font-semibold  text-slate-600 ">Logga in med ditt användarnamn</h1>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          className=" text-sm font-semibold font-mono p-0.5 rounded-md  border-4  border-pink-300  focus:border-pink-400 "
        ></input>

        <button className="mt-2 py-1.5 px-3 font-mono text-xs text-slate-200  w-fit rounded-full bg-pink-600">Logga in</button>
      </form>
    </div>
  );
};

export default Login;
