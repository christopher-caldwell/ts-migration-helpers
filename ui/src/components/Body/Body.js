import React, { Component } from 'react';
import uniqueCards from '../../data/UniqueCards';
import Left from './Left/Left'
import Right from './Right/Right'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import {Link} from "react-router-dom";
import MobileLeft from "./Left/MobileLeft";
import MobileRight from "./Right/MobileRight";
import '../css/Mobile.css';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedShips: [],
            totalPoints: 0,
            maxAllowablePoints: 400,
            upgrades: [...uniqueCards],
            commanderChosen: false,
            faction: this.props.match.params.faction,
            fleetName: ''
        };
        this.upgradeCards = [...uniqueCards];
    }

    componentDidMount(){
        this.props.findFaction(this.props.match.params.faction);
    }

    addShip = (updatedSelectedShips, newTotalPoints) => {
        this.setState(
            {
                selectedShips: updatedSelectedShips,
                totalPoints: newTotalPoints
            }
        );
    };

    //deleting ships and accounting for the points deduction
    deleteShipHandler = (ship) => {
        //checking index position to target specific ship
        const shipIndex = this.state.selectedShips.findIndex(index => {
            return index.id === ship.id
        });
        const individualShip = {
            ...this.state.selectedShips[shipIndex]
        };
        // const upgradeCards = [...this.state.upgrades];
        const ships = [...this.state.selectedShips];
        ships[shipIndex] = individualShip;
        let commanderChosen = this.state.commanderChosen;

        ships.splice(shipIndex, 1);
        let upgrades = [...this.upgradeCards];
        let uniqueCards = [...upgrades];
        //use this to set values of equipped to true
            ships.forEach(ship => {
                Object.values(ship.upgrades).forEach(upgrade => {
                    if (upgrade){
                        uniqueCards.forEach((card, index) => {
                            if (card.title === upgrade.title && card.unique) {
                                if (upgrade.title === "Darth Vader"){
                                        if (card.title === upgrade.title){
                                            upgrade.equipped = false;
                                            upgrade.available = true;
                                        }
                                }
                                uniqueCards.splice(index, 1);
                            }
                        })
                    }

                })

        });
        Object.values(individualShip.upgrades).forEach(upgrade => {
            if (upgrade && upgrade.set === "commander") {
                    commanderChosen = false;
            }
        });

        //points calculation based on state
        let counter = 0;
        ships.forEach(ship => {
            //add all ship points
            counter += ship.points;
            Object.values(ship.upgrades).forEach(upgrade => {
                if (upgrade) {
                    //add all upgrades assigned to ships
                    counter += upgrade.points;
                }

            });
        });
        // console.log(this.state.selectedShips)
        this.setState({
            selectedShips: ships,
            totalPoints: counter,
            commanderChosen: commanderChosen,
            upgrades: uniqueCards
        });
    };

    deleteUpgradeHandler = (id, upgradeType, upgradeTitle) => {
        //checking index position to target specific ship
        const shipIndex = this.state.selectedShips.findIndex(index => {
            return index.id === id
        });
        const individualShip = {
            ...this.state.selectedShips[shipIndex]
        };

        const ships = [...this.state.selectedShips];
        // instantiating upgrades to choose from
        let uniqueCards = [...this.upgradeCards];
        ships[shipIndex] = individualShip;
        individualShip.upgrades[upgradeType] = null;

        let commanderChosen = this.state.commanderChosen;
        if (upgradeType === "commander") {
            commanderChosen = false;
        }


        let equippedUpgrades = [];
        //points calculation based on state
        let counter = 0;
        ships.forEach(ship => {
            //add all ship points
            counter += ship.points;
            Object.values(ship.upgrades).forEach(upgrade => {
                if (upgrade) {
                    equippedUpgrades.push(upgrade);
                    //add all upgrades assigned to ships
                    counter += upgrade.points;
                }
            })
        });

        equippedUpgrades.forEach(upgrade => {
            uniqueCards.forEach((card, index) => {
                if (card.title === upgrade.title) {
                    if (card.unique === true) {
                        console.log(card);
                        uniqueCards.splice(index, 1);
                    }
                }
            })
        });

        this.setState({
            selectedShips: ships,
            totalPoints: counter,
            upgrades: uniqueCards,
            commanderChosen: commanderChosen

        });
    };

    upgradeToggleHandler = (upgradeState) => {
        this.setState({
            selectedShips: upgradeState
        })
    };

    upgradeAddHandler = (upgradedState, clickedUpgrade) => {

        let commanderChosen = this.state.commanderChosen;
        if (clickedUpgrade.set === "commander") {
            commanderChosen = true;
        }

        const ships = [...this.state.selectedShips];
        let equippedUpgrades = [];
        ships.forEach(ship => {
            Object.values(ship.upgrades).forEach(upgrade => {
                if (upgrade) {
                    equippedUpgrades.push(upgrade);
                }
            })
        });


        let uniqueCards = [...this.upgradeCards];
        equippedUpgrades.forEach(upgrade => {
            uniqueCards.forEach((card, index) => {
                if (card.title === upgrade.title) {
                    if (card.unique === true) {
                        uniqueCards.splice(index, 1);
                    }
                }
            })
        });
        if (clickedUpgrade.title === "Darth Vader") {
            uniqueCards.forEach((card, index) => {
                if (clickedUpgrade.title === card.title) {
                    uniqueCards.splice(index, 1)
                }
            })
        }

        //adding up the points every time a ship is added
        let counter = 0;
        ships.forEach(ship => {
            counter += ship.points;
            Object.values(ship.upgrades).forEach(upgrade => {
                if (upgrade) {
                    counter+= upgrade.points;
                }
            });
        });
        this.setState(() => {
            return {
                selectedShips: upgradedState,
                totalPoints: counter,
                upgrades: uniqueCards,
                commanderChosen: commanderChosen
            }
        });
    };

    nameChangeHandler = (event) => {
        this.setState({
            fleetName: event
        });
    };

    render() {
        return (
            <React.Fragment>
            <main>
                <Left shipInfo={this.state.selectedShips} upgradeDelete={this.deleteUpgradeHandler}
                      points={this.state.totalPoints} delete={this.deleteShipHandler} toggle={this.upgradeToggleHandler}
                      commanderCards={this.state.commanderCards} faction={this.state.faction} nameChange={this.nameChangeHandler} name={this.state.fleetName}/>
                <MobileLeft shipInfo={this.state.selectedShips} upgradeDelete={this.deleteUpgradeHandler}
                            points={this.state.totalPoints} delete={this.deleteShipHandler} toggle={this.upgradeToggleHandler}
                            commanderCards={this.state.commanderCards} faction={this.state.faction} nameChange={this.nameChangeHandler} name={this.state.fleetName}/>
                <Right click={this.addShip} shipInfo={this.state.selectedShips} points={this.state.totalPoints}
                       commanderChosen={this.state.commanderChosen} upgrade={this.upgradeAddHandler}
                       upgradeCards={this.state.upgrades} faction={this.state.faction}/>
                <MobileRight click={this.addShip} shipInfo={this.state.selectedShips} points={this.state.totalPoints}
                             commanderChosen={this.state.commanderChosen} upgrade={this.upgradeAddHandler}
                             upgradeCards={this.state.upgrades} faction={this.state.faction}/>
            </main>
            </React.Fragment>


        )
    }
}

// ask for the state pieces that are relevant here
const mapStateToProps = state => {
    return {
        faction: state.faction,
        maxAllowablePoints: state.maxAllowedPoints

    }
};
export default connect(mapStateToProps, actions)(Body);