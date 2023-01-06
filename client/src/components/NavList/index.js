import React from 'react';
import NavItem from './NavItem';

import './NavList.scss';

const NavList = (props) => {
    const navLinks = props.data || [];

    return (
        <ul className={`navbar navbar--${props.direction}`}>
            {navLinks.map((item, index) => (
                <NavItem key={index} link={item.link} active={item.active}>
                    {item.title}
                </NavItem>
            ))}
        </ul>
    );
};

export default NavList;