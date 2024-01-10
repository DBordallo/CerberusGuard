import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../authcontext/AuthContext';

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
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
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

            <Button variant="primary" type="submit">
              LOGIN
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
