import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
  //React router hook for navigating to other pages...
  const navigate = useNavigate;
  // Track if user is logged in
  const [loggedIn, setLoggedIn] = useState(false);
  // Check to see if there is any loading...
   const [loading, setLoading] = useState(true);
  // Store user information in state
  const [userInformation, setUserInformation] = useState({});
  const [appInitialized, setAppInitialized] = useState(false);
 
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
      const auth = getAuth();
      if (appInitialized) {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in
            setUserInformation(user);
            setLoggedIn(false);
          }
        });
        setLoading(false);
      }
    }, [appInitialized]);

    function logout() {
      const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserInformation({});
        setLoggedIn(false);
      })
      .catch((error) => {
        console.warn(error);
      });
    }
    
    if (loading) return null;

  return (
    <>
      <Header logout = {logout} loggedIn={loggedIn} />
      <Router>
        <Routes>
          <Route 
            path="/user/:id" 
            element={loggedIn ? <UserProfile /> : <>No</>} 
          />
          <Route 
            path="/create" 
            element={
              loggedIn ? (
              <CreateUser 
                setLoggedIn={setLoggedIn}
                setUserInformation={setUserInformation}
              />
              ) : (
                <></>
              )
            }
          />
          <Route 
            path="/" 
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setUserInformation={setUserInformation}
              />
            }
            />
        </Routes>
      </Router>
    </>
  );
}

export default App;
