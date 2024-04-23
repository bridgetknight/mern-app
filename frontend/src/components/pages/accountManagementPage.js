import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";

const AccountManagement = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    // This effect will run once, after the initial render
    const fetchData = async () => {
      try {
        // Decode the JWT to get the user's information
        const userData = getUserInfo(localStorage.getItem("accessToken"));
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/${userData.id}`
        );
        // Assuming the response will have the user information in the body
        setUserInfo({
          userId: userData.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          username: response.data.username,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  // Render a read-only field
  const renderReadOnlyField = (label, value) => {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input type="text" className="form-control" value={value} readOnly />
      </div>
    );
  };

  return (
    <div
      className="account-management"
      style={{ padding: "20px", backgroundColor: "#ADD8E6" }}
    >
      <div className="user-info">
        {renderReadOnlyField("First Name", userInfo.firstName)}
        {renderReadOnlyField("Last Name", userInfo.lastName)}
        {renderReadOnlyField("Email", userInfo.email)}
        {renderReadOnlyField("Username", userInfo.username)}
      </div>
    </div>
  );
};

export default AccountManagement;
