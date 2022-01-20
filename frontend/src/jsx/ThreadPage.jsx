import React, { useState } from "react";
import { HOST, PORT } from '../config';
import { Container, Row, ButtonGroup } from "react-bootstrap";
import Thread from "./Thread";
import ReplyForm from "./ReplyForm";
import ModifyButton from "./ModifyButton";
import DeleteButton from "./DeleteButton";

const ThreadPage = (props) => {
    const { tid } = props.match.params;
    const [thread, setThread] = useState({});
    const [comments, setComments] = useState([]);
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
            <Row className="m-0">
                <ButtonGroup className="m1-auto">
                    <ModifyButton tid={tid} loadThread={loadThread} />
                    <DeleteButton tid={tid} loadThread={loadThread} />
                </ButtonGroup>
            </Row>
            <Thread tid={tid} thread={thread} comments={comments} loadThread={loadThread} />
            <ReplyForm tid={tid} loadThread={loadThread} />
        </Container>
    );
};

export default ThreadPage;