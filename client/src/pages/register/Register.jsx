import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../authcontext/AuthContext';
import HeaderLogo from '../../components/headerLogo/HeaderLogo';
import "./Register.css"

const Register = () => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    profileImage: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(formData.email, formData.password);
      console.log('Registro exitoso');
    } catch (error) {
      console.error('Error en el registro', error);
    }
  };

  return (
    <Container style={{ margin: "0", padding: "0" }}>
     <HeaderLogo>  
     </HeaderLogo>
     <h1 style={{ color: "#162333" }}>Register</h1>
    <Container className='registerForm'>
   
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProfileImage">
              <Form.Label>Profile image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Select file"
                name="profileImage"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formFullName">
              <Form.Label>Name and Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Complete name"
                name="fullName"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Your telephone number"
                name="phone"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={handleChange}
              />
            </Form.Group>

            <Button style={{ color: "white", backgroundColor: "#162333", border: "none", margin: "1rem" }} className='registerBtn' type="submit">
              Register
            </Button>
            <Button style={{ color: "white", backgroundColor: "#162333", border: "none", margin: "1rem" }} className='signInBtn' variant="primary" type="submit">
              Have an account? Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </Container>
  );
};

export default Register;
