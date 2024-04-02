import React, { useState, useEffect } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt"; // Ensure you have this utility function implemented

const AccountManagementPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");

  useEffect(() => {
    // Here we would fetch the user info from the API or decode the JWT
    if (token) {
      const decodedUserInfo = getUserInfo(token);
      setUserInfo(decodedUserInfo);
    }
  }, [token]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserInfo({ ...userInfo, [id]: value });
  };

  const handleSubmitChanges = async (event) => {
    event.preventDefault();
    // Here you would handle the API call to submit the user info changes
    try {
      const response = await axios.put("/api/user/update", userInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Account information updated.");
    } catch (error) {
      console.error("Failed to update account information", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setToken("");
    navigate("/login");
  };

  // Styles for MBTA blue color
  const mbtaBlue = "#003DA5";
  const styles = {
    cardHeader: {
      backgroundColor: mbtaBlue,
      color: "white",
    },
    buttonPrimary: {
      backgroundColor: mbtaBlue,
      borderColor: mbtaBlue,
    },
    buttonSecondary: {
      marginTop: "10px",
      backgroundColor: "gray",
      borderColor: "gray",
    },
  };

  return (
    <Container className="my-3">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header style={styles.cardHeader}>
              Account Management
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmitChanges}>
                {/* Input fields for user info here */}
                <Button style={styles.buttonPrimary} type="submit">
                  Save Changes
                </Button>
                <Button style={styles.buttonSecondary} onClick={handleLogout}>
                  Logout
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountManagementPage;
