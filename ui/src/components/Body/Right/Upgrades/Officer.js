import React from 'react';
// import {upgradeCards} from '../../../../data/cards.js'

class Officer extends React.Component {

    constructor(props) {
        super();
    }

    addUpgradeHandler = (givenCard) => {

        //defining which ship to grab
        const shipIndex = this.props.shipInfo.findIndex(index => {
            return (index.id === this.props.match.params.id);
        });
        const newShips = [...this.props.shipInfo];
        const upgrades = newShips[shipIndex].upgrades;
        const stateGivenCards = [...this.props.upgradeCards];

        //equipping card
        upgrades.officer = givenCard;

        //building array to map over and change equipped status

        //creates array of upgrade cards
        let equippedUpgrades = [];
        newShips.forEach(ship => {
            Object.values(ship.upgrades).forEach(upgrade => {
                if (upgrade) {
                    equippedUpgrades.push(upgrade);
                }
            });
        });

        let titleUpgrades = [];
        equippedUpgrades.forEach(upgrade => {
            if (upgrade.set === "officer" && upgrade.unique === true) {
                titleUpgrades.push(upgrade);
            }
        });

//adding up the points every time a ship is added
        let counter = 0;
        newShips.forEach(ship => {
            counter += ship.points;
            Object.values(ship.upgrades).forEach(upgrade => {
                if (upgrade != null) {
                    counter+= upgrade.points;
                }
            });
        });
        this.props.upgrade(newShips, counter, stateGivenCards, givenCard);
    };

    render(){

        const shipIndex = this.props.shipInfo.findIndex(index => {
            return index.id === this.props.match.params.id
        });
        const newShips = [...this.props.shipInfo];
        const targetShip = newShips[shipIndex];
        const stateGivenCards = [...this.props.upgradeCards];

        if (targetShip){
            console.log(targetShip);
        }
        let officerCards = [];
        stateGivenCards.forEach(card => {
            if (card.set === "officer"){
                if (!card.faction || card.faction === "imperial"){
                    if (card.title === "Strategic Adviser"){
                        if (targetShip && targetShip.size === "large"){
                            officerCards.push(card);
                        } else {
                            return;

                        }

                    }else{
                        officerCards.push(card);
                    }
                }
            }
        });
        return (
            <div>
                {officerCards.map((card) => {
                        return (
                            <div className="ship-card span-1-of-3" key={card.id}>
                                <div className="upgrade-img-cont">
                                    <img src={`/images/cards/upgrades/officer/small-${card.image}`} alt={card.title} onClick={this.addUpgradeHandler.bind(this, card)}/>
                                </div>
                                <div className="upgrade-name-cont">
                                    {card.title}
                                </div>
                            </div>
                        )
                })}
            </div>
        )
    }
}

export default Officer;