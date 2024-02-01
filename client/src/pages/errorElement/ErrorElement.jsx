import React from "react";
import { Link } from "react-router-dom";

function ErrorElement(){
    return(
        <div>
            volver al login <Link to="/">aquí</Link>
        </div>
    )
}

export default ErrorElement