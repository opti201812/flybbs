import React, { useState, useContext, useEffect, createContext } from 'react';
import { userContext } from './App';
import { Container } from "react-bootstrap";
import ThreadList from "./ThreadList";
import { Routes, Route, useNavigate } from 'react-router-dom';
import ThreadPage from "./ThreadPage";
import { HOST, PORT } from '../config';
import Header from './Header';
import Footer from './Footer';

const threadsContext = createContext({
    threads: [],
    tid: 0,
    setTid: () => {},
    setThreads: () => { },
    loadThreads: () => { },
    threadModified: 0,
    setThreadModified: ()=>{},
})

const ThreadListTable = () => {
    return (
        <Container className='mt-5 mb-5'>
            <ThreadList />
        </Container>
    )
};

const ThreadListPage = (props) => {
    const [threads, setThreads] = useState([]);
    const [tid, setTid] = useState(0);
    const [threadModified, setThreadModified] = useState(0);
    const navigate = useNavigate();
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

    useEffect(() => {
        // loadThreads();
    }, []);

    return (
        <threadsContext.Provider value={{ threads, setThreads, loadThreads, tid, setTid, threadModified, setThreadModified }}>
            <div>
                <Header />
                {/* <ThreadListTable /> */}
                <Routes>
                    {/* <Route exact path=":tid" element={<ThreadPage />} /> */}
                    <Route exact path="/" element="../index.html" />
                    <Route exact path="/threads" element={<ThreadListTable />} />
                    <Route exact path="/threads/:tid" element={<ThreadPage />} />
                </Routes>
                <Footer />
            </div>
        </threadsContext.Provider>
    )
};

export default ThreadListPage;
export { threadsContext };