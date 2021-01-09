import React, {useRef, useState} from 'react'
import {Row, Col, Form, Button, Card, Alert} from 'react-bootstrap'
import {FormGroup} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(null)

        try {
            //try log in
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch (e) {
            setError("couldn't log in, please check your email and password.")
            setLoading(false)
        }
    }

    return (
        <>
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Log in</Card.Title>

                            {error && (<Alert variant="danger">{error}</Alert>)}

                            <Form onSubmit={handleSubmit}>
                                <FormGroup id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </FormGroup>
                                <FormGroup id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </FormGroup>

                                <Button disabled={loading} type="sumbit">
                                    Log In
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="text-center mt-2">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Login
