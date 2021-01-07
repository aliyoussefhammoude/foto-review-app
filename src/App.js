import { logRoles } from "@testing-library/react";
import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logo from "./assets/images/logos.svg";
import "./assets/scss/app.scss";

const App = () => {
    return;
    <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt="A photo album"
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{" "}
                    Foto Review
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/albums">Albums</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Username" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/my-profile">My profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Container>Here be content.</Container>
    </>;
};

export default App;
