import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Row, Col } from "react-bootstrap";
import { HOST, PORT } from '../config';

const UserInfo = (props) => {
    const { username } = props;
    const [user, setUser] = useState({});
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const url = `${HOST}:${PORT}/api/users/${username}`;
            try {
                const res = await fetch(url, { method: 'GET' });
                const result = await res.json();

                if (res.ok) {
                    setUser(result.data);
                    setThreads(result.data.threads);
                }
            } catch (err) {
                alert(err.message);

            }
        };
        getUser();
    }, []);//eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Row>
            <Col sm={12} md={4}>
                <ProfileInfo user={user} />
            </Col>
            <Col sm={12} md={8}>
                <ThreadsInfo threads={threads} />
            </Col>
        </Row>
    );
}

const ProfileInfo = (props) => {
    const { user } = props;
    return (
        <Card>
            <Card.Header>Personal Info</Card.Header>
            <Card.Img
                variant="top"
                src={user.avatar ? `${HOST}:${PORT}/upload/${user.avatar}` : 'img/avatar.png'}
                className="rounded img-thumbnail" />
            <Card.Body>
                <Card.Title>User name</Card.Title>
                <Card.Text>{user.username}</Card.Text>
                <Card.Title>Personal intro</Card.Title>
                <Card.Text>{user.description}</Card.Text>
            </Card.Body>
        </Card>
    )
};

const ThreadsInfo = (props) => {
    const { threads } = props;
    const lines = threads.map((thread, index) => (
        <ListGroup.Item key={index} className="d-flex justify-content-between">
            <span>{thread.title}</span>
            <small className="text-muted">
                {new Date(thread.posttime).toLocaleTimeString()}
            </small>
        </ListGroup.Item>
    ));
    return (
        <Card>
            <Card.Header>
                Thread info
            </Card.Header>
            <ListGroup variant='flush'>
                {lines}
            </ListGroup>
        </Card>
    )
}
export default UserInfo;