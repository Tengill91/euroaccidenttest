import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";

const UserPage = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [insurances, setInsurances] = useState();
  const [userInsurancesBridge, setUserInsurancesBridge] = useState([]);
  const [userInsurancesComplete, setUserInsurancesComplete] = useState([]);
  const [error, setError] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    fetch(
      `https://my-json-server.typicode.com/proactivehealth/work-test-sample/insurances`
    )
      .then((response) => response.json())
      .then((fetchedData) => setInsurances(fetchedData))
      .catch(setError);
  }, []);

  useEffect(() => {
    fetch(
      `https://my-json-server.typicode.com/proactivehealth/work-test-sample/user_insurances`
    )
      .then((response) => response.json())
      .then((fetchedData) => setUserInsurancesBridge(fetchedData))
      .catch(setError);
  }, []);

  // sorting fetched data to get individual information about insurances
  // sorting should be put in a function 
  useEffect(() => {
    setLoading(true);
    try {
      let userInsurancesArray = [];
      let found;
      const userInsurancesBridgeSorted = [...userInsurancesBridge[auth.id]];
      console.log(userInsurancesBridgeSorted);

      userInsurancesBridgeSorted?.map(
        (id) => (
          (found = insurances.find((insurance) => insurance.id === id)),
          console.log(found),
          userInsurancesArray.push(found)
        )
      );
      setUserInsurancesComplete(userInsurancesArray);
      setLoading(false);
      console.log(userInsurancesComplete);
    } catch (error) {
      setError(error);
    }
  }, [userInsurancesBridge, insurances]);

  //removing user from global context
  const logout = async () => {
    setAuth({});
    navigate("/login");
  };

  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="flex flex-col w-full h-fit max-h-screen  max-w-md p-5 rounded-lg bg-white ">
      <div className="flex w-full mb-6 items-baseline justify-between flex-row px-2 my-1 ">
        <p className=" text-three font-semibold ">{auth.fullName}</p>
        <button
          className="  py-1.5 px-3 font-mono text-three text-slate-200  w-fit rounded-full bg-pink-600"
          onClick={logout}
        >
          Logga ut
        </button>
      </div>

      <div className="flex flex-col w-full h-fit max-w-md max-h-sm  space-y-1 rounded-lg bg-white max-h-full overflow-auto">
        {console.log(userInsurancesComplete)}
        {userInsurancesComplete?.map((insurance) => (
          <div className="flex flex-col bg-slate-100 space-y-1 h-fit w-full rounded-md p-4 ">
            <p className="text-left text-md font-extrabold" key={insurance.id}>
              {insurance.title}
            </p>
            <p className="text-left text-five font-semibold" key={insurance.id}>
              {insurance.preamble}
            </p>
            <p className="text-left text-three" key={insurance.id}>
              {insurance.body}
            </p>
            <div className="flex">
              <a
                key={insurance.id}
                className=" py-1.5 px-3 align-left text-three text-pink-400  w-fit rounded-full bg-white font-bold"
                href={insurance.url}
              >
                {" "}
                Läs mer
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
