import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Login = () => {
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
      const response = await fetch('URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Inicio de sesión exitoso');
      } else {
        console.error('Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error en la solicitud fetch', error);
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
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
