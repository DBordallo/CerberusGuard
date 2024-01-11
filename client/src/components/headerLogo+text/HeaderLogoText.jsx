import "./HeaderLogoText.css"
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import cerberusLogo from "../../assets/cerberusLogo.jpg"
import 'animate.css'

function HeaderLogo() {
    
  return (

    <Container className="HeaderLogo">
     <Image src={cerberusLogo}  className="cerberusLogo" />;
     <h2>Password</h2>
     </Container>
  
  )
}

export default HeaderLogo;