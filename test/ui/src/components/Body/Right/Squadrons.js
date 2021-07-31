import React, { Component } from 'react';
import {squadronCards} from '../../../data/cards.js'
import '../../css/Squadrons.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import SquadronTypeDropdown from './SquadronTypeDropdown';

class Squadrons extends Component{
    constructor(){
        super();
        this.state = {
            squadronTypeSearch: ""
        }
    }

    determineType = event => {
        this.setState({
            squadronTypeSearch: event.target.value
        })
    };

    render(){
        let searchType = this.state.squadronTypeSearch;
        let empireSquadrons = squadronCards.filter(squadron => {
            if (searchType !== ""){
                return squadron.faction === this.props.faction && squadron.type === searchType
            } else {
                return squadron.faction === this.props.faction
            }
        });


        return (
            <React.Fragment>
                <SquadronTypeDropdown determineType={this.determineType} squadTypeSelected={this.state.sq}/>
                <div className="squad-cards">
                    {empireSquadrons.map((squadron) => {
                        return (
                            <div className="squad-card span-1-of-3">
                                <img src={`/images/cards/squadron/imperial/small-${squadron.image}`} alt={squadron.title}
                                     onClick={this.props.addSquad.bind(this,squadron)}/>
                            </div>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        squadrons: state.chosenSquadrons
    }
};
export default connect(mapStateToProps, actions)(Squadrons);