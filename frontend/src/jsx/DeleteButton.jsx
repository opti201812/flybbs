import React from 'react';
import { Button } from 'react-bootstrap';
import { HOST, PORT, DOMAIN } from '../config';

const DeleteButton = (props) => {
    const { tid } = props;
    const handle = async (body) => {
        try {
            const res = await fetch(`${HOST}:${PORT}/api/threads/${tid}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const result = await res.json();
            alert(result.message);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async () => {
        if (confirm('Please confirm to delete.')) {
            const { username, token } = JSON.parse(localStorage.getItem(DOMAIN));
            const body = { username, token, tid };
            handle(body);
        }
    }

    return (
        <Button variant="outline-danger" size="sm" onClick={() => handleDelete()}>
            Delete
        </Button>
    )
};

export default DeleteButton;