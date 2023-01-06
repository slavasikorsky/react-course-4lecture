import React from 'react';
import './Wrapper.scss';

const Wrapper = ({children, ...rest}) => {
    return (
        <div className="wrapper" {...rest}>
            {children}
        </div>
    );
};

export default Wrapper;