import React, { useContext } from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { languageContext } from "./context/language";

export default function Header() {
  let count = useSelector((state) => state.watch.count);
  const { language, toggleLanguage } = useContext(languageContext);

  return (
    <>
      <Navbar expand="lg" className="bg-warning text-dark ">
        <NavLink to={"/"} className="mx-5 fw-bold  nav-link">
          Movies App
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <NavLink to={"/login"} className="me-5 nav-link" target="_blank">
              Login
            </NavLink>
            
            <NavDropdown
              title={language.toUpperCase()}
              id="basic-nav-dropdown"
              onSelect={toggleLanguage}
            >
              <NavDropdown.Item eventKey="en">EN</NavDropdown.Item>
              <NavDropdown.Item eventKey="ar">AR</NavDropdown.Item>
            </NavDropdown>

            <NavLink
              to={"/watchlist"}
              className="me-5 nav-link position-relative"
            >
              <i class="fa-solid fa-lg fa-heart"></i> watchlist
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                {count}
              </span>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
