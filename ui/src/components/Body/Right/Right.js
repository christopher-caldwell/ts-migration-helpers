import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import Ships from './Ships'
import Squadrons from './Squadrons'
import Objectives from './Objectives'
import Commander from './Upgrades/Commanders'
import WeaponsTeam from './Upgrades/WeaponsTeam'
import Officer from './Upgrades/Officer';
import GenericUpgrade from "./Upgrades/GenericUpgrade";
import UniqueUpgrade from './Upgrades/UniqueUpgrade';
import OffensiveRetroFit from "./Upgrades/OffensiveRetrofit";
import '../../css/Cards.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Right extends Component {
    render(){
        const faction = "imperial";
        return (
            <React.Fragment>

            <div className="card-display span-3-of-4 desktop">
                <Switch>
                    <Route path={`/builder/imperial/ships`} render={() => <Ships click={this.props.click} shipInfo={this.props.shipInfo} points={this.props.points} faction={this.props.faction} upgradePoints={this.props.upgradePoints}/>} />
                    <Route path={`/builder/${faction}/squadrons`} render={() => <Squadrons faction={this.props.faction}/>}/>
                    <Route path={`/builder/${faction}/objectives/:objectiveType`} render={(routerProps) => <Objectives {...routerProps}/>}/>
                    <Route path={`/builder/imperial/:id/upgrades/commander`} render={(routeProps) => <Commander {...routeProps} faction={this.props.faction} commanderChosen={this.props.commanderChosen} shipInfo={this.props.shipInfo} upgrade={this.props.upgrade} points={this.props.points} upgradeCards={this.props.upgradeCards}/>}/>
                    <Route path={`/builder/${faction}/:id/upgrades/weapons-team`} exact render={(routeProps) => <WeaponsTeam {...routeProps} faction={this.props.faction} shipInfo={this.props.shipInfo} upgrade={this.props.upgrade} points={this.props.points} upgradePoints={this.props.upgradePoints} upgradeCards={this.props.upgradeCards}/>}/>
                    <Route path={`/builder/${faction}/:id/upgrades/officer`} exact render={(routeProps) => <Officer {...routeProps} faction={this.props.faction} shipInfo={this.props.shipInfo} upgrade={this.props.upgrade} points={this.props.points} upgradePoints={this.props.upgradePoints} upgradeCards={this.props.upgradeCards}/>}/>
                    <Route path={`/builder/${faction}/:id/upgrades/offensive-retrofit`} render={(routeProps) => <OffensiveRetroFit {...routeProps} faction={this.props.faction} shipInfo={this.props.shipInfo} upgrade={this.props.upgrade} points={this.props.points} upgradePoints={this.props.upgradePoints} upgradeCards={this.props.upgradeCards}/>}/>
                    <Route path={`/builder/${faction}/:id/upgrades/offensive-retrofit-2`} render={(routeProps) => <OffensiveRetroFit {...routeProps} faction={this.props.faction} shipInfo={this.props.shipInfo} upgrade={this.props.upgrade} points={this.props.points} upgradePoints={this.props.upgradePoints} upgradeCards={this.props.upgradeCards}/>}/>
                    <Route path={`/builder/${faction}/:id/upgrades/title`} exact render={(routeProps) => <UniqueUpgrade {...routeProps} faction={this.props.faction} shipInfo={this.props.shipInfo} upgrade={this.props.upgrade} points={this.props.points} upgradePoints={this.props.upgradePoints} upgradeCards={this.props.upgradeCards}/>}/>
                    <Route path={`/builder/${faction}/:id/upgrades/experimental-retrofit`} exact render={(routeProps) => <UniqueUpgrade {...routeProps} faction={this.props.faction} shipInfo={this.props.shipInfo} upgrade={this.props.upgrade} points={this.props.points} upgradePoints={this.props.upgradePoints} upgradeCards={this.props.upgradeCards}/>}/>
                    <Route path={`/builder/${faction}/:id/upgrades/fleet-command`} render={(routeProps) => <UniqueUpgrade {...routeProps} faction={this.props.faction} shipInfo={this.props.shipInfo} upgrade={this.props.upgrade} points={this.props.points} upgradePoints={this.props.upgradePoints} upgradeCards={this.props.upgradeCards}/>}/>
                    <Route path={`/builder/${faction}/:id/upgrades/:upgradeType`}  render={(routeProps) => <GenericUpgrade {...routeProps}  faction={this.props.faction} shipInfo={this.props.shipInfo} upgrade={this.props.upgrade} points={this.props.points} upgradePoints={this.props.upgradePoints}/>}/>
                </Switch>
            </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        faction: state.faction
    }
};
export default withRouter(connect(mapStateToProps)(Right));