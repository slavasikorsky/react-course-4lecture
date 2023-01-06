import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DashboardContent from '../../components/DashboardContent';
import Popup from '../../components/Popup';
import Input from '../../components/UI/Input';
import Textarea from '../../components/UI/Textarea';
import Form from '../../components/UI/Form';
import Post from './Post';

import './Posts.scss'
import Select from 'react-select';

const Posts = () => {
    const customStyles = {
        control: () => ({
            backgroundColor: '#BDB2FF',
            borderRadius: '10px',
            display: 'flex',
            fontSize: '16px',
            lineHeight: '20px',
            height: '50px',
            padding: '5px 10px',
            cursor: 'pointer',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#000',
        }),

        input: (provided) => ({
            ...provided,
            color: '#000',
        }),

        valueContainer: (provided) => ({
            ...provided,
            display: 'flex',
            flexFlow: 'nowrap',
        }),
    
        placeholder: (provided) => ({
            ...provided,
            color: '#000',
        }),
        indicatorSeparator:  () => ({
            display: 'none'
        }),
        menu: (provided)=> ({
            ...provided,
            backgroundColor: '#303033',
        })
      }

    const [error, setError] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const statusOptions = [
        { value: 'publish', label: 'publish' },
        { value: 'draft', label: 'draft' },
        { value: 'future', label: 'future' }
      ];
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Title',
            author: 'Admin',
            status: 'publish',
            date: '2022-01-02',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing'
        },
        {
            id: 2,
            title: 'Title another',
            author: 'User',
            status: 'draft',
            date: '2022-05-07',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing el'
        },
        {
            id: 3,
            title: 'Title 123',
            author: 'User',
            status: 'future',
            date: '2022-07-12',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing el'
        }
    ]);

    const [updatePost, setUpdatePost] = useState({});

    const submitHandler = (e, id) => {
        e.preventDefault();
        const title = e.target.title.value;
        const author = e.target.author.value;
        const date = e.target.date.value;
        const status = e.target.status.value;
        const text = e.target.text.value;

        if (title && author && date && status) {
            if (id) {
                const updatedPost = posts.map(post => (
                    post.id === id
                    ? { ...post, 
                        title: title,
                        author: author,
                        status: status,
                        date: date,
                        text: text
                    }
                    : post
                ));
                setPosts(updatedPost);
            } else {
                const newID = uuidv4();
                setPosts([...posts, {
                    id: newID,
                    title: title,
                    author: author,
                    status: status,
                    date: date,
                    text: text
                }]);
            }
            setError(false);
            setOpenPopup(false);
            setUpdatePost(false);
        } else {
            setError("Please fill all fields");
        }
    };

    const editHandler = (postId) => {
        setOpenPopup(!openPopup);
        const updated = posts.filter(post => post.id === postId);
        setUpdatePost(updated[0]);
    }

    const deleteHandler = (id) => {
        setPosts(posts.filter(post => post.id !== id))
    }

    return (
        <DashboardContent>
            <h1>Posts</h1>
            <div className="heading" style={{textAlign: 'right'}}>
                <button 
                    onClick={()=>setOpenPopup(!openPopup)}
                    className="new"
                >
                    New post
                </button>
            </div>
            {posts 
                ? <ul className="posts">
                    <li>
                        <span className="post-field">Title</span>
                        <span className="post-field">Status</span>
                        <span className="post-field">Data</span>
                        <span className="post-field">Author</span>
                    </li>
                    {posts.map((post, index) => (
                        <Post
                            key={index}
                            id={post.id} 
                            title={post.title}
                            author={post.author}
                            status={post.status}
                            date={post.date}
                            text={post.text}
                            onEdit={editHandler}
                            onDelete={deleteHandler}
                        />
                    ))}
                  </ul>
                : <p>Not found</p>
            }
            <Popup trigger={openPopup} setTtiger={setOpenPopup}>
                <Form onSubmit={(e)=>submitHandler(e, updatePost.id)}>
                    <h1>Create post</h1>
                    {error && <p className="error">{error}</p>}
                    <div className="row">
                        <Input 
                            className={'input purple'}
                            type={'text'} 
                            name={'title'} 
                            placeholder={'Title'} 
                            onChange={e=>setUpdatePost({...updatePost, title: e.target.value})} 
                            value={updatePost.title || ''} 
                        />
                        <Input 
                            type={'text'} 
                            className={'input purple'}
                            name={'author'} 
                            placeholder={'Author'} 
                            onChange={e=>setUpdatePost({...updatePost, author: e.target.value})}
                            value={updatePost.author || ''}
                        />
                    </div>
                    <div className="row">
                        <Select 
                            className={'select purple'}
                            styles={customStyles} 
                            name={'status'} 
                            onChange={e=>setUpdatePost({...updatePost, status: e.value})}
                            options={statusOptions}
                            isSearchable={false}
                            value={{ value: updatePost.status || 'Select:', label: updatePost.status || 'Select:' }}
                        />
                        <Input 
                            className={'input purple'}
                            type={'date'} 
                            name={'date'} 
                            placeholder={'Date'} 
                            onChange={e=>setUpdatePost({...updatePost, date: e.target.value})} 
                            value={updatePost.date || ''} 
                        />
                    </div>
                    <Textarea
                            className={'textarea purple'}
                            name={'text'} 
                            placeholder={'Text'} 
                            onChange={e=>setUpdatePost({...updatePost, text: e.target.value})} 
                            value={updatePost.text || ''} 
                    >
                    </Textarea>
                    <button type={'submit'} className={"button purple"}>Add</button>
                </Form>
            </Popup>
        </DashboardContent>
    );
};

export default Posts;