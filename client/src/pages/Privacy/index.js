import React, { useContext } from 'react';
import DashboardContent from '../../components/DashboardContent'
import { AuthContext } from '../../context/auth';
import Hero from '../../components/Hero';
import Container from '../../components/Container';

import data from '../../assets/data/privacy';
import HeroImage from '../../assets/images/privacy.jpg';
import './Privacy.scss';

const Privacy = () => {
    const { user } = useContext(AuthContext);
    const htmlContent = data.text;

    return (
        (user ?
            <DashboardContent>
                <div className={'privacy-dashboard-content'}>
                    <h1>Privacy policy</h1>
                    <div className={'text'} dangerouslySetInnerHTML={{ __html: htmlContent }} ></div>
                </div>
            </DashboardContent>
            : <>
                <Hero title={'Privacy Policy'} image={HeroImage} />
                <Container>
                    <div className={'privacy-content'}>
                        <div className={'text'} dangerouslySetInnerHTML={{ __html: htmlContent }} ></div>
                    </div>
                </Container>
            </>
        )
    );
};

export default Privacy;