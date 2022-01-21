import React, { useState, useContext } from 'react';
import { userContext } from '../App';
import { Container } from "react-bootstrap";
import PostButton from "./PostButton";
import ThreadList from "./ThreadList";
import { Routes, Route } from 'react-router-dom';
import ThreadPage from "./ThreadPage";
import { HOST, PORT } from '../config';

const ThreadListTable = () => {
    const [threads, setThreads] = useState([]);
    const { auth } = useContext(userContext);

    const loadThreads = async () => {
        const reqUrl = `${HOST}:${PORT}/api/threads`;
        try {
            const res = await fetch(reqUrl, { method: 'GET' });
            const result = await res.json();
            if (res.ok) {
                setThreads(result.data);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Container>
            {auth ? <PostButton loadThreads={loadThreads} /> : null}
            <ThreadList loadThreads={loadThreads} threads={threads} />
        </Container>
    )

};
const ThreadListPage = () => (
    <Routes>
        <Route exact path="/" element={<ThreadListTable />} />
        <Route exact path=":tid" element={<ThreadPage />} />
    </Routes>
);

export default ThreadListPage;