import React from 'react';
import loaderImage from '../../assets/images/loader.png';
import './Loader.scss'

const Loader = () => {
    return (
        <img className="loader" src={loaderImage} alt="loading..." />
    );
};

export default Loader;