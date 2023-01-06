import React from 'react';

import './Textarea.scss';


const Textarea = ({name, value,className, placeholder, onChange}) => {
    return (
        <textarea 
            name={name} 
            className={className}
            value={value}
            placeholder={placeholder} 
            onChange={onChange}
        />
    );
};

export default Textarea;