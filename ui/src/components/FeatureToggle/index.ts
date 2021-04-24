import { connect } from 'react-redux';

import PropTypes from 'prop-types';

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

    return showContent ? children : fallback;
};

FeatureToggle.propTypes = {
    featureName: PropTypes.string.isRequired,
    features: PropTypes.shape().isRequired,
    children: PropTypes.node,
};

const mapStateToProps = ({ featureToggle }) => ({ features: featureToggle });

export default connect(mapStateToProps)(FeatureToggle);
