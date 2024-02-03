import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import PasswordGenerator from '../../components/passwordGenerator/PasswordGenerator';
import HeaderLogoText from '../../components/headerLogo+text/HeaderLogoText';
import { useAuth } from '../../authcontext/AuthContext';
import { useParams } from 'react-router-dom';

const NewPassword = () => {
  const { id } = useParams();
  const { isUserAdmin } = useAuth();
  const [socialNetworks, setSocialNetworks] = useState([]);
  const [selectedSocialNetwork, setSelectedSocialNetwork] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await isUserAdmin();

        if (result && result.user && result.user.id) {
          setUserId(result.user.id);
        } else {
          console.error('Error al obtener los datos de usuario');
        }
      } catch (error) {
        console.error('Error al recibir los datos del usuario', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    fetch('http://localhost:6700/cerberus/preaccounts/')
      .then(response => response.json())
      .then(data => {
        setSocialNetworks(data);
        console.log('Social Networks:', data);
      })
      .catch(error => {
        console.error('Error fetching social networks:', error);
      })
      .finally(() => setLoading(false));
  }, [isUserAdmin]);
  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSocialNetworkChange = (e) => {
    const selectedId = e.target.value;
    console.log('Selected ID:', selectedId);
  
    // Maneja el caso en que la red social es 'other'
    if (selectedId === 'other') {
      setSelectedApp(null); // Resetea selectedId para 'other'
    } else {
      setSelectedApp(selectedId);
    }
  
    console.log('Selected App:', selectedId); // Agrega este console.log para verificar selectedId
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
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGeneratePassword = (newPassword) => {
    setGeneratedPassword(newPassword);
  };



  return (
    <Container className='newPassword'>
      <HeaderLogoText></HeaderLogoText>
    
    <Container className='createPasswordForm'>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form className='createPasswordForm'>
          <Form.Select
            aria-label="Select social network"
            value={selectedSocialNetwork}
            onChange={handleSocialNetworkChange}
          >
            <option value="" disabled>Select a Social Network</option>
            {socialNetworks.map(network => (
              <option key={network.id} value={network.id}>
                {network.app_names}
              </option>
            ))}
            <option value="other">Other</option>
          </Form.Select>

            {selectedSocialNetwork === 'other' && (
              <Form.Group controlId="controlOtherNetwork">
                <Form.Control
                  type="text"
                  placeholder="Enter other social network"
                  onChange={handleNameChange}
                />
              </Form.Group>
            )}

            <Form.Group controlId="controlName" className='controlName'>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={handleNameChange}
                value={name}
              />
            </Form.Group>

            <Form.Group controlId="controlEmail" className='controlEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <PasswordGenerator onGeneratePassword={handleGeneratePassword} />
            
            <Button style={{marginTop:"1rem"}} variant="primary" onClick={handleSavePassword}>
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </Container>
  );
}

export default NewPassword;
