import React from 'react';
import { Container } from 'react-bootstrap';
import cerberusLogo from '../../assets/cerberusLogo.jpg';
import './Header.css';

function Header({sectionTitle}) {
  return (
    <Container className="headerContainer">
        <img className ="headerLogo"  src={cerberusLogo} alt="Logo de Cerberus" />
        <h2 className="headerTitle" >{sectionTitle}</h2>
    </Container>
    
  )
}

export default Header
