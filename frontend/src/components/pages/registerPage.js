import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PRIMARY_COLOR = "#003DA5"; // MBTA Blue for background
const SECONDARY_COLOR = "#FFFFFF"; // White for text

const url = "http://localhost:8081/user/signup";

const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url, data);
      navigate("/login"); // Redirect to login page on successful registration
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <section
      className="vh-100 d-flex align-items-center"
      style={{ backgroundColor: PRIMARY_COLOR, color: SECONDARY_COLOR }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <Form onSubmit={handleSubmit} className="bg-white p-4 rounded-3">
              <h2 className="mb-4 text-center" style={{ color: PRIMARY_COLOR }}>
                Register
              </h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <Form.Group className="mb-3">
                <Form.Label style={{ color: PRIMARY_COLOR }}>
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: PRIMARY_COLOR }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: PRIMARY_COLOR }}>
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                Register
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <style>{`
        #label_input::placeholder {
          font-size: 16px;
          font-family: Asap;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .sidebar {
          display: none; /* Hide the sidebar */
        }
      `}</style>
    </section>
  );
};

export default Register;
