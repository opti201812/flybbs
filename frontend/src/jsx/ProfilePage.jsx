import React, { useState } from "react";
import { HOST, PORT } from '../config';
import { Container, Card, ListGroup, Row, Col } from "react-bootstrap";
import UserInfo from "./UserInfo";

const ProfilePage = () => {
    const { username } = props.match.params;
    return (
        <Container>
            <UserInfo username={username} />
        </Container>
    );
};

export default ProfilePage;
