import React from 'react';

import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';

import { EMPTY_VALUE_PLACEHOLDER } from 'utils/constants';
import objectGet from 'utils/objectGet';

class TierTrendCell extends React.PureComponent {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.any).isRequired,
        tierSpinsKey: PropTypes.string.isRequired,
        className: PropTypes.string,
        prefix: PropTypes.string,
        rowIndex: PropTypes.number,
    };

    static defaultProps = {
        className: null,
        prefix: 'metrics',
        rowIndex: undefined,
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tierSpinsValue' implicitly has an 'any'... Remove this comment to see the full error message
    buildTooltip(tierSpinsValue, tierSpinsKey) {
        const tierSpins = tierSpinsKey.match(/\d/g).join('');

        switch (tierSpinsValue) {
            case 'UP':
                return `TAA is predicted to increase by more than 1.3 points in
                approximately ${tierSpins} spins 6a-12m`;
            case 'SU':
                return `TAA is predicted to increase between .5 and 1.2 points in
                approximately ${tierSpins} spins 6a-12m`;
            case 'FL':
                return `TAA is predicted to remain between -.4 and +.4 points in
                approximately ${tierSpins} spins 6a-12m`;
            case 'SD':
                return `TAA is predicted to decrease between .5 and 1.2 points in
                approximately ${tierSpins} spins 6a-12m`;
            case 'DN':
                return `TAA is predicted to decrease more than 1.3 points in approximately
                ${tierSpins} spins 6a-12m`;
            default:
                return '';
        }
    }

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { data, rowIndex, tierSpinsKey, className, prefix } = this.props;
        const value = objectGet(data[rowIndex][prefix], tierSpinsKey);

        const arrowClassNames = classNames({ arrow: true, [`${value}`]: true });

        return (
            <span className={classNames('tier', className)} title={this.buildTooltip(value, tierSpinsKey)}>
                {value ? <span className={arrowClassNames} /> : EMPTY_VALUE_PLACEHOLDER}
            </span>
        );
    }
}

export default TierTrendCell;
