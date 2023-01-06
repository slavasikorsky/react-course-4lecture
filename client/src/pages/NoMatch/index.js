import React from 'react';
import Hero from '../../components/Hero';

import imageHero from '../../assets/images/404.jpg';

const NoMutch = () => {
    return (
        <div>
            <Hero image={imageHero} title='404 not found' />
        </div>
    );
};

export default NoMutch;