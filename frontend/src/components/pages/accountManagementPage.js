import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt"; // Ensure this utility function is correctly implemented

const AccountManagement = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      // Retrieve the user's ID from the JWT stored in localStorage
      const userData = getUserInfo(localStorage.getItem("accessToken"));
      if (userData && userData.id) {
        try {
          // Fetch user's profile data from the backend
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/profile/${userData.id}`
          );
          setUserInfo(response.data); // Update the userInfo state with the fetched data
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = getUserInfo(localStorage.getItem("accessToken"));
    if (userData && userData.id) {
      try {
        // Submit the updated profile data to the backend
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/profile/${userData.id}`,
          userInfo
        );
        console.log("Profile updated successfully", response.data);
        // Handle success (e.g., show a success message)
      } catch (error) {
        console.error("Error updating profile", error);
        // Handle error (e.g., show an error message)
      }
    }
  };

  return (
    <div
      className="account-management"
      style={{ padding: "20px", backgroundColor: "#ADD8E6" }}
    >
      <form className="user-info" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AccountManagement;
