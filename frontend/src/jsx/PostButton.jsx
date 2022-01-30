import { DOMAIN, HOST, PORT } from '../config'
import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

const PostForm = () => {
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
};

const PostButton = (props) => {
    const [show, setShow] = useState(false);
    const showModal = () => setShow(true);
    const closeModal = () => setShow(false);

    const post = async (body) => {
        const reqUrl = `${HOST}:${PORT}/api/threads`;
        const { loadThreads } = props;
        try {
            const res = await fetch(reqUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const result = await res.json();
            if (res.ok) {
                closeModal();
                loadThreads();
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const handlePost = async () => {
        const { username, token } = JSON.parse(await localStorage.getItem(DOMAIN));
        const form = document.forms.postForm;
        const title = form.title.value;
        const content = form.content.value;
        const body = { username, token, title, content };
        post(body);
    }


    return (
        <div>
            <Button variant="outline-success" size='sm' onClick={() => showModal()}>New thread</Button>
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

export default PostButton;