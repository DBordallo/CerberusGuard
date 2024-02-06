import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../authcontext/AuthContext';
import HeaderLogo from '../../components/headerLogo/HeaderLogo';
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Importa confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importa css
import "./Register.css"

const Register = () => {
  const { signup } = useAuth();
  const [imageUrl, setImageUrl] = useState('')
  const [formData, setFormData] = useState({
    profile_img: "",
    user_name:"",
    user_telephone: "",
    user_email: "",
    user_password: ""
  });
  const navigate = useNavigate(); // Obtiene el objeto navigate

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const base64String = event.target.result.split(',')[1];
      setImageUrl(base64String);
  
      const newFormData = { ...formData, profile_img: base64String };
      setFormData(newFormData);
      console.log('Imagen convertida a base64:', base64String); // Agregado para depuración
    };
  
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      console.log('No se seleccionó ningún archivo'); // Agregado para depuración
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(formData.profile_img, formData.user_name, formData.user_telephone, formData.user_email, formData.user_password);
      console.log('You have successfully registered');
      // ALERT
      confirmAlert({
        title: 'You have successfully registered',
        message: 'You are now safer!',
        buttons: [
          {
            label: 'OK',
            onClick: () => {
              console.log('Click OK');
              navigate('/'); 
            }
          }
        ]
      });
    } catch (error) {
      console.error('Error en el registro',  error.response.data)
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
                type="file"
                placeholder="Select file"
                name="profile_img"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Form.Group controlId="formFullName">
              <Form.Label>Name and Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Complete name"
                name="user_name"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="user_email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Your telephone number"
                name="user_telephone"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="user_password"
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

            <Container className='registerBtns'>
            <Button style={{ color: "white", backgroundColor: "#162333", border: "none", margin: "1rem" }} className='registerBtn' type="submit">
              Register
            </Button>
            </Container>
          </Form>
          <Link to="/">
            <Button style={{ color: "white", backgroundColor: "#162333", border: "none", margin: "1rem" }} className='signInBtn' variant="primary">
              Have an account? Sign In
            </Button>
            </Link>
        </Col>
      </Row>
    </Container>
    </Container>
  );
};

export default Register;
