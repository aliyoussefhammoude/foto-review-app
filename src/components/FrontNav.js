/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react"
import {Navbar, Nav, NavDropdown, Container} from "react-bootstrap"
import {NavLink, Link} from "react-router-dom"
import {useAuth} from "../contexts/AuthContext"
import logo from "../assets/images/logo.svg"

const FrontNav = () => {
    const {currentUser} = useAuth()


    return (
        <div>
            <Navbar bg="bright" variant="bright">
                <Container>
                    <Link to="/" className="navbar-band" style={{ color: '#000', textDecoration: 'none'}}>
                        <img alt="A photo album" src={logo} width="50" height="50" className="d-inline-block align-top" />
                        <h5 className="mb-0">Foto review</h5>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavLink to="/albums" className="nav-link" style={{ color: '#000' }}>
                                Albums
                            </NavLink>
                            {currentUser ? (
                                <NavDropdown title={ <strong style={{ color: '#000' }}>{currentUser.displayName}</strong> } id="basic-nav-dropdown">
                                    <NavLink to="/update-profile" className="dropdown-item">Update Profile</NavLink>
                                    <NavDropdown.Divider />
                                    <NavLink to="/logout" className="dropdown-item">
                                        Logout
                                    </NavLink>
                                </NavDropdown>
                            ) : (
                                <NavLink to="/login" className="nav-link" style={{ color: '#000' }}>
                                    Login
                                </NavLink>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <hr className="mt-0" color={"#888"}></hr>
        </div>
    )
}

export default FrontNav
