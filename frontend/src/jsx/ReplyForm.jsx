import { DOMAIN, HOST, PORT } from '../config'
const React, { useState, useEffect } = require('react');
import { Form, Modal, Table } from 'react-bootstrap';

const ReplyForm = (props) => {
    const { tid } = props;
    const reqUrl = `${HOST}:${PORT}/api/comments/${tid}`;
    const reply = async (body) => {
        try {
            const res = await fetch(reqUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            })
            const result = await res.json();
            alert(result.message);
        } catch (error) {
            alert(error.message);
        }
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