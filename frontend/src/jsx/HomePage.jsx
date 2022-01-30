import React, { useState, useContext } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { Demo, Slogan } from "./Intro";
import { userContext } from '../App';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const RegLogForm = () => {
    const [mode, setMode] = useState('login');

    return (
        <Tabs id="homeTabs" activeKey={mode} onSelect={mode=>setMode(mode)} className="pt-1">
            <Tab eventKey="login" title="Login">
                <LoginForm />
            </Tab>
            <Tab eventKey="register" title="Register">
                <RegisterForm />
            </Tab>
        </Tabs>
    )
}
const HomePage = () => {
    const { auth } = useContext(userContext);
    return (
        <Container fluid>
            <Row>
                <Col sm={12} md={7} className="pr-1">
                    <Demo />
                </Col>
                {auth
                    ? <Col sm={12} md={5} className="pl-0 d-flex align-item-stretch">
                        <Slogan />
                    </Col>
                    : <Col sm={12} md={5} className="p1-0"><RegLogForm /></Col>
                }
            </Row>
        </Container>
    )
};

export default HomePage;