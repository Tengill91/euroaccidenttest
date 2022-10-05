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

  const logout = async () => {
    setAuth({});
    navigate("/login");
  };

  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="flex flex-col w-full max-w-md max-h-sm justify-start p-4 rounded-lg bg-white">
      <h1>UserPage!</h1>
      <div className="flex flex-col w-full h-40 max-w-md max-h-sm justify-start p-4 rounded-lg bg-gray-300">
        {console.log(userInsurancesComplete)}
        {userInsurancesComplete?.map((insurance) => (
          <h1 key={insurance.id}>{insurance.title}</h1>
        ))}
      </div>
      <div className="flex flex-col p-4 mt-4 bg-slate-500 rounded-md ">
        <button onClick={logout}>Sign Out</button>
      </div>
    </div>
  );
};

export default UserPage;
