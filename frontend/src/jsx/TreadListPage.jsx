import React from "react";
import { Container } from "react-bootstrap";
import PostButton from "./PostButton";
import ThreadList from "./ThreadList";
import {Switch, Route} from 'react-router-dom';
import ThreadPage from "./ThreadPage";

const ThreadListTable = ()=> {
    const [threads, setThreads] = useState([]);
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

    <Container>
        <PostButton loadThreads={loadThreads} />
        <ThreadList loadThreads={loadThreads} threads={threads}/>
    </Container>
};
const ThreadListPage = () =>{
    <Switch>
        <Route exact path="/threads" component={ThreadListTable} />
        <Route exact path="/threads/:tid" component={ThreadPage} />
    </Switch>
}
export default ThreadListPage;