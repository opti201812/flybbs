import React from "react";
import {withRouter} from 'react-router-dom';

const Footer = (props) => {
    const {history, location} = props;
    const goBack = () => {
        //go back
    };

    return (
        <footer className="toolbar toolbar-footer fixed-bottom">
            <div className="toobar-actions">
                {location.pathname === '/threads' ? null : (<button className="btn btn-default" onClick={()=>goBack()}>Back</button>)}
            </div>
        </footer>
    );
};

export default withRouter(Footer);
