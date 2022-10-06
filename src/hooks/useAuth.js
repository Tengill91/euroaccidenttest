import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// hook for handling data to and from global context
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
