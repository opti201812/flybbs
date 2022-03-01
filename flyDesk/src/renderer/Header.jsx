import React from "react";
import PostButton from "./PostButton";
import DeleteButton from "./DeleteButton";
import ModifyButton from "./ModifyButton";

const Header = () => {
    return (
        <header className="toolbar toolbar-header fixed-top">
            <div className="toolbar-actions">
                <div className="btn-group">
                    <button className="btn btn-default">
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