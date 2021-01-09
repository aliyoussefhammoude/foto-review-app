/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react"
import {Container} from "react-bootstrap"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AuthRoute from "./components/AuthRoute"
import Home from "./components/Home"
import Login from "./components/Login"
import FrontNav from "./components/FrontNav"
import NotFound from "./components/NotFound"
import Signup from "./components/Signup"
import AuthContextProvider from "./contexts/AuthContext"
import "./assets/scss/app.scss"

const App = () => {
    return (
        <Router>
            <AuthContextProvider>
                <FrontNav />
                <Container className="py-3">
                    <Routes>
                        <AuthRoute path="/">
                            <Home />
                        </AuthRoute>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Container>
            </AuthContextProvider>
        </Router>
    )
}

export default App
