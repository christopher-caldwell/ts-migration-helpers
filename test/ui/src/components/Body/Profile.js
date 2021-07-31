import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import { Link, Redirect } from 'react-router-dom';
import '../css/Profile.css'

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            pending: false
        }
    }

    componentWillMount(){
        this.props.fetchFleet();
    }
    displayUser = () => {
        let name = '';
        if (this.props.user != null) {
            name = this.props.user.firstName;
        }
        switch (this.props.auth) {
            case null:
                return;
            default:
                return (
                    <div className="container">
                        <div className="jumbotron">
                            <h1>Hello, {name}</h1>
                        </div>
                    </div>

                )
        }
    };

    deleteShip = fleet => {
        this.setState({
            pending: true
        });
        
        fetch("/api/delete-fleet", {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "fleetId": fleet._id
            })
        }).then(() => {
            this.setState({pending: false});
            this.props.fetchFleet();
        }).catch(error => {console.log(error)});
    };
    displayFleets = () => {
        this.props.fetchFleet();
        switch (this.props.ships) {
            case null:
                return;
            default:
                return (
                    <div className="row">
                        <h2>Your Saved Fleets:</h2>
                        {this.props.ships.map(fleet => {
                            return (
                                <div className="col span-1-of-3">
                                    <div className="ind-fleet" key={fleet.id}>
                                        <div className="disp-fleet-name">
                                            <h4>{fleet.fleetName}</h4>
                                        </div>
                                        <div className="disp-buttons">
                                            <div className="buttons-cont">
                                                <Link to={`/profile/edit/${fleet._id}`}><button id="show-button">Show</button></Link>
                                                <button onClick={this.deleteShip.bind(this, fleet)} disabled={this.state.pending} className="far fa-trash-alt" id="delete-button"/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
        }
    };


    render() {

        let buildPrompt = null;
        if (this.props.ships !== null && this.props.ships.length === 0){
            buildPrompt = (
                <div>
                    <h1>You don't have any saved ships!</h1>
                    <p>Go <Link to={"/"}>here</Link> to get started!</p>
                </div>
                )

        }
        return (
            <div className={"content-container mobile-cont"}>
                {this.displayUser()}
                {buildPrompt}
                {this.displayFleets()}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth,
        ships: state.fleets
    }
};

export default connect(mapStateToProps, actions)(Profile);
