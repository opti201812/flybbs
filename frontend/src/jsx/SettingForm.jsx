import { DOMAIN, HOST, PORT } from '../config'
const React, { useState, useEffect } = require('react');
import { Form, Table } from 'react-bootstrap';

const SettingForm = (props) => {
    const reqUrl = `${HOST}:${PORT}/api/users/${username}`;
    const loadSettings = async (body) => {
        try {
            const storage = await localStorage.getItem(DOMAIN);
            const { username, token } = JSON.parse(storage);
            const res = await fetch(reqUrl, {
                method: 'GET',
                headers: { 'Conten-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const result = res.json();
            if (res.ok) {
                setSettings(result.data);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    };
    useEffect(() => { loadSettings(); }, []);

    const handleSetting = (e) => {
        e.preventDefault();
        const form = document.forms.loginForm;
        const description = form.description.value;
        const body = { description };
        setting(body);
    }

    const setting = async (body) => {
        try {
            const { username, token } = JSON.parse(storage);
            const { description } = body;
            const formData = new FormData();
            await formData.append("username", username);
            await formData.append("token", token);
            await formData.append("description", description);
            await formData.append("avatar", docemtn.querySelector('#uploader').files[0]);
            const res = await fetch(`${HOST}:${PORT}/api/users/`, {
                method: "PATCH",
                body: formData,
            })
            const result = await res.json();
            alert(result.message);
            if (res.ok) loadSettings();
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <Form id="settingForm">
            <Form.Group controlId="description">
                <Form.Label>Personal introduction</Form.Label>
                <Form.Control type="text" placeholder="Please input some words"></Form.Control>
            </Form.Group>
            <Form.Group controlId="uploader">
                <Form.Label>Avatar</Form.Label>
                <img src={settings.avatar ? `upload/${settings.avarar}`: 'img/avatar.png'} alt='avatar' className = "rounder img-thumbnail" />
                <Form.Control type="password" placeholder="Please input password" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={e => handleSetting(e)}>OK</Button>
        </Form>
    );
}

export default SettingForm;