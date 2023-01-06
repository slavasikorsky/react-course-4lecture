import React from 'react';
import './NavItem.scss'
import { NavLink } from 'react-router-dom';

const NavItem = ({children, link}) => {

    return (
        <li className="navbar__item">
            <NavLink to={link} className={({isActive}) => isActive ? 'navbar__item-link navbar__item-link--active' : 'navbar__item-link'}>
                {children}
            </NavLink>
        </li>
    );
};

export default NavItem;