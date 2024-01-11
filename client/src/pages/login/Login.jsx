import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../authcontext/AuthContext';
import HeaderLogo from '../../components/headerLogo/HeaderLogo';
import { Link } from "react-router-dom";
import "./Login.css"

const Login = () => {
  const {login} = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      await login(formData.email, formData.password);
      console.log('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error en el inicio de sesión', error);
    }
  };

  return (
    <Container className='logInContainer'>
    <HeaderLogo></HeaderLogo>
    <Container className='logInForm'>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group style={{ marginBottom: "2rem"}} controlId="formEmail">
              <Form.Label style={{ color: "white"}}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group style={{ marginBottom: "2rem"}} controlId="formPassword">
              <Form.Label style={{ color: "white"}}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
          <Container className='logInBtns'>
            <Button className="loginBtn" variant="primary" type="submit">
              LOGIN
            </Button>
            <Button className="loginBtn" variant="primary" type="submit">
              <Link to="/register">You don´t have an account?</Link>
            </Button>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
    </Container>
  );
};

export default Login;