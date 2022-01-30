import React, { useState, useContext } from 'react';
import { userContext } from '../App';
import { HOST, PORT } from '../config';
import { Container, Row, ButtonGroup } from "react-bootstrap";
import Thread from "./Thread";
import ReplyForm from "./ReplyForm";
import ModifyButton from "./ModifyButton";
import DeleteButton from "./DeleteButton";
import { useParams } from 'react-router-dom';

const ThreadPage = (props) => {
    const params = useParams();
    const { tid } = params;
    const [thread, setThread] = useState({});
    const [comments, setComments] = useState([]);
    const { user, auth } = useContext(userContext);

    const loadThread = async () => {
        try {
            const res = await fetch(`${HOST}:${PORT}/api/threads/${tid}`);
            const result = await res.json();
            if (res.ok) {
                setThread(result.data.thread);
                setComments(result.data.comments);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Container>
            {thread.author && user.username === thread.author.username ?
                <Row className="m-0">
                    <ButtonGroup className="m1-auto">
                        <ModifyButton tid={tid} loadThread={loadThread} />
                        <DeleteButton tid={tid} loadThread={loadThread} />
                    </ButtonGroup>
                </Row>
                : null}
            <Thread tid={tid} thread={thread} comments={comments} loadThread={loadThread} />
            {auth ? <ReplyForm tid={tid} loadThread={loadThread} /> : null}

        </Container>
    );
};

export default ThreadPage;