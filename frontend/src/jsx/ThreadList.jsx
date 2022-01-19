import { HOST, PORT } from '../config'
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const ThreadList = (props) => {
    //const { threads } = props;

    const [threads, setThreads] = useState([]);
    useEffect(() => {
        setThreads([{ title: "loading...", author: "loading...", posttime: "0000-00-00" }]);
        const reqUrl = `${HOST}:${PORT}/api/threads`;
        const loadThreads = async () => {
            try {
                console.log("reqUrl", reqUrl)
                const res = await fetch(reqUrl, { method: 'GET' });
                console.log(res)
                const result = await res.json();
                if (res.ok) {
                    console.log(result.data)
                    setThreads(result.data);
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert(error.message);
            }
        };
        loadThreads();
    }, [])
    const rows = threads.map((thread, index) => {
        console.log(thread, index)
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
    // const [click, setClick] = useState(0);
    // const [fav, setFav] = useState(thread.fav);
    return (
        <tr>
            <td>{thread.title}</td>
            <td>{thread.author.username || "unknwon"}</td>
            <td>{new Date(thread.posttime).toLocaleString()}</td>
            {/* <td><button onClick={() => setClick(click + 1)}>{click}</button></td>
            <td><button onClick={() => handleFav(fav ? setFav(false) : setFav(true))}>{fav ? 'Unfav' : 'Fav'}</button></td> */}
        </tr>
    )
}
export default ThreadList;