import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import { fetchAllTeams } from 'stores/userBoard/userBoardActions';
import { sortTeams } from 'utils/SortFunctions';
import UserBoardHeader from './UserBoardHeader';
import TeamCard from './TeamCard';
import TeamModal from './TeamModal';

class TeamTab extends Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getTeams' does not exist on type 'Readon... Remove this comment to see the full error message
        super(props);
        this.state = {
            searchedTeams: [],
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getTeams' does not exist on type 'Readon... Remove this comment to see the full error message
            selectedTeam: {},
            showModal: false,
        };
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
    componentDidMount = () => this.props.getTeams();

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchedTeams' does not exist on type 'R... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
    handleModalClose = () => this.setState({ showModal: false, selectedTeam: {} });

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newSearchedTeams' implicitly has an 'an... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showModal' does not exist on type 'Reado... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
    handleModalOpen = team => this.setState({ showModal: true, selectedTeam: team });

    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ returnSearchedTeams: (newSearchedTeams: an... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchedTeams' does not exist on type 'R... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newSearchedTeams' implicitly has an 'an... Remove this comment to see the full error message
    returnSearchedTeams = newSearchedTeams => this.setState({ searchedTeams: newSearchedTeams });

    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleModalClose: () => void; selectedTeam... Remove this comment to see the full error message
    renderTeamCards = () => {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'showModal' does not exist on type 'Reado... Remove this comment to see the full error message
            userBoardReducer: { allTeams },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchedTeams' does not exist on type 'R... Remove this comment to see the full error message
        } = this.props;
        const { searchedTeams } = this.state;
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ returnSearchedTeams: (newSearchedTeams: an... Remove this comment to see the full error message
        let teams = allTeams;
        if (searchedTeams && searchedTeams.length) teams = searchedTeams;

        return sortTeams(teams).map(team => (
            <TeamCard
                handleModalOpen={this.handleModalOpen}
                isRole={team.hasRole}
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleModalClose: () => void; selectedTeam... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'showModal' does not exist on type 'Reado... Remove this comment to see the full error message
                key={team.teamId}
                team={team}
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
            />
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
        ));
    };

    render() {
        const { showModal, selectedTeam } = this.state;
        const {
            userBoardReducer: { loading },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        } = this.props;

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ returnSearchedTeams: (newSearchedTeams: an... Remove this comment to see the full error message
        if (loading) return <LoadingIndicator />;
        return (
            <div className="permission-container">
                <UserBoardHeader returnSearchedTeams={this.returnSearchedTeams} boardType="team" />
                <h4 className="admin-sub-heading">Teams</h4>
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleModalClose: () => void; selectedTeam... Remove this comment to see the full error message */}
                <div id="PanelGroup" className="panel-container">
                    {this.renderTeamCards()}
                </div>
                {showModal && (
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
                    <TeamModal
                        handleModalClose={this.handleModalClose}
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
                        selectedTeam={selectedTeam}
                        newTeam={false}
                    />
                )}
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
const mapStateToProps = ({ userBoardReducer }) => ({ userBoardReducer });
const mapDispatchToProps = dispatch => ({
    getTeams: () => dispatch(fetchAllTeams()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TeamTab);

TeamTab.propTypes = {
    getTeams: PropTypes.func.isRequired,
    userBoardReducer: PropTypes.shape().isRequired,
};
