import React, { useState } from "react";

const AccountManagement = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "Sandy",
    lastName: "Saint Fort",
    email: "sandysaintfort@gmail.com",
    username: "Ssaintfort",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Insert submit logic here
    console.log(userInfo);
  };

  return (
    <>
      <style>
        {`
          .account-management {
            display: flex;
            background-color: #f2f2f2;
            font-family: Arial, sans-serif;
            height: 100vh;
          }
          
          .sidebar {
            background-color: #003DA5;
            color: white;
            padding: 20px;
            width: 250px;
          }
          
          .menu-item {
            margin-bottom: 10px;
            cursor: pointer;
            padding: 10px;
          }
          
          .menu-item.active {
            font-weight: bold;
            color: #FFC72C;
          }
          
          .content {
            flex-grow: 1;
            padding: 20px;
            overflow-y: auto;
          }
          
          .user-info {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            margin: auto;
          }
          
          .form-group {
            margin-bottom: 15px;
          }
          
          .form-group label {
            display: block;
            color: #333;
            margin-bottom: 5px;
          }
          
          .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          
          .save-changes {
            background-color: #003DA5;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            display: block;
            width: 100%;
            margin-top: 15px;
          }
        `}
      </style>
      <div className="account-management">
        <div className="sidebar">
          <div className="menu-item">Route History</div>
          <div className="menu-item active">Account Settings</div>
          <div className="menu-item">Help</div>
        </div>
        <div className="content">
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
            <button type="submit" className="save-changes">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountManagement;
