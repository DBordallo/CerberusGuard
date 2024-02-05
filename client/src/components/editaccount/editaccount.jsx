
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Nav from "../Nav/Nav";
import homeGray from "../../assets/homeGray.png";
import passwordGray from "../../assets/passwordGray.png";
import profileGray from "../../assets/profileGray.png"
import PasswordGenerator from "../passwordGenerator/PasswordGenerator";



const EditAccount = () => {
  const { id } = useParams();
  const [accountData, setAccountData] = useState({});
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleGeneratePassword = (newPassword) => {
    setGeneratedPassword(newPassword);
  };


  const handleSavePassword = async () => {
    try {
      if (!userId || !selectedId) {
        throw new Error('No se pudo obtener el ID del usuario o la aplicación seleccionada');
      }
  
      console.log('userId:', userId);
      console.log('selectedId:', selectedId); 
      console.log(selectedSocialNetwork)
  

      const response = await fetch(`http://localhost:6700/cerberus/accounts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: generatedPassword,
          user_id: userId,
          PreAccounts_id: selectedId,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        setError(`Error al guardar la contraseña y la información del usuario: ${errorText}`);
        console.error('Respuesta del servidor:', errorText);
        return;
      }
  
      const data = await response.json();
      console.log('Contraseña y información del usuario guardadas exitosamente:', data);
    } catch (error) {
      setError(`Error al guardar la contraseña y la información del usuario: ${error.message}`);
      console.error('Error al guardar la contraseña y la información del usuario:', error);
    }
  };

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch(`http://localhost:6700/cerberus/accounts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAccountData(data);
        } else {
          console.error("Error al obtener los datos de la cuenta:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la cuenta:", error);
      }
    };

    fetchAccountData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:6700/cerberus/accounts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log("Cuenta actualizada con éxito");
        // Puedes redirigir al usuario a la página de detalles de la cuenta después de la actualización
      } else {
        console.error("Error al actualizar la cuenta:", response.statusText);
      }
    } catch (error) {
      console.error("Error al actualizar la cuenta:", error);
    }
  };

  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Edit Account</h2>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nuevo nombre"
            name="name"
            value={updatedData.name || accountData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nuevo correo electrónico"
            name="email"
            value={updatedData.email || accountData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>New Password
          </Form.Label>
        </Form.Group>
        <PasswordGenerator/>
        <Button style={{marginTop:"1rem"}} variant="primary" onClick={handleSavePassword}>
              Save
            </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Form>
      <Nav home = {homeGray} password={passwordGray} profile ={profileGray} ></Nav>

    </div>
  );
};

export default EditAccount;
