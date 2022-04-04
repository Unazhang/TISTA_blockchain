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
  const [role, setRole] = useState("Vendor");

  async function signup(email, password, roleSelected) {
    console.log("in signup");
    let user = null;
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      user = userCredential.user;
    } catch (err) {
      console.log(err);
    }
    console.log("after signup");

    if (user) {
      // enter user data to database
      console.log(roleSelected);
      try {
        const response = await axios.post("http://localhost:4000/app/signup", {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          role: roleSelected,
        });

        setRole(response.data.data.role);
      } catch (err) {
        console.log(err);
      }
    }
    return user;
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error);
    });
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

  async function updateRole(user) {
    // setRole(role);
    if (user) {
      try {
        const response = await axios.post("http://localhost:4000/app/role", {
          uid: user.uid,
        });
        const currentRole = response.data;

        // console.log(currentRole);
        setRole(currentRole);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user != null) {
        updateRole(user);
      }
    });
    return unsubscribe;
  }, []);

  // useEffect(()=> {
  //   if (currentUser) {
  //     updateRole();
  //   }
  // }, [currentUser])
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
