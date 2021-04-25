import { connect } from 'react-redux';

import PropTypes from 'prop-types';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'features' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'features' implicitly has an 'any'... Remove this comment to see the full error message
const FeatureToggle = ({ features, featureName, children, fallback = null }) => {
    const system = features.system[featureName];
    const station = features.station[featureName];
    const showContent = (system || station || {}).Enabled;

    // When has Feature Toggle by system and station with the same name
    const hasFeatureByStation =
        system && Object.prototype.hasOwnProperty.call(system, 'FeatureByStation')
            ? system.FeatureByStation
            : false;

    if (hasFeatureByStation) {
        if (system.Enabled && station && station.Enabled) {
            return children;
        }
        return fallback;
    }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    return showContent ? children : fallback;
};

FeatureToggle.propTypes = {
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'featureToggle' implicitly has an ... Remove this comment to see the full error message
    featureName: PropTypes.string.isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    features: PropTypes.shape().isRequired,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'featureToggle' implicitly has an ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    children: PropTypes.node,
};

const mapStateToProps = ({ featureToggle }) => ({ features: featureToggle });

export default connect(mapStateToProps)(FeatureToggle);
