import { useState, useEffect, createContext, useContext } from "react";
import GoTrue from "gotrue-js";
import { useRouter } from "next/router";
import axios from "axios";
// import clientPromise from "../utils/mongodb";

// console.log(clientPromise);

const auth = new GoTrue({
  APIUrl: "https://link-base.netlify.app/.netlify/identity",
  audience: "",
  setCookie: true,
});

const AuthContext = createContext({
  user: null,
  error: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

const AuthContextProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.currentUser()) {
      setUser(auth.currentUser());
    }
    // console.log(auth.currentUser());
  }, []);

  const login = (email, password) => {
    setIsLoading(true);
    console.log("login event");
    auth
      .login(email, password, true)
      .then((response) => {
        console.log("login event detected");
        console.log(response);
        router.push("/");
        setIsLoading(false);
        setUser(response);
      })
      .catch((error) => {
        console.log("login failed");
        console.log(error);
        setError(error);
        setIsLoading(false);
        // throw error;
      });
  };

  const logout = async () => {
    setIsLoading(true);
    await auth
      .currentUser()
      .logout()
      .then((response) => {
        console.log("User logged out");
        setIsLoading(false);
        setUser(null);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("Failed to logout user: ", error);
        setError(error);
        setIsLoading(false);
        throw error;
      });
  };

  const signup = (email, password, username) => {
    setIsLoading(true);
    auth
      .signup(email, password, {
        username: username,
      })
      .then((response) => {
        console.log("Confirmation email sent", response);
        setIsLoading(false);
        setUser(response);
        addUserToDatabase(response);
        router.push(`/${response.id}`);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setError(error);
      });
  };

  const addUserToDatabase = (user) => {
    axios
      .post("/api/newuser", user)
      .then((response) => {
        console.log("addusertodb request received", response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const context = {
    user,
    setUser,
    login,
    logout,
    signup,
    authReady,
    error,
    isLoading,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useUser = () => useContext(AuthContext);
