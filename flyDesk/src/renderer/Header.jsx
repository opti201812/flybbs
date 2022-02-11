import React from "react";
import PostButton from "./PostButton";

const Header = () => {
    return (
        <header className = "toolbar toolbar-header fixed-top">
            <div className = "toolbar-actions">
                <div className="btn-group">
                    <button className="btn btn-default">
                        <span className="icon icon-logout" />
                    </button>
                </div>
            </div>
            <div className="btn-group">
                {/* <button className="btn btn-default">
                    <span className="icon icon-plus" />
                </button> */}
                <PostButton />
                <button className="btn btn-default">
                    <span className="icon icon-doc-text" />
                </button>
                <button className="btn btn-default">
                    <span className="icon icon-trash" />
                </button>
            </div>
        </header>
    );
};

export default Header;