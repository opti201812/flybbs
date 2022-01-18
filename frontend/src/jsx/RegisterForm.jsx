import { HOST, PORT } from '../config'
const React, { useState, useEffect } = require('react');
import { Form, Table } from 'react-bootstrap';

const RegisterForm = (props) => {
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

const handelRegister = (e) => {
    e.preventDefault();
    const form = document.forms.registerFoem;
    const username = form.username.value;
    const password = form.password.value;
    const confirmpass = form.password.value;
    const body = { username, password, confirmpass };
    register(body);
}

const register = async (body) => {
    const reqUrl = `${HOST}:${PORT}/api/users`;
    try {
        const res = await fetch(reqUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        const result = await res.json();

        alert(result.message);
    } catch (error) {
        alert(error.message);
    }
}

export default RegisterForm;