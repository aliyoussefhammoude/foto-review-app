import React, {useRef, useState} from "react"
import {Row, Col, Form, Button, Card, Alert} from "react-bootstrap"
import {FormGroup} from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom"
import {useAuth} from "../contexts/AuthContext"

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {signup} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("The passwords does not match")
        }
        setError(null)

        try {
            //try sign up
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError(e.message)
            setLoading(false)
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

                                <Button disabled={loading} type="sumbit">
                                    Create Account
                                </Button>
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
