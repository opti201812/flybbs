import React from "react";
import {useNavigate, useLocation} from 'react-router-dom';

const Footer = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const goBack = () => {
        //go back
        navigate(-1);
    };

    return (
        <footer className="toolbar toolbar-footer fixed-bottom">
            <div className="toobar-actions">
                {location.pathname === '/threads' ? null : (<button className="btn btn-default" onClick={()=>goBack()}>Go Back</button>)}
            </div>
        </footer>
    );
};

export default Footer;
