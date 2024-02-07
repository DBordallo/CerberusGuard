import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Nav from "../Nav/Nav";
import "./editaccount.css";
import homeGray from "../../assets/homeGray.png";
import passwordGray from "../../assets/passwordGray.png";
import profileGray from "../../assets/profileGray.png";
import PasswordGenerator from "../passwordGenerator/PasswordGenerator";
import { confirmAlert } from 'react-confirm-alert'; // Importa confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importa css

const EditAccount = () => {
  const { id } = useParams();
  const history = useNavigate(); // Obtiene el objeto history
  const [accountData, setAccountData] = useState({});
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [generatedPassword, setGeneratedPassword] = useState(""); // Nuevo estado para la contraseña generada

  const handleGeneratePassword = (newPassword) => {
    setGeneratedPassword(newPassword);
  };

  const handleSavePassword = async () => {
    try {
      const response = await fetch(`http://localhost:6700/cerberus/accounts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Otros campos que puedas querer actualizar
          password: generatedPassword,
        }),
      });

      if (response.ok) {
        ("Contraseña actualizada con éxito");
        // Puedes manejar el éxito de la actualización aquí
      } else {
        console.error("Error al actualizar la contraseña:", response.statusText);
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
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
        ("Updated data");
        // ALERT
        confirmAlert({
          title: 'Updated data',
          message: 'Data has been updated successfully.',
          buttons: [
            {
              label: 'OK',
              onClick: () => {
                ('Click OK');
                history(`/home/${id}`); 
              }
            }
          ]
        });
      } else {
        confirmAlert({
          title: 'Updated data',
          message: 'Data has been updated successfully.',
          buttons: [
            {
              label: 'OK',
              onClick: () => {
                ('Click OK');
                history(`/home/${id}`); 
              }
            }
          ]
        });
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
      <h2 className="editTitle">Edit Account</h2>
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
          <Form.Label>New Password</Form.Label>
        </Form.Group>
        <PasswordGenerator onGeneratePassword={handleGeneratePassword} />
        <div className="SaveUpdate">

          <Button style={{ marginTop: "1rem" }} variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </Form>
      <Nav home={homeGray} password={passwordGray} profile={profileGray}></Nav>
    </div>
  );
};

export default EditAccount;
