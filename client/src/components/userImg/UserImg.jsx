import React from "react";
import 'UserImg.css'

function UserImg({userImg}){

    return(
        <container>
            <img src={userImg} alt="Imagen de perfil del usuario" className="imagenUsauario"/>
        </container>
    )
}