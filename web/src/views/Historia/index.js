/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container , Button} from "reactstrap";
// core components

function IndexHeader() {
  return (
    <>
      <div className="page-header" id="historia-section">
        <div className="historia-header"></div>
        <div
          className="historia-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/fondo_historia.png").default + ")",
          }}
        ></div>
        <Container className="">
            <div className="content-center ala_der contenedor-historia">
                <h1>La historia atrás del sueño</h1>
                <h4 className="text-upper">NUESTROS INICIOS</h4>
                <p>En 2014 iniciamos nuestro sueño de crear una
                empresa de asesoría y capacitación, que nos
                permitiera desplegar nuestra trayectoria y pasión
                por la hotelería y el servicio.
                Llevamos 7 años de colaboración con cadenas
                nacionales y extranjeras, entregando todo nuestro
                potencial y dedicación.
                A partir de 2021 empezamos a ofrecer también
                nuestros servicios en México.
                </p>
            </div>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
