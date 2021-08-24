import { useState, useEffect, createContext, useContext } from "react";

export const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);
