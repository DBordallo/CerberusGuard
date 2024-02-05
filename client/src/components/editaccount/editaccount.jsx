
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const EditAccount = () => {
  const { id } = useParams();
  const [accountData, setAccountData] = useState({});
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nuevo nombre"
            name="name"
            value={updatedData.name || accountData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nuevo correo electrónico"
            name="email"
            value={updatedData.email || accountData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Nueva contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nueva contraseña"
            name="password"
            value={updatedData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleUpdate}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
};

export default EditAccount;
