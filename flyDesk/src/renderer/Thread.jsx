import { HOST, PORT } from '../config'
import React, { useState, useEffect } from 'react';
import Media from 'react-bootstrap/Media';

const Thread = (props) => {
    const { thread, comments, loadThread} = props;
    useEffect(() => {
        loadThread();
    }, []);

    return (
        <div>
            <TPart thread={thread} />
            <CPart comments={comments} />
        </div>
    )
};

const TPart = (props) => {
    const { thread } = props;
    if (!thread.author) return null;
    return (
        <Media className="rounded border p-3 mb-3 mt-0">
            <UserCard author={thread.author} />
            <Media.Body>
                <ContentCard floor={thread} />
            </Media.Body>
        </Media>
    );
};

const CPart = (props) => {
    const { comments } = props;
    const floors = comments.map((comment, index) => (
        <Floor key={index} comment={comment} />
    ));
    return (
        <div>
            {floors}
        </div>
    )
};

const Floor = (props) => {
    const { comment } = props;
    return (
        <Media className="rounded border p-3 mb-3">
            <UserCard author={comment.author} />
            <Media.Body>
                <ContentCard floor={comment} />
            </Media.Body>
        </Media>
    )
};

const UserCard = (props) => {
    const { author } = props;
    return (
        <div>
            <img width={32}
                height={32}
                className='mr-3 img-thumbnail round'
                src={author.avatar ? `${HOST}:${PORT}/upload/${author.avatar}` : `${HOST}:${PORT}/img/avatar.jpeg`}
                alt={author.username} />
            {/* <br /> */}
            <span style={{marginLeft:0.5+'rem'}}>{author.username}</span>
        </div>
    )
}

const ContentCard = (props) => {
    const { floor } = props;
    return (
        <div>
            <h5>{floor.title}</h5>
            <p dangerouslySetInnerHTML={{__html:floor.content}}>
                {/* {floor.content} */}
            </p>
            <p className='d-flex justify-content-end text-muted'>
                <small>
                    {new Date(floor.posttime).toLocaleString()}
                </small>
            </p>
            <hr />
            <p className='d-flex justify-content-end m-0'>
                <small>
                    {floor.author.description}
                </small>
            </p>
        </div>
    );
};

export default Thread;