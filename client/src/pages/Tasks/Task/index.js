import React, { useState } from 'react';
import Delete from '../../../components/UI/Delete';
import Edit from '../../../components/UI/Edit';
import Input from '../../../components/UI/Input';
import Pin from '../../../components/UI/Pin';
import Star from '../../../components/UI/Star';

import './Task.scss';

const Task = (props) => {
    const [pinned, setPinned] = useState(false);
    const [done, setDone] = useState(false);
    const [edit, setEdit] = useState(props.edit);

    const [editedName, setEditedName] = useState(props.name);

    const submitHandler = (e, id, name) => {
        e.preventDefault();
        editedName
            ? props.onUpdate(id, name)
            : alert('Please enter name');
        setEdit(false);
    }

    return (
        <li 
            key={props.index} 
            className={`task ${ done ? `done` : ''} ${ pinned ? `pinned` : ''}`}
        >
            <button onClick={() => setDone(!done)}>
                <Star fill={`${ done ? '#FFD700' : '#919294'}`} />
            </button>
            {edit 
                ? <form onSubmit={(e)=>submitHandler(e, props.id, editedName)}>
                    <Input 
                    className={'edit-input'}
                        type="text" 
                        name={props.id} 
                        value={editedName} 
                        onChange={(e)=> setEditedName(e.target.value)} 
                    />
                  </form>
                : <span>{props.name}</span>
            }
            <div className="panel">
                <button onClick={() => setPinned(!pinned)}>
                    <Pin />
                </button>
                <button onClick={() => setEdit(!edit)}>
                    <Edit />
                </button>
                <button onClick={(e) => props.onRemove(e, props.id)}>
                    <Delete />
                </button>
            </div>
        </li>
    );
};

export default Task;