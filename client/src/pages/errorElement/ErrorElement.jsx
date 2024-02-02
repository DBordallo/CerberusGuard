import React from "react";
import { Link } from "react-router-dom";
import error404dog from '../../assets/error404dog.gif';
import "./ErrorElement.css"

function ErrorElement(){
    return(
        <div className="NotFound">
         <img className ="errorImg"  src={error404dog} alt="error 404" />
         <div className="errorText parp">¡Oops!This dog escaped and decided to misbehave on the route you were exploring. It's better to backtrack to the main page <Link to="/">here</Link>.
         </div>
        </div>
    )
}

export default ErrorElement