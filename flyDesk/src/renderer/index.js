import React from "react";
import ReactDOM from "react-dom";
import { Alert } from 'react-bootstrap';

const App = () => {
    return (
        <div>
            <button className="btn btn-large btn-positive">
                Hello Photon
            </button>
            <Alert variant="primary">
                Hello React bootstrap
            </Alert>
        </div>
    );
};

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);