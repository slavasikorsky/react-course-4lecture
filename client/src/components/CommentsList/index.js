import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';

const CommentsList = (props) => {
    const API_URL = 'https://dummyjson.com/comments/post/';

    const [comments, setComments] = useState([]);
    const [postID, setPostID] = useState(props.postID);
    const [limit, setLimit] = useState(1);

    useEffect(() => {
        loadComments();
    },[]);

    const loadComments = () => {
        axios
            .get(API_URL + postID)
            .then((res) => {
                setComments(res.data.comments);
            })
            .catch((error) =>{
                console.log(error)
            });
    }

    const loadAllComments = () => {
        setLimit(comments.length);
    }


    return (
        <div>
        {(comments.length>0)
            ? (
                <div className="comments">
                    <div className="comments-count">
                        Comments: {comments.length}
                    </div>
                    {comments && (
                        comments.map((item, index) => (
                            (index<limit)
                                ? <Comment
                                    key={index}
                                    name={item.user.username}
                                    body={item.body}
                                />
                                : false
                        ))
                    )
                    }
                    {limit === comments.length
                        ? false
                        : <span className="load-comments" onClick={loadAllComments}>Show more {comments.length-1} comments</span>
                    }
                </div>
            )
            : <p>Comments not found</p>
        }
    </div>
    )
}

export default CommentsList;