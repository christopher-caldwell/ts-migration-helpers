import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { closeModal } from 'stores/preferences/preferencesActions';
import CustomizeTableModal from './CustomizeTableModal/CustomizeTableModal';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const CustomizeTable = props => {
    const {
        preferences: { show },
        match,
    } = props;
    return (
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ match: any; }' is not assignable to type '... Remove this comment to see the full error message
        show && (
            <div className="customize-table">
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type. */}
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ match: any; }' is not assignable to type '... Remove this comment to see the full error message */}
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                <CustomizeTableModal match={match} />
            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
            </div>
        )
    );
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const mapStateToProps = state => ({
    preferences: state.preferences,
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ match: any; }' is not assignable to type '... Remove this comment to see the full error message
CustomizeTable.propTypes = {
    closeModalAction: PropTypes.func.isRequired,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
    match: PropTypes.shape().isRequired,
    preferences: PropTypes.shape().isRequired,
};

const mapDispatchToProps = {
    closeModalAction: closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeTable);
