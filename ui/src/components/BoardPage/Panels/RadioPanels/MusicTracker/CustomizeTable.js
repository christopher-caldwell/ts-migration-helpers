import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { closeModal } from 'stores/preferences/preferencesActions';
import CustomizeTableModal from './CustomizeTableModal/CustomizeTableModal';

const CustomizeTable = props => {
    const {
        preferences: { show },
        match,
    } = props;
    return (
        show && (
            <div className="customize-table">
                <CustomizeTableModal match={match} />
            </div>
        )
    );
};

const mapStateToProps = state => ({
    preferences: state.preferences,
});

CustomizeTable.propTypes = {
    closeModalAction: PropTypes.func.isRequired,
    match: PropTypes.shape().isRequired,
    preferences: PropTypes.shape().isRequired,
};

const mapDispatchToProps = {
    closeModalAction: closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeTable);
