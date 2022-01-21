import { HOST, PORT } from '../config'
import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { userContext } from '../App';

const RegisterForm = (props) => {
    const { setAuth } = useContext(userContext);

    const handelRegister = (e) => {
        e.preventDefault();
        const form = document.forms.registerForm;
        const username = form.username.value;
        const password = form.password.value;
        const confirmpass = form.password.value;
        const body = { username, password, confirmpass };
        register(body);
    }

    const register = async (body) => {
        const reqUrl = `${HOST}:${PORT}/api/users/new`;
        try {
            const res = await fetch(reqUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            const result = await res.json();

            alert(result.message);
            if (res.ok) {   // Registered consider as login ok.
                setAuth(true);
                setUser({ username: body.username });
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Form id="registerForm">
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder='Please input user name'></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Please input password">
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmpass">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Plese retype the password" ></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => handelRegister(e)}>Register</Button>
        </Form>
    );
}

export default RegisterForm;