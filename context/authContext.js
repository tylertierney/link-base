import { useState, useEffect, createContext, useContext } from "react";
import GoTrue from "gotrue-js";
import { useRouter } from "next/router";
import axios from "axios";

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

    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const login = (email, password, isGuest) => {
    setIsLoading(true);
    console.log("login event");
    auth
      .login(email, password, true)
      .then((response) => {
        // console.log("login event detected");

        setIsLoading(false);
        if (isGuest) {
          return;
        }
        setUser(response);

        // router.push("/");
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
        setIsLoading(false);
        setUser(null);
        window.localStorage.clear();
        // Storage.clear();
        window.location.href = "/login";
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
    if (username.includes(" ")) {
      setError({ message: "Username must not contain spaces" });
      setIsLoading(false);
      return;
    }
    if (username.length < 6) {
      setError({ message: "Username must be 6 characters minimum." });
      setIsLoading(false);
      return;
    }
    if (username.length > 20) {
      setError({ message: "That username is too long (max 20 characters)" });
      setIsLoading(false);
      return;
    }

    auth
      .signup(email, password, {
        username: username,
      })
      .then((response) => {
        setIsLoading(false);
        addUserToDatabase(response);
        // console.log("auth context line 106: ", response);
        login(email, password, false);

        let user_obj = {
          username: response.user_metadata.username,
          email: response.email,
          prof_pic_url: "",
          cover_pic_url: "",
          followers: [],
          following: [],
          posts: [],
          liked_posts: [],
          id: response.id,
          bio: "",
        };

        // setUser(response);
        setUser(user_obj);

        localStorage.setItem("user", JSON.stringify(user_obj));

        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setError(error);
        return;
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

  // const signInAsGuest = () => {
  //   const guestuser_obj = {
  //     id: 123456,
  //     posts: [],
  //     liked_posts: [],
  //     prof_pic_url: "",
  //     cover_pic_url: "",
  //     followers: [],
  //     following: [],
  //   };
  //   setUser(guestuser_obj);
  // };

  const context = {
    user,
    setUser,
    login,
    logout,
    signup,
    authReady,
    error,
    isLoading,
    setError,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useUser = () => useContext(AuthContext);
