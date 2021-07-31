import React, { Component } from 'react';
import * as actions from '../../../../store/actions';
import { connect } from 'react-redux';


class Commander extends Component {
    constructor(props) {
        super(props);
    }

    reduxUpgrade = card => {
        // console.log(this.props);
        this.props.findUpgrades(card);
    };

    addUpgradeHandler = (card) => {
        const shipIndex = this.props.shipInfo.findIndex(index => {
            return index.id === this.props.match.params.id
        });
        const newShips = [...this.props.shipInfo];
        // const upgradeCards = [...this.props.upgradeCards];

        let clickedCard = card;
        let upgrades = newShips[shipIndex].upgrades;


        upgrades.commander = card;


        this.props.upgrade(newShips, clickedCard);
    };

    render() {
        let commanderCards = [];
        this.props.upgradeCards.forEach(card => {
            if (card.set === "commander" && card.faction === "imperial") {
                if (card.points < 400 - this.props.points) {
                    if (this.props.commanderChosen === false && card.available === true) {
                        commanderCards.push(card);
                    }
                }
            }
        });
        return (
            <div>
                {commanderCards.map(commander => {
                    return (
                        <div className="ship-card span-1-of-3" key={commander.id} onClick={this.reduxUpgrade.bind(this, commander)}>
                            <div className="upgrade-img-cont">
                                <img src={`/images/cards/upgrades/commander/small-${commander.image}`} alt={commander.title}
                                 onClick={this.addUpgradeHandler.bind(this, commander)}/>
                            </div>
                            <div className="upgrade-name-cont">
                                {commander.title}
                            </div>
                        </div>
                    )

                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {upgrades: state.availableUpgrades}
};
export default connect(mapStateToProps, actions)(Commander);