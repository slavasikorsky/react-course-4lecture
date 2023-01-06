import React from 'react';

import './DashboardContent.scss';

const DashboardContent = ({children, ...rest}) => {
    return (
        <div className="dashboard-content" {...rest}>
            {children}
        </div>
    );
};

export default DashboardContent;