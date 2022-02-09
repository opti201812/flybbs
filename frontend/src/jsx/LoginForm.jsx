import { HOST, PORT, DOMAIN } from '../config'
import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { userContext } from '../App';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = (props) => {
    const reqUrl = `${HOST}:${PORT}/api/users/login`;
    const { setUser, setAuth } = useContext(userContext);
    const navigate = useNavigate();

    const login = async (body) => {
        try {
            const res = await fetch(reqUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const result = await res.json();
            if (res.ok) {
                // alert(result.message);
                const data = { username: result.data.username, token: result.data.token };
                localStorage.setItem(DOMAIN, JSON.stringify(data));
                setAuth(true);
                setUser({ username: result.data.username });
                navigate("/threads");
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
            <Form.Group controlId="username" className="mt-2">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Please input user name"  />
            </Form.Group>
            <Form.Group controlId="password" className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Please input password" autoComplete="new-password"/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={e => handleLogin(e)} className="mt-2">Login</Button>
        </Form>
    );
}

export default LoginForm;