"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    isLoggedIn: false,
  });
  const [loginOpen, setLoginOpen] = useState(true);

  useEffect(() => {
    // Parse cookies
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=").map((c) => c.trim());
      acc[key] = value;
      return acc;
    }, {});

    // Set username and password from cookies
    if (cookies.username) {
      setUser((prev) => ({ ...prev, username: cookies.username }));
    }
    if (cookies.password) {
      setUser((prev) => ({ ...prev, password: cookies.password }));
    }

    // Parse and set isLoggedIn from cookies
    if (cookies.isLoggedIn) {
      const parsedIsLoggedIn = JSON.parse(cookies.isLoggedIn); // Parse from string to boolean
      setUser((prev) => ({ ...prev, isLoggedIn: parsedIsLoggedIn }));
    }
  }, []);

  useEffect(() => {
    // Update cookies when user state changes
    if (user.username) {
      document.cookie = `username=${user.username}; path=/`;
    } else {
      document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    if (user.password) {
      document.cookie = `password=${user.password}; path=/`;
    } else {
      document.cookie = `password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    // Store isLoggedIn as a JSON string in the cookie
    document.cookie = `isLoggedIn=${JSON.stringify(user.isLoggedIn)}; path=/`;
  }, [user]);
  // console.log(loginOpen, "Login OPen");
  // console.log(user, "USER");
  return (
    <GlobalContext.Provider
      value={{
        loginOpen,
        setLoginOpen,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for convenience
export const useGlobal = () => {
  return useContext(GlobalContext);
};
