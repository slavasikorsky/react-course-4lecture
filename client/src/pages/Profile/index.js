import React from 'react';
import DashboardContent from '../../components/DashboardContent';
import UserData from '../../components/UserData';
import BgImage from '../../assets/images/icons/user-placeholder.jpg';

import './Profile.scss';

const Profile = () => {
    return (
        <DashboardContent>
            <h1>Profile</h1>
            <div className={'profile-content'}>
                <img src={BgImage} className={'profile-bg-image'} alt='profile-bg' />
                <UserData classname={'profile--page'}/>
            </div>
        </DashboardContent>
    );
};

export default Profile;