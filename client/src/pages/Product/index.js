import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CommentsList from '../../components/CommentsList';

import Container from '../../components/Container';
import Hero from '../../components/Hero';
import Loader from '../../helpers/Loader';

import './Product.scss';

const Product = () => {
    const API_URL = 'https://dummyjson.com';

    const [post, setPost] = useState([]);

    const location = useLocation();

    useEffect(() => {
        loadPost();
    },[]);

    const loadPost = () => {
        axios
            .get(API_URL + location.pathname)
            .then((res) => {
                setPost(res.data);
            })
            .catch((error) =>{
                console.log(error)
            });
    }

    return (
        <div className="post">
            <Hero image={post.thumbnail} title={post.title} />
            <Container>
                <div className="post-content">
                    <p>{post.description}</p>
                    <p>Price: {post.price}</p>
                    <div className="post-content__images">
                        {post.images && post.images.map((image, index) => (
                                <img src={image} key={index} alt={index} />
                            )
                        )}
                    </div>
                    <div className="post-info">
                        <p>Brand: {post.brand}</p>
                        <p>Category: {post.category}</p>
                    </div>
                </div>
                {post.id   
                    ? <CommentsList postID={post.id} />
                    : <Loader />
                }
            </Container>
        </div>
    );
};

export default Product;