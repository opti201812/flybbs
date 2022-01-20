import React, { useState } from "react";
import { Container, Card, ListGroup, Row, Col } from "react-bootstrap";
import UserInfo from "./UserInfo";

const ProfilePage = (props) => {
    const { username } = props.match.params;
    return (
        <Container>
            <UserInfo username={username} />
        </Container>
    );
};

export default ProfilePage;
