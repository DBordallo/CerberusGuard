import "./HeaderLogoText.css"
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import cerberusLogo from "../../assets/cerberusLogo.jpg"
import 'animate.css'

function HeaderLogoText() {
    
  return (

    <Container className="HeaderLogoText">
     <Image src={cerberusLogo}  className="cerberusLogo" />;
     <h2 className="pageTittle" style={{ color:"white"}}>New Password</h2>
     </Container>
  
  )
}

export default HeaderLogoText;