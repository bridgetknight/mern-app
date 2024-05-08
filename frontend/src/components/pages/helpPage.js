import React, { useState } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HelpPage = () => {
  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    message: "",
    incidentDate: "",
    incidentTime: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    responseNeeded: false,
  });
  // eslint-disable-next-line
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Your feedback has been submitted successfully!");
    // Optionally navigate the user to another page after submission
    // navigate("/thank-you");
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Customer Support</h2>
          <p>
            You can expect a response to most tickets within 5 business days.
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Category*
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Please choose a Category</option>
                  <option value="complaint">Complaint</option>
                  <option value="comment">Comment</option>
                  <option value="question">Question</option>
                  <option value="compliment">Compliment</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Subject*
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Message*
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Incident Date*
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Form.Label column sm={1}>
                Time (Optional)
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="time"
                  name="incidentTime"
                  value={formData.incidentTime}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                First Name*
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Last Name*
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Email*
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Phone
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 9, offset: 3 }}>
                <Form.Check
                  type="checkbox"
                  label="Response Needed"
                  name="responseNeeded"
                  checked={formData.responseNeeded}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 9, offset: 3 }}>
                <Button type="submit">Submit</Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HelpPage;
