import React from "react";

const Footer = () => (
  <footer
    className="page-footer font-small blue pt-4"
    style={{
      backgroundColor: "#ebecf2",
      marginTop: "40px",
    }}
    sticky="bottom"
  >
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase">FoodieHub</h5>
          <p>Find a restaurant near you.</p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Resources</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#!" style={{ color: "black", textDecoration: "none" }}>
                Resource Hub
              </a>
            </li>
            <li>
              <a href="#!" style={{ color: "black", textDecoration: "none" }}>
                Blog
              </a>
            </li>
            <li>
              <a href="#!" style={{ color: "black", textDecoration: "none" }}>
                Learn More
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Company</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#!" style={{ color: "black", textDecoration: "none" }}>
                About Us
              </a>
            </li>
            <li>
              <a href="#!" style={{ color: "black", textDecoration: "none" }}>
                Careers
              </a>
            </li>
            <li>
              <a href="#!" style={{ color: "black", textDecoration: "none" }}>
                Events
              </a>
            </li>
            <li>
              <a href="#!" style={{ color: "black", textDecoration: "none" }}>
                Contact Us
              </a>
            </li>
            <li>
              <a href="#!" style={{ color: "black", textDecoration: "none" }}>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3">
      © 2023 Copyright:
      <a href="#!"> FoodieHub.com</a>
    </div>
  </footer>
);

export default Footer;
