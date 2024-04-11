import React, { useState } from "react";
import axios from "axios";

const AccountManagement = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "YOUR_USER_ID",
    firstName: " ",
    lastName: " ",
    email: " ",
    username: " ",
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/editUser",
        userInfo
      );
      console.log(response.data);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderInputField = (label, name, type = "text") => {
    return (
      <div className="form-group">
        <label>{label}</label>
        {editMode ? (
          <input
            type={type}
            name={name}
            value={userInfo[name]}
            onChange={handleInputChange}
            className="form-control"
          />
        ) : (
          <p className="form-control-static">{userInfo[name]}</p>
        )}
      </div>
    );
  };

  return (
    <>
      <style>{/* Styles moved inside for brevity */}</style>
      <div className="account-management">
        <div className="content">
          <form className="user-info" onSubmit={handleSubmit}>
            {renderInputField("First Name", "firstName")}
            {renderInputField("Last Name", "lastName")}
            {renderInputField("Email", "email", "email")}
            {renderInputField("Username", "username")}
            {editMode && (
              <>
                <button type="submit" className="save-changes">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-changes"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </>
            )}
            {!editMode && (
              <button
                type="button"
                className="edit-profile"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountManagement;
