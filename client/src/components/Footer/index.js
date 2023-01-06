import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../Container';
import Wrapper from '../Wrapper';
import FooterMenu from './FooterMenu';

import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Wrapper>
                    <div className="footer-text">
                        <Link to="/" className="footer-text__logo">My-app</Link>
                        <p className="footer-text__paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <span className="footer-text__copyright">©My-app 2022. All rights reserved</span>
                    </div>
                    <FooterMenu />
                </Wrapper>
            </Container>
        </footer>
    );
};

export default Footer;