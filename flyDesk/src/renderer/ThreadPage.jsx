import React, { useState, useContext, useEffect } from 'react';
import { userContext } from './App';
import { HOST, PORT } from '../config';
import { Container, Row, ButtonGroup } from "react-bootstrap";
import Thread from "./Thread";
import ReplyForm from "./ReplyForm";
import { useParams } from 'react-router-dom';
import { threadsContext } from './ThreadListPage';

const ThreadPage = (props) => {
    const params = useParams();
    const { tid, setTid, threadModified, setThreadModified } = useContext(threadsContext);
    const [thread, setThread] = useState({});
    const [comments, setComments] = useState([]);
    const { user, auth } = useContext(userContext);

    const loadThread = async () => {
        try {
            const res = await fetch(`${HOST}:${PORT}/api/threads/${params.tid}`);
            const result = await res.json();
            if (res.ok) {
                setThread(result.data.thread);
                setComments(result.data.comments);
                setTid(params.tid);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        loadThread();
    }, [threadModified]);


    return (
        <Container className="mb-5 mt-5">
            {thread.author && user.username === thread.author.username ?
                <Row className="m-0">
                </Row>
                : null}
            <Thread tid={tid} thread={thread} comments={comments} loadThread={loadThread} />
            {auth ? <ReplyForm tid={tid} loadThread={loadThread} /> : null}
        </Container>
    );
};

export default ThreadPage;