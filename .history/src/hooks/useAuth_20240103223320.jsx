
  import { useContext } from "react";
  import AuthContext from "../pages/AuthProvider";

  const useAuth = () => {
    const { auth, setAuth } = useContext(AuthContext);
    return { auth, setAuth };
  };

  export default useAuth;