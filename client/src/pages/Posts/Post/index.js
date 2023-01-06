import React, { useState } from 'react';

import './Post.scss';

const Post = (props) => {
    const [toggleMenu, setToggleMenu] = useState(false);

    const editHandler = (e, id) => {
        e.stopPropagation();
        setToggleMenu(false);
        props.onEdit(id);
    }

    const deleteHandler = (e, id) => {
        e.preventDefault();
        setToggleMenu(false);
        props.onDelete(id);
    }

    const toggleHandler = (e) => {
        e.preventDefault();
        setToggleMenu(!toggleMenu);
    }

    return (
        <li className="post">
            <span className="post-field">{props.title}</span> 
            <span className={`post-field ${props.status}`}><span>{props.status}</span></span>
            <span className="post-field data"><span>{props.date}</span></span>
            <span className="post-field">{props.author}</span>
            <button 
                className="toggle-menu"
                onClick={(e)=>toggleHandler(e)}
            >
                ...
            </button>
            {toggleMenu && 
                <div className="menu">
                    <div className="menu-content">
                        <button onClick={(e)=>editHandler(e, props.id)}>Edit</button>
                        <button onClick={(e)=>deleteHandler(e, props.id)}>Delete</button>
                    </div>
                </div>
            }
        </li>
    );
};

export default Post;