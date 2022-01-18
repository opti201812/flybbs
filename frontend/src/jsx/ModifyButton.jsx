import { DOMAIN, HOST, PORT } from '../config'
const React, { useState, useEffect } = require('react');
import { Form, Modal, Table } from 'react-bootstrap';

const ModifyForm = (props) => {
    const reqUrl = `${HOST}:${PORT}/api/threads/${tid}`;
    const { tid } = props;
    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([]);
    const loadThread = async () => {
        try {
            const res = await fetch(reqUrl, { method: 'GET' });
            const result = res.json();
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

    useEffect(() => {
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
    const { tid } = props;
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
            alert(res.message);
            if (res.ok) {
                closeModal();
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleModify = async () => {
        const { username, token } = JSON.parse(await localStorage.getItem(DOMAIN));
        const form = document.forms.ModifyForm;
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
