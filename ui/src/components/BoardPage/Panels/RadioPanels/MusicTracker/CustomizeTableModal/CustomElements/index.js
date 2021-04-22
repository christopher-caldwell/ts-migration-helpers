import React from 'react';
import CompetitorSpins from './CompetitorSpins';

const buildCustomComponent = (elementName, props) => {
    switch (elementName) {
        case 'CompetitorSpins': {
            return <CompetitorSpins {...props} />;
        }
        default:
            return null;
    }
};

export default buildCustomComponent;
