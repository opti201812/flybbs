import React from 'react';
import { Button } from 'react-bootstrap';
import { HOST, PORT, DOMAIN } from '../config';
// import { withRouter } from 'react-router-dom';   // O.V.
import { useNavigate } from 'react-router-dom';

const DeleteButton = (props) => {
    const { tid, history } = props;
    const navigate = useNavigate();

    const handle = async (body) => {
        try {
            const res = await fetch(`${HOST}:${PORT}/api/threads/${tid}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const result = await res.json();
            alert(result.message);
            if (res.ok) {
                // history.push("/threads")
                navigate("/threads");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async () => {
        // if (confirm('Please confirm to delete.')) {
            const { username, token } = JSON.parse(localStorage.getItem(DOMAIN));
            const body = { username, token, tid };
            handle(body);
        // }
    }

    return (
        <Button variant="outline-danger" size="sm" onClick={() => handleDelete()}>
            Delete
        </Button>
    )
};

// export default withRouter(DeleteButton); //O.V.
export default DeleteButton;