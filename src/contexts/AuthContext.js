import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("vendor");

  async function signup(email, password) {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      // enter user data to database
      try {
        const response = await axios.post("http://localhost:4000/app/signup", {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
        });

        updateRole(response.data.data.role);
      } catch (err) {
        console.log(err);
      }
    }
    return user;
  }

  async function login(email, password) {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      try {
        const response = await axios.post("http://localhost:4000/app/role", {
          uid: user.uid,
        });
        const currentRole = response.data;

        updateRole(currentRole);
      } catch (err) {
        console.log(err);
      }
    }

    return user;
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updateRole(role) {
    setRole(role);
    // console.log(role);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // catch role change for debugging
  // useEffect(() => {
  //   console.log(role);
  // }, [role]);

  const value = {
    currentUser,
    role,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
