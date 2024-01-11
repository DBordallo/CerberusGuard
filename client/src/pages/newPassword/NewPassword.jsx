import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import PasswordGenerator from '../../components/passwordGenerator/PasswordGenerator';

function NewPassword() {
  const [socialNetworks, setSocialNetworks] = useState([]);
  const [selectedSocialNetwork, setSelectedSocialNetwork] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');

  useEffect(() => {
    fetch('/api/socialNetworks')
      .then(response => response.json())
      .then(data => setSocialNetworks(data))
      .catch(error => console.error('Error fetching social networks:', error));
  }, []);

  const handleSocialNetworkChange = (e) => {
    setSelectedSocialNetwork(e.target.value);
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

  const handleSavePassword = () => {
    fetch('/api/savePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socialNetwork: selectedSocialNetwork,
        name,
        email,
        generatedPassword,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Contraseña y información del usuario guardadas exitosamente:', data);      })
      .catch(error => {
        console.error('Error al guardar la contraseña y la información del usuario:', error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form>
            <Form.Select
              aria-label="Select social network"
              value={selectedSocialNetwork}
              onChange={handleSocialNetworkChange}
            >
              <option value="" disabled>Select a Social Network</option>
              {socialNetworks.map(network => (
                <option key={network.id} value={network.id}>{network.name}</option>
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

            <Form.Group controlId="controlName">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={handleNameChange}
              />
            </Form.Group>

            <Form.Group controlId="controlEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
              />
            </Form.Group>

            <PasswordGenerator onGeneratePassword={handleGeneratePassword} />
            <Button variant="primary" onClick={handleSavePassword}>
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default NewPassword;
