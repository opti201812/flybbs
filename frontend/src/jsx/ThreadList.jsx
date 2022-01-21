import { HOST, PORT } from '../config'
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ThreadList = (props) => {
    const { loadThreads, threads } = props;

    useEffect(() => {
        // setThreads([{ title: "loading...", author: "loading...", posttime: "0000-00-00 00:00:00" }]);
        loadThreads();
    }, [])
    const rows = threads.map((thread, index) => {
        return (
            <Row key={index} thread={thread} />
        )
    });
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publish</th>
                    {/* <th>Clicks</th>
                    <th>Favoriate</th> */}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}

const Row = (props) => {
    const { thread } = props;
    return (
        <tr>
            <td>
                <Link to={`/threads/${thread._id}`}>{thread.title}</Link>
            </td>
            {/* <td>{thread.title}</td> */}
            <td>{thread.author.username || "unknwon"}</td>
            <td>{new Date(thread.posttime).toLocaleString()}</td>
        </tr>
    )
}
export default ThreadList;