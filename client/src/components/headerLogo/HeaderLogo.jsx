import "./HeaderLogo.css"
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import cerberusLogo from "../../assets/cerberusLogo.jpg"
import 'animate.css'

function HeaderLogo() {
    
  return (

    <Container className="HeaderLogo">
     <Image style={{ display: "inline-block"}} src={cerberusLogo}  className="cerberusLogo" />;
     </Container>
  
  )
}

export default HeaderLogo;