import React from 'react';

class WeaponsTeam extends React.Component {
    constructor(props) {
        super()
    }

    addUpgradeHandler = (card) => {
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
        upgrades[upgradeType] = card;

        this.props.upgrade(newShips, card);
    };

    render() {
        const shipIndex = this.props.shipInfo.findIndex(index => {
            return index.id === this.props.match.params.id
        });
        const newShips = [...this.props.shipInfo];

        //making cards to display
        const weaponsCards = [];
        this.props.upgradeCards.forEach(card => {
            if (card.set === "weapons-team") {
                if (!card.faction || card.faction === "imperial") {
                    if (newShips[shipIndex] && newShips[shipIndex].dual === true) {
                        weaponsCards.push(card);
                    } else if (!card.dual) {
                        weaponsCards.push(card);
                    }
                }
            }
        });

        return (
            <div>
                {weaponsCards.map(card => {
                    return (
                        <div className="ship-card span-1-of-3" key={card.id}>
                            <div className="upgrade-img-cont">
                                <img src={`/images/cards/upgrades/weapons-team/small-${card.image}`}
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

export default WeaponsTeam;