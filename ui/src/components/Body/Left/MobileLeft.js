import React, { Component } from 'react';
import FleetDisplay from './FleetDisplay';
import Game from './Game'
import '../../css/Left.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import '../../css/Header.css';

class MobileLeft extends Component{

    // this both toggles the left menu, and hides the header
    toggleLeftMenu =() => {
        this.props.toggleLeftMenu();
        this.props.hideHeaderMenu();
        this.props.flagToggle()
    };

    render(){
        let style = "";
        let menuIcon = "fas fa-bars";
        let flagToggle = "";
        if (this.props.leftMenuShown){
            style = "menu-show-mobile";
            menuIcon = "fas fa-times";
            flagToggle = ""
        } else if (this.props.flagShown){
            flagToggle = "flagToggle";
        }
        else {
            style = ""
        }

        return (
            <React.Fragment>
                <div className={"mobile-selector"}>
                    <div className={`fas fa-flag notify ${flagToggle}`}/>
                    <div className={`toggle-selector-main mobile`} onClick={this.toggleLeftMenu}>
                        <span className={menuIcon}/>
                    </div>
                    <div className={`mobile-selector-container ${style} span-1-of-4 mobile`}>
                        <FleetDisplay points={this.props.points} faction={this.props.faction} nameChange={this.props.nameChange} name={this.props.name}/>
                        <Game commanderCards={this.props.commanderCards} faction={this.props.faction} shipInfo={this.props.shipInfo} delete={this.props.delete} toggle={this.props.toggle} upgradeDelete={this.props.upgradeDelete}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        menuShown: state.menuShown,
        leftMenuShown: state.leftMenuShown,
        flagShown: state.flagShown
    }
};
export default connect(mapStateToProps, actions)(MobileLeft);