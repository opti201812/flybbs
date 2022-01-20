import React, { useState } from "react";
import { HOST, PORT } from '../config';
import { Container, Card, ListGroup, Row, Col } from "react-bootstrap";
import SettingForm from "./SettingForm";

const SettingPage = () => {
    return (
        <Container>
            <Row className ="d-flex justify-content-center">
                <Col sm={12} md={6}>
                    <SettingForm />
                </Col>
            </Row>
        </Container>
    );
};

export default SettingPage;
