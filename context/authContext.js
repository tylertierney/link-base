import { useState, useEffect, createContext, useContext } from "react";
import GoTrue from "gotrue-js";

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
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.currentUser()) {
      setUser(auth.currentUser());
    }
    console.log(auth.currentUser());
  }, []);

  const login = (email, password) => {
    setIsLoading(true);
    console.log("login event");
    auth
      .login(email, password, true)
      .then((response) => {
        console.log("login event detected");
        console.log(response);
        window.location.href = "/";
        setIsLoading(false);
        setUser(response);
      })
      .catch((error) => {
        console.log("login failed");
        console.log(error);
        setError(error);
        // throw error;
      });
  };

  const logout = () => {
    setIsLoading(true);
    auth
      .currentUser()
      .logout()
      .then((response) => {
        console.log("User logged out");
        setIsLoading(false);
        setUser(null);
      })
      .catch((error) => {
        console.log("Failed to logout user: ", error);
        setError(error);
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
        // window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.message);
        console.log(typeof error);

        setError(error);
      });
  };

  const context = { user, login, logout, signup, authReady, error, isLoading };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useUser = () => useContext(AuthContext);
