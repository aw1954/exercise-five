import React, { useEffect, useState } from "react";
import { Navigate, BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './App.css';
//Page imports
import CreateUser from './pages/CreateUser';
import Header from './components/Header';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import FirebaseConfig from "./components/FirebaseConfig";


function App() {
  // Track if user is logged in
  const [loggedIn, setLoggedIn] = useState(false);
  // Check to see if there is any loading...
   const [loading, setLoading] = useState(true);
  // Store user information in state
  const [userInformation, setUserInformation] = useState({});
  const [appInitialized, setAppInitialized] = useState(false);
  // Error
  const [errors, setErrors] = useState();
 
  // Ensure app is initialized when it is ready to be
  useEffect(() => {
    // Initialize Firebase
    initializeApp(FirebaseConfig);
    setAppInitialized(true);
  }, []);

  // Check to see if User is logged in
  // User loads page, check their status
  // Set state accordingly
  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setUserInformation(user);
          setLoggedIn(false);
        } else {
          // User is signed out
          setUserInformation({});
          setLoggedIn(false);
        }
        // Whenever state changes setLoading to false
        setLoading(false);
      });
    }
  }, [appInitialized]);

  function logout() {
    const auth = getAuth();
    logout(auth)
      .then(() => {
        setUserInformation({});
        setLoggedIn(false);
        setErrors();
      })
      .catch((error) => {
        console.warn(error);
        setErrors(error);
      });
  }
  
  if (loading || !appInitialized) return null;

  return (
    <>
      <Header logout={logout} loggedIn={loggedIn} />
      {errors && <p className="Error PageWrapper">{errors} </p>}
      <Router>
        <Routes>
          <Route 
            path="/user/:id" 
            element={
              loggedIn ? (
                <UserProfile userInformation={userInformation} /> 
              ) : (
                <Navigate to="/" />
                )
              }
          />
          <Route 
            path="/create" 
            element={
              !loggedIn ? (
              <CreateUser 
                setLoggedIn={setLoggedIn}
                setUserInformation={setUserInformation}
                setErrors={setErrors}
              />
              ) : (
                <Navigate to={`/user/${userInformation.uid}`} />
              )
            }
          />
          <Route 
            path="/" 
            element={
              !loggedIn ? (
              <Login
                setLoggedIn={setLoggedIn}
                setUserInformation={setUserInformation}
              />
              ) : (
                <Navigate to={`/user/${userInformation.uid}`} />
              )
            }
            />
        </Routes>
      </Router>
    </>
  );
}

export default App;
