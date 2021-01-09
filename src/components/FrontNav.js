/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const FrontNav = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link to="/">
                        <Navbar.Brand>
                            <img
                                alt="A photo album"
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{" "}
                            Foto Review
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/albums">Albums</Nav.Link>
                            <NavDropdown title="Username" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/my-profile">My profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default FrontNav;
