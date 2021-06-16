/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components

function Areas() {
  return (
    <>
      <div className="page-header" id="areas-section">
        <Container>
          <div className="content-center brand">
            <img
              alt="..."
              className="n-logo"
              src={require("assets/img/now-logo.png").default}
            ></img>
            <h1 className="h1-seo">Now UI Kit.</h1>
            <h3>A beautiful Bootstrap 4 UI kit. Yours free.</h3>
          </div>
          <h6 className="category category-absolute">
            Designed by{" "}
            <a href="http://invisionapp.com/?ref=creativetim" target="_blank">
              <img
                alt="..."
                className="invision-logo"
                src={require("assets/img/invision-white-slim.png").default}
              ></img>
            </a>
            . Coded by{" "}
            <a
              href="https://www.creative-tim.com?ref=nukr-index-header"
              target="_blank"
            >
              <img
                alt="..."
                className="creative-tim-logo"
                src={require("assets/img/creative-tim-white-slim2.png").default}
              ></img>
            </a>
            .
          </h6>
        </Container>
      </div>
    </>
  );
}

export default Areas;
