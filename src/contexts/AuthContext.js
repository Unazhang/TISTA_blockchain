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
  const [role, setRole] = useState([]);
  const [name, setName] = useState(null);

  async function signup(email, password, name) {
    // console.log("in signup");

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

    if (user) {
      // console.log(user);
      // enter user data to database
      // console.log(roleSelected);
      try {
        const response = await axios.post("http://localhost:4000/app/signup", {
          displayName: name,
          uid: user.uid,
          email: user.email,
        });
        console.log(response);
        setName(name);
        setRole([]);
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

  async function logout() {
    auth
      .signOut()
      .then(() => {
        setRole(null);
        setName(null);
      })
      .catch((err) => {
        console.log(err);
      });
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

  async function updateUserInfo(user) {
    if (user) {
      try {
        const response = await axios.post(
          "http://localhost:4000/app/userdata",
          {
            uid: user.uid,
          }
        );

        console.log(response);
        console.log(role);

        ["Donor", "Requester", "Vendor"].forEach((match) => {
          console.log(response.data.role[match].validated);
          if (response.data.role[match].validated) {
            setRole((pre) => {
              // console.log(pre);
              return [...(pre || []), match];
            });
          }
        });

        setName(response.data.displayName);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // console.log("state change");
      // console.log(user);
      setCurrentUser(user);
      setLoading(false);
      if (user != null) {
        updateUserInfo(user);
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
    name,
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
