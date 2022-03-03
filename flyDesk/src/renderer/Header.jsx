import React from "react";
import PostButton from "./PostButton";
import DeleteButton from "./DeleteButton";
import ModifyButton from "./ModifyButton";
import { ipcRenderer } from 'electron';

const Header = () => {
    return (
        <header className="toolbar toolbar-header fixed-top">
            <div className="toolbar-actions">
                <div className="btn-group">
                    <button className="btn btn-default"
                        onClick={() => { 
                            ipcRenderer.send('logoutClicked', true);
                        }} >
                        <span className="icon icon-logout" />
                    </button>
                </div>
                <div className="btn-group">
                    <PostButton />
                    <ModifyButton />
                    <DeleteButton />
                </div>
            </div>
        </header>
    );
};

export default Header;