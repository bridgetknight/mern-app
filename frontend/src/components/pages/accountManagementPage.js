import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col, Modal } from "react-bootstrap";
import EditUserPage from "./editUserPage";
import getUserInfo from "../../utilities/decodeJwt";
import { useNavigate } from "react-router-dom";

const PRIMARY_COLOR = "#8ab6d9";
const SECONDARY_COLOR = "#FFFFFF";

const AccountManagementPage = () => {
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserInfo();
    setUserData(user);
  }, []);

  const goToPrivateUserProfile = () => {
    navigate("/privateUserProfile");
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    console.log("Logging out");
    localStorage.clear();
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card
            body
            outline
            color="success"
            className="mx-1 my-2"
            style={{
              width: "30rem",
              backgroundColor: PRIMARY_COLOR,
              color: SECONDARY_COLOR,
            }}
          >
            <Card.Title>Edit User Information</Card.Title>
            <Card.Body>
              <EditUserPage userData={userData} setUserData={setUserData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Button to navigate to private user profile */}
          <Button onClick={goToPrivateUserProfile} className="mt-3">
            Account Details
          </Button>
          {/* Button to handle logout */}
          <Button onClick={handleLogout} className="mt-3">
            Logout
          </Button>
        </Col>
      </Row>
      {/* Logout Modal */}
      <Modal show={showModal} onHide={handleCancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelLogout}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AccountManagementPage;
