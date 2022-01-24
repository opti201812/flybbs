import React, { useState } from "react";
import { Container, Card, ListGroup, Row, Col } from "react-bootstrap";
import UserInfo from "./UserInfo";
import { useParams } from 'react-router-dom';

const ProfilePage = (props) => {
    const params = useParams();
    const { username } = params;
    
    return (
        <Container>
            <UserInfo username={username} />
        </Container>
    );
};

export default ProfilePage;
