import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../authcontext/AuthContext";
import HeaderLogo from "../../components/headerLogo/HeaderLogo";
import { useNavigate, Link } from "react-router-dom";
import isUserAdmin from "../../authcontext/UserAdmin";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });

 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login(formData.user_email, formData.user_password);
      console.log("Received userData:", userData);

      // Verificar el rol de administrador
      const userIsAdmin = await isUserAdmin(document.cookie);
      console.log(userIsAdmin.id)
      if (userIsAdmin.roles === "admin") {
        navigate("/guard");
      } else {
        // Utilizar userId directamente si es necesario
        navigate(`/home/${userIsAdmin.id}`);
      }
    } catch (error) {
      console.error("Error en el inicio de sesión", error);
    }
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
                <Button className="loginBtn" variant="primary" type="button">
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
