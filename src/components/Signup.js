import React, {useContext, useRef, useState} from "react"
import {Row, Col, Form, Button, Card, Alert} from "react-bootstrap"
import {FormGroup} from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom"
import {AuthContext} from "../contexts/AuthContext"

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState(null)
    const {signup} = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("The passwords does not match")
        }
        setError(null)

        try {
            //try login
            signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError(e.message)
        }
    }

    return (
        <>
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Sign up</Card.Title>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <FormGroup id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </FormGroup>
                                <FormGroup id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </FormGroup>
                                <FormGroup id="password-confirm">
                                    <Form.Label>Password Confirm</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required />
                                </FormGroup>

                                <Button type="sumbit">Create Account</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Signup
