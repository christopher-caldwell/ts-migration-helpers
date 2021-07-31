import React from 'react';

// import {cards.js} from '../../../../data/cards.js.js'

class Upgrade extends React.Component {
    constructor(props) {
        super();
    }

    addUpgradeHandler = (givenCard) => {

        //defining which ship to grab
        const newShips = [...this.props.shipInfo];
        const shipIndex = newShips.findIndex(index => {
            return (index.id === this.props.match.params.id);
        });
        const upgrades = newShips[shipIndex].upgrades;
        // const stateGivenCards = [...this.props.upgradeCards];

        //getting the type of upgrade from the url
        const path = this.props.match.path.split("/");
        const upgradeType = path[path.length - 1];

        //equipping card
        upgrades[upgradeType] = givenCard;

        this.props.upgrade(newShips, givenCard);
    };

    render() {

        const shipIndex = this.props.shipInfo.findIndex(index => {
            return index.id === this.props.match.params.id
        });
        const newShips = [...this.props.shipInfo];
        const targetShip = newShips[shipIndex];
        const path = this.props.match.path.split("/");
        // const temp = path.split("/");
        const upgradeType = path[path.length - 1];

        const typeCards = [];
        //building array to map over
        this.props.upgradeCards.forEach(card => {
            if (card.set === upgradeType && card.points < 400 - this.props.points) {
                if (card.set === "title"){
                    card.ship.forEach(typeShipAccepted => {
                        if (targetShip && targetShip.type === typeShipAccepted) {
                            typeCards.push(card);
                        }
                    })
                } else {
                    typeCards.push(card);
                }
            }
            });


        return (
            <div>
                {typeCards.map(card => {
                    return (
                        <div className="ship-card span-1-of-3" key={card.id}>
                            <div className="upgrade-img-cont">
                                <img src={`/images/cards/upgrades/${upgradeType}/small-${card.image}`}
                                     alt={card.title}
                                     onClick={this.addUpgradeHandler.bind(this, card)}/>
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

export default Upgrade;