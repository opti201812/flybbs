import React, { useState, useContext, useEffect, createContext } from 'react';
import { userContext } from './App';
import { Container } from "react-bootstrap";
import ThreadList from "./ThreadList";
import { Routes, Route } from 'react-router-dom';
import ThreadPage from "./ThreadPage";
import { HOST, PORT } from '../config';
import Header from './Header';
import Footer from './Footer';

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

const threadsContext = createContext({
    threads: [],
    setThreads: () => { },
    loadThreads: () => { },
})

const ThreadListTable = () => {
    const { auth } = useContext(userContext);

    return (
        <Container className='mt-5 mb-5'>
            <ThreadList loadThreads={loadThreads} threads={threads} />
        </Container>
    )

};
const ThreadListPage = (props) => {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        //navigate to  threads
    }, []);

    return (
        <threadsContext.Provider value={{ threads, setThreads, loadThreads }}>
            <div>
                <Header />
                <Routes>
                    <Route exact path="/" element={<ThreadListTable />} />
                    <Route exact path=":tid" element={<ThreadPage />} />
                </Routes>
                <Footer />
            </div>
        </threadsContext.Provider>
    )
};

export default ThreadListPage;
export { threadsContext };