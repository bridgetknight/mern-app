import React, { useState, useEffect, createContext } from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import getUserInfo from "./utilities/decodeJwt";
import AccountManagementPage from "./components/pages/accountManagementPage";
import SavedLocations from "./components/pages/userLocationsPage";
import LocationDetails from "./components/pages/locationDetailsPage";


export const UserContext = createContext();

//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route path="/userInfo" element={<HomePage />} />
          <Route exact path="/accountManagementPage" element={<AccountManagementPage />} />
          <Route exact path="/userLocationsPage" element={<SavedLocations />} />
          <Route path="/locationDetailsPage/:locationId" element={<LocationDetails />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
