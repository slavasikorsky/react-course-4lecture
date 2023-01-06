import React from 'react';

import './Hero.scss';
import placeholder from '../../assets/images/placeholder.png'

const Hero = (props) => {
    const image = props.image || placeholder;
    const title = props.title || false;
    const classes = title ? 'hero hero--gradient' : 'hero';
    return (
        <div className={classes}>
            <img src={image} alt="Hero banner" className="hero__image" />
            {title && (<h1 className="hero__title">{title}</h1>)}
        </div>
    );
};

export default Hero;