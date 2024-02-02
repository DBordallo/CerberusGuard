import React from "react";
import { Link } from "react-router-dom";
import error404dog from '../../assets/error404dog.gif';
import "./ErrorElement.css"

function ErrorElement(){
    return(
        <div className="NotFound">
         <img className ="errorImg"  src={error404dog} alt="error 404" />
         <div className="errorText">¡Oops! Este perro se escapó y decidió hacer travesuras en la ruta que estabas explorando. Mejor retrocede a la página principal <Link to="/">aquí</Link>
         </div>
        </div>
    )
}

export default ErrorElement