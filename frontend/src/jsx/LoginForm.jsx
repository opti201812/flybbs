import { HOST, PORT, DOMAIN } from '../config'
import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { userContext } from '../App';

const LoginForm = (props) => {
    const reqUrl = `${HOST}:${PORT}/api/users/login`;
    const { setUser, setAuth } = useContext(userContext);

    const login = async (body) => {
        try {
            const res = await fetch(reqUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const result = await res.json();
            if (res.ok) {
                alert(result.message);
                const data = { username: result.data.username, token: result.data.token };
                localStorage.setItem(DOMAIN, JSON.stringify(data));
                setAuth(true);
                setUser({ username: result.data.username });
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const form = document.forms.loginForm;
        const username = form.username.value;
        const password = form.password.value;
        const body = { username, password };
        login(body);
    }
    return (
        <Form id="loginForm">
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Please input user name"></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Please input password" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={e => handleLogin(e)}>Login</Button>
        </Form>
    );
}

export default LoginForm;