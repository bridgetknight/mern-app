import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";

const PRIMARY_COLOR = "#8ab6d9";
const SECONDARY_COLOR = "#000000";

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle logout button
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) setUser(userInfo); // Set user only if it's not undefined
  }, []);

  // Redirect to this page after successful account update
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("accountUpdated")) {
      handleShow(); // Show modal after redirect
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  if (!user)
    return (
      <div>
        <h4>Log in to view this page.</h4>
      </div>
    );
  return (
    <div className="container" style={{ backgroundColor: PRIMARY_COLOR }}>
      <div className="col-md-12 text-center">
        <h1 style={{ color: SECONDARY_COLOR }}>{user.username}</h1>
        {/* Display additional user details */}
        <p style={{ color: SECONDARY_COLOR }}>Email: {user.email}</p>

        <div className="col-md-12 text-center">
          <>
            <Button className="me-2" variant="secondary" onClick={handleShow}>
              Log Out
            </Button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: SECONDARY_COLOR }}>
                  Log Out
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ color: SECONDARY_COLOR }}>
                Are you sure you want to Log Out?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
};

export default PrivateUserProfile;
