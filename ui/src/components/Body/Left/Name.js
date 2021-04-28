import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { UPDATE_NAME } from "../../../store/actions/types";

class Name extends Component {
    inputValueHandler = (event) => {
        this.props.updateName(event.target.value);
    };


    render() {


        return (
            <div className="row logo-container">
                <div className="row img-container">
                    <img src={`/images/home-page/${this.props.chosenFaction}-logo.png`} alt="logo"/>
                </div>
                <div className="name-cont">
                    <input type="text" name="fleet-name" onChange={this.inputValueHandler} value={this.props.fleetName} placeholder="Name your Fleet" id="fleet-name"/>
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        fleetName: state.fleetName,
        chosenFaction: state.faction
    }
};
export default connect(mapStateToProps, actions)(Name);