import React from 'react';
import './Comment.scss';

const Comment = (props) => {
    const name = props.name;
    const body = props.body;
    const randomBgColor = Math.floor(Math.random()*16777215).toString(16);

    return (
        <div className="comment__item">
            <div 
                className="comment__item-avatar" 
                style={{backgroundColor: `#${randomBgColor}`}}>
                {name.slice(0,2)}
            </div>
            <div className="comment__item-body">
                <strong className="username">
                    {name}
                </strong>
                <p className="body">
                    {body}
                </p>
            </div>
        </div>
    );
};

export default Comment;