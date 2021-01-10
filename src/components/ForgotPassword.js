import React, {useRef, useState} from 'react'
import {Row, Col, Form, Button, Card, Alert} from 'react-bootstrap'
import {FormGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

const ForgotPassword = () => {
    const emailRef = useRef()
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const {resetPassword} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(null)

        try {
            //try to send a password reset email to the owner of the email
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Please check your email for further instructions")
        } catch (e) {
            setError("Something went wrong, please check your email address.")
            setLoading(false)
        }
    }

    return (
        <>
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Forgot Password</Card.Title>

                            {error && (<Alert variant="danger">{error}</Alert>)}
                            {message && (<Alert variant="success">{message}</Alert>)}

                            <Form onSubmit={handleSubmit}>
                                <FormGroup id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </FormGroup>

                                <Button disabled={loading} type="sumbit">Reset Password</Button>
                            </Form>
                        </Card.Body>
                        <div className="text-right mb-3 mr-3">
                            Remembered password? <Link to="/login">Log in</Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ForgotPassword
