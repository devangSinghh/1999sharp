import React from 'react'
import Helmet from 'react-helmet'

const Title = ({ title }) => {
    var defaultTitle = '1999Sharp'
    return (
        <Helmet>
            <title>{title ? title : defaultTitle}</title>
        </Helmet>   
    );
};

export default Title