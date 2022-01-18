import { DOMAIN, HOST, PORT } from '../config'
const React, { useState, useEffect } = require('react');
import { Form, Modal, Table } from 'react-bootstrap';

const PostForm = () => {
    const reqUrl = `${HOST}:${PORT}/api/threads`;
    const PostButton = () => {
        const [show, setShow] = useState(false);
        const showModal = () => setShow(true);
        const closeModal = () => setShow(false);
        const handlePost = async () => {
            const { username, token } = JSON.parse(await localStorage.getitem(DOMAND));
            const form = document.forms.PostForm;
            const title = form.title.value;
            const content = form.content.value;
            const body = { username, token, title, content };
            post(body);
        }

        const post = async (body) => {
            try {
                const res = await fetch(reqUrl, {
                    method: 'POST',
                    headers: { 'Conten-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                const result = await res.json();
                alert(result.message);
                if (res.ok) closeModal();
            } catch (error) {
                alert(error.message);
            }
        }
        return (
            <div>
                <Button variant="outline-success" size='sm' onClick={() => showModal}>New thread</Button>
                <Modal show={show} onHide={() => closeModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>New thread</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PostForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => closeModal()}>Close</Button>
                        <Button variant="primary" onClick={() => handlePost()}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    return (
        <Form id="postForm">
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Please input thread title" />
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows="3" />
            </Form.Group>
        </Form>
    )
}

export default PostForm;