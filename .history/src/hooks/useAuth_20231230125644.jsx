
  import { useContext } from "react";
  import AuthContext from "../AuthProvider";

  const useAuth = () => {
    const { auth, setAuth } = useContext(AuthContext);
    return { auth, setAuth };
  };

  export default useAuth;