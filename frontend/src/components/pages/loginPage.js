import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import getUserInfo from "../../utilities/decodeJwt";

const PRIMARY_COLOR = "#003DA5";
const SECONDARY_COLOR = "#FFFFFF";
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/login`;

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [light, setLight] = useState(true);
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
  const [bgText, setBgText] = useState("Dark Mode");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const userInfo = getUserInfo(accessToken);
      if (userInfo) {
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    setBgColor(light ? SECONDARY_COLOR : PRIMARY_COLOR);
    setBgText(light ? "Dark Mode" : "Light Mode");
  }, [light]);

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("accessToken", res.accessToken);
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "An error occurred";
      setError(message);
    }
  };

  let labelStyling = { color: PRIMARY_COLOR, fontWeight: "bold" };
  let backgroundStyling = {
    backgroundColor: bgColor,
    color: light ? "black" : "white",
  };
  let buttonStyling = {
    backgroundColor: PRIMARY_COLOR,
    border: "none",
    color: "white",
  };

  return (
    <section className="vh-100" style={backgroundStyling}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label style={labelStyling}>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label style={labelStyling}>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Text className="text-muted">
                  Don't have an account?
                  <Link to="/signup" style={labelStyling}>
                    {" "}
                    Sign up
                  </Link>
                </Form.Text>
              </Form.Group>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  onChange={() => setLight(!light)}
                />
                <label
                  className="form-check-label text-muted"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {bgText}
                </label>
              </div>
              {error && (
                <div
                  style={{ ...labelStyling, backgroundColor: "none" }}
                  className="pt-3"
                >
                  {error}
                </div>
              )}
              <Button
                variant="primary"
                type="submit"
                style={buttonStyling}
                className="mt-2"
              >
                Log In
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
