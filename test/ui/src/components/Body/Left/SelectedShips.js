import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions';

class selectedShips extends Component {
    constructor(props) {
        super(props);
    }

    deleteShip = (ship) => {
        this.props.delete(ship);
    };

    deleteUpgrade = (ship, upgrade) => {
        this.props.upgradeDelete(ship.id, upgrade.set, upgrade.title)
    };

    toggleHandler = (id) => {
        const shipIndex = this.props.shipInfo.findIndex(index => {
            return index.id === id
        });
        const newShips = [...this.props.shipInfo];
        newShips[shipIndex].upgradesShown = !newShips[shipIndex].upgradesShown;
        this.props.toggle(newShips);
    };

    //try adding if upgrade is equipped, change icon color or something
    render() {

        return (
            <div className="selected-ships">
                <div className="chosen-cards-container">
                    {this.props.shipInfo.map(ship => {
                        return (
                            <div className="chosen-ship-container">
                                <div key={ship.id} className="chosen-ship">
                                    <div className="span-4-of-12 ship-img">
                                        <img src={ship.imagePath} alt={ship.title}/>
                                    </div>
                                    <div className={"span-7-of-12 ship-name"}
                                         onClick={this.toggleHandler.bind(this, ship.id)}>{ship.name}</div>
                                    <div className="delete far fa-trash-alt" onClick={this.deleteShip.bind(this, ship)}/>
                                </div>
                                <div className="upgrade-bar" key={`${ship.id}-upgradeBar`}>
                                    {Object.keys(ship.upgrades).map(upgradeType => {
                                        if (ship.upgradesShown) {
                                                    return (
                                                        <Link to={`/builder/${this.props.faction}/${ship.id}/upgrades/${upgradeType}`} onClick={this.props.hideLeftMenu}>
                                                            <button>
                                                                <img src={`/images/icons/${upgradeType}.png`}
                                                                     alt="upgrade icon"/>
                                                            </button>
                                                        </Link>
                                                    )
                                                }
                                            })

                                        }
                                </div>
                                <div className="equipped-upgrades">
                                    {Object.values(ship.upgrades).map(upgrade => {
                                        if (upgrade != null){
                                            return (
                                                <div className="assigned-upgrade">
                                                    <div className="col span 4-of-12 upgrade-img-container">
                                                        <img src={`/images/cards/upgrades/${upgrade.set}/${upgrade.image}`} alt="upgrade" className="upgrade-img"/>
                                                    </div>
                                                    <div className="col span 7-of-12 upgrade-name">
                                                        {upgrade.title}
                                                    </div>
                                                    <div className="delete-upgrade far fa-trash-alt" onClick={this.deleteUpgrade.bind(this, ship, upgrade)}/>
                                                </div>
                                            )
                                        }

                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )

    }


};

const mapStateToProps = state => {
    return {
        chosenShips: state.ships
    }
};

export default withRouter(connect(mapStateToProps, actions)(selectedShips));