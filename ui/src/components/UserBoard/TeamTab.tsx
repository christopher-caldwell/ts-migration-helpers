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
    constructor(props) {
        super(props);
        this.state = {
            searchedTeams: [],
            selectedTeam: {},
            showModal: false,
        };
    }

    componentDidMount = () => this.props.getTeams();

    handleModalClose = () => this.setState({ showModal: false, selectedTeam: {} });

    handleModalOpen = team => this.setState({ showModal: true, selectedTeam: team });

    returnSearchedTeams = newSearchedTeams => this.setState({ searchedTeams: newSearchedTeams });

    renderTeamCards = () => {
        const {
            userBoardReducer: { allTeams },
        } = this.props;
        const { searchedTeams } = this.state;
        let teams = allTeams;
        if (searchedTeams && searchedTeams.length) teams = searchedTeams;

        return sortTeams(teams).map(team => (
            <TeamCard
                handleModalOpen={this.handleModalOpen}
                isRole={team.hasRole}
                key={team.teamId}
                team={team}
            />
        ));
    };

    render() {
        const { showModal, selectedTeam } = this.state;
        const {
            userBoardReducer: { loading },
        } = this.props;

        if (loading) return <LoadingIndicator />;
        return (
            <div className="permission-container">
                <UserBoardHeader returnSearchedTeams={this.returnSearchedTeams} boardType="team" />
                <h4 className="admin-sub-heading">Teams</h4>
                <div id="PanelGroup" className="panel-container">
                    {this.renderTeamCards()}
                </div>
                {showModal && (
                    <TeamModal
                        handleModalClose={this.handleModalClose}
                        selectedTeam={selectedTeam}
                        newTeam={false}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ userBoardReducer }) => ({ userBoardReducer });
const mapDispatchToProps = dispatch => ({
    getTeams: () => dispatch(fetchAllTeams()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TeamTab);

TeamTab.propTypes = {
    getTeams: PropTypes.func.isRequired,
    userBoardReducer: PropTypes.shape().isRequired,
};
