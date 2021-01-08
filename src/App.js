/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FrontNav from "./components/FrontNav";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";
import "./assets/scss/app.scss";

const App = () => {
    return (
        <Router>
            <FrontNav />
            <Container className="py-3">
                <Routes>
                    <Route path="/">
                        <Home />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
