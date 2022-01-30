import { DOMAIN, HOST, PORT } from '../config'
import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

const ModifyForm = (props) => {
    const { tid } = props;
    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([]);
    useEffect(() => {
        const reqUrl = `${HOST}:${PORT}/api/threads/${tid}`;
        const loadThread = async () => {
            try {
                const res = await fetch(reqUrl, { method: 'GET' });
                const result = await res.json();
                if (res.ok) {
                    setTitle(result.data.thread.title);
                    setContent(result.data.thread.content);
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert(error.message);
            }
        };

        loadThread();
    }, []);

    return (
        <Form id="modifyForm">
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Please input title" defaultValue={title} />
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows="3" defaultValue={content} />
            </Form.Group>
        </Form>
    );
};

const ModifyButton = (props) => {
    const { tid, loadThread } = props;
    const [show, setShow] = useState(false);
    const showModal = () => setShow(true);
    const closeModal = () => setShow(false);

    const modify = async (body) => {
        const reqUrl = `${HOST}:${PORT}/api/threads/${tid}`;
        try {
            const res = await fetch(reqUrl, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            const result = await res.json();
            if (res.ok) {
                closeModal();
                loadThread(); 
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleModify = async () => {
        const { username, token } = JSON.parse(await localStorage.getItem(DOMAIN));
        const form = document.forms.modifyForm;
        const title = form.title.value;
        const content = form.content.value;
        const body = {
            username, token, title, content,
        };
        modify(body);
    }
    return (
        <div>
            <Button variant="outline-warning" size="sm" onClick={() => showModal()}>Modify</Button>
            <Modal show={show} onHide={() => closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify thread</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModifyForm tid={tid} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModal()}>Close</Button>
                    <Button varitan="primary" onClick={() => handleModify()}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default ModifyButton;
