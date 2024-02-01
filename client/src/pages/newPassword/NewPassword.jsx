import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import PasswordGenerator from '../../components/passwordGenerator/PasswordGenerator';
import HeaderLogoText from '../../components/headerLogo+text/HeaderLogoText';
import "./NewPassword.css"

function NewPassword() {
  const [socialNetworks, setSocialNetworks] = useState([]);
  const [selectedSocialNetwork, setSelectedSocialNetwork] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');

  useEffect(() => {
    fetch('http://localhost:6700/cerberus/preaccounts/')
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
    fetch(`http://localhost:6700/cerberus/accounts/`, {
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

            <Form.Group controlId="controlName" className='controlName'>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={handleNameChange}
              />
            </Form.Group>

            <Form.Group controlId="controlEmail" className='controlEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
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
