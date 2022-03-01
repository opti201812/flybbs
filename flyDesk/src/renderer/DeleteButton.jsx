import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { HOST, PORT, DOMAIN } from '../config';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { threadsContext } from './ThreadListPage';

const DeleteButton = (props) => {
    const { tid } = useContext(threadsContext);
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

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
        <button className="btn btn-default"
            disabled={location.pathname === '/threads'}
            onClick={() => handleDelete()} >
            <span className="icon icon-trash" />
        </button >
    )
};

// export default withRouter(DeleteButton); //O.V.
export default DeleteButton;