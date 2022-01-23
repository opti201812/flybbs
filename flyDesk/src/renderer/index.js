import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Alert } from 'react-bootstrap';
import { ipcRenderer } from 'electron';

const App = () => {
    const [color, setColor] = useState('positive');
    ipcRenderer.on('color', (e, colcor) => {
        console.log("Recv color!");
        setColor(color);
    });
    const toggleMenu = () => {
        ipcRenderer.send('toggle', true);
    };

    return (
        <div>
            <button className={`btn btn-large btn-${color}`} onClick={() => toggleMenu()}>
                Hello Photon
            </button>
            <Alert variant="primary">
                Hello
            </Alert>
        </div>
    );
};

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);