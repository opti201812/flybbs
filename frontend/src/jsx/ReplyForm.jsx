import { DOMAIN, HOST, PORT } from '../config'
import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ReplyForm = (props) => {
    const { tid } = props;
    const reqUrl = `${HOST}:${PORT}/api/comments/${tid}`;
    const reply = async (body) => {
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
    const handleReply = async (e) => {
        e.preventDefault();
        const {username, token} = JSON.parse(localStorage.getItem(DOMAIN));
        const form = document.forms.replyForm;
        const content = form.content.value;
        const body = { username, token, content};
        reply(body);
    }

    return (
        <Form id="replyForm" className="p-3">
            <Form.Group controlId="content">
                <Form.Label>Reply</Form.Label>
                <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={e => handleReply(e)}>Submit</Button>
        </Form>
    )
}

export default ReplyForm;