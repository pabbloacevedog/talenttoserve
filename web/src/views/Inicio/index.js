/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Button } from "reactstrap";
// core components

function Inicio() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header filtro-inicio">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/inicio.png").default + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
            <div className="content-center ala_izq logo-inicio">
                <img
                alt="..."
                className="n-logo"
                src={require("assets/img/logo-clean.png").default}
                ></img>
                <h1>Talent to Serve</h1>
                <h4 className="text-upper">Capacitaciones y asesorías para hoteles</h4>
                <Button className="btn-round" color="primary">
                 Nuestra comunidad esta conformada por 1000 usuarios a día de hoy
                </Button>
            </div>
        </Container>
      </div>
    </>
  );
}

export default Inicio;
