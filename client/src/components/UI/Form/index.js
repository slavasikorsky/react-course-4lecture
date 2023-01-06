import React from 'react';

import './Form.scss'

const Form = ({children, ...rest}) => {
    return (
        <form className="form" {...rest}>
            {children}
        </form>
    );
};

export default Form;