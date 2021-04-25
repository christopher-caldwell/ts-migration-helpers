// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'elementName' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'elementName' implicitly has an 'any' ty... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
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
