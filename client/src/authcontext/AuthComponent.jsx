import { useEffect, useState } from "react";
import isUserAdmin from "./UserAdmin";
import HomeCerberus from "../pages/cerberusGuard/homeCerberus/HomeCerberus";
import ErrorElement from "../pages/errorElement/ErrorElement";
import UserHome from "../pages/user/userHome/UserHome";

const ComponenteCondicional = ({ condicion }) => {
    if (condicion && condicion.roles && condicion.id) {
      if (condicion.roles === "admin") {
        return <HomeCerberus />;
      } else if (condicion.roles === "user") {
        return <UserHome userId={condicion.id} />;
      } else {
        return <ErrorElement />;
      }
    } else {
      return <ErrorElement />;
    }
  };
function MiComponente() {
    const [condicion, setCondicion] = useState(null);



    useEffect(() => {
    isUserAdmin().then(result => {
        if (result && result.user && result.user.roles) {
          setCondicion(result.user);
        } else {
          setCondicion(null); // En caso de una respuesta no válida
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setCondicion(null); // En caso de un error
      });
  }, []);

  return (
    <div>
        <ComponenteCondicional condicion={condicion} />
    </div>
);
}

export default MiComponente;