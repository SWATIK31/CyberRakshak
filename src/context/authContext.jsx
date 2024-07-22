import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    setUserLoggedIn(true);
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      setUserLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};