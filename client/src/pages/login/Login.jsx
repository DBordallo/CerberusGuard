import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../authcontext/AuthContext";
import HeaderLogo from "../../components/headerLogo/HeaderLogo";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [condicion, setCondicion] = useState();
  const { login, isUserAdmin } = useAuth();
  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await login(formData.user_email, formData.user_password);

      ( token);

      if (token) {
        const result = await isUserAdmin();
        setCondicion(result.user);
  
        // Considera si realmente necesitas setCondicion(result.user);
        // setCondicion(await isUserAdmin());
      }
    } catch (error) {
      console.error("Error en el inicio de sesión", error);
    }
  };

  useEffect(() => {
    ("Condicion:", condicion);
    if (condicion && condicion.roles && condicion.id) {
      if (condicion.roles === "admin") {
        ("Redirecting to /guard");
        navigate("/guard");
      } else if (condicion.roles === "user") {
        ("Redirecting to /home/", condicion.id);
        navigate(`/home/${condicion.id}`);
      }
    }
  }, [condicion, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <Container className="logInContainer">
      <HeaderLogo />
      <Container className="logInForm">
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                style={{ marginBottom: "2rem" }}
                controlId="formEmail"
              >
                <Form.Label style={{ color: "white" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="user_email"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                style={{ marginBottom: "2rem" }}
                controlId="formPassword"
              >
                <Form.Label style={{ color: "white" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="user_password"
                  onChange={handleChange}
                />
              </Form.Group>

              <Container className="logInBtns">
                <Button className="loginBtn" variant="primary" type="submit">
                  LOGIN
                </Button>
                <Link to="/register">
                  <Button className="loginBtn" variant="primary" type="button">
                    You don´t have an account?
                  </Button>
                </Link>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
