import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Link } from 'react-router-dom';
import '../css/Profile.css';
import MobileShowFleet from './MobileShowFleet';
import DesktopShowFleet from './DesktopShowFleet';

class ShowFleet extends Component {

    componentDidMount() {
        this.props.fetchFleet();
    }

    render(){
        let propFleet = this.props.ships;
        let targetIndex = null;
        let targetFleet = null;
        if (propFleet !== null) {
             targetIndex = propFleet.findIndex(indFleet => {
                return indFleet._id === this.props.match.params.fleetId;
            });
             targetFleet = propFleet[targetIndex]
        }
        if (targetFleet !== null){
            return (
                <React.Fragment>
                    <MobileShowFleet targetFleet={targetFleet}/>
                    <DesktopShowFleet targetFleet={targetFleet}/>
                </React.Fragment>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}


const mapStateToProps = state => {
    return {
        ships: state.fleets
    }
};
export default connect(mapStateToProps, actions)(ShowFleet);