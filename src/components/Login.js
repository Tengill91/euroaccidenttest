import React, { useRef, useState, useEffect } from "react";

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  // sets fokus on the user input
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // resets error message when user adjust the input
  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, password);
    setUser("");
    setPassword("");
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <div>
          <h1>You logged n successfully! </h1>
        </div>
      ) : (
        <div className=" flex flex-col w-full max-w-md max-h-sm justify-start p-4 rounded-lg bg-white ">
          <p
            ref={errorRef}
            className={errorMessage ? "errorMessage" : "offscreen"}
            aria-live="assertive"
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

            <label className="flex justify-start" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="text-sm p-1 rounded-lg border-2 border-rose-500"
            ></input>
            <button className="mt-4 p-1 rounded-lg bg-pink-600">Sign in</button>
          </form>
          <p>
            Need an account?
            <br />
            <div className="line">Add link to signup here</div>
          </p>
        </div>
      )}
    </>
  );
};

export default Login;
