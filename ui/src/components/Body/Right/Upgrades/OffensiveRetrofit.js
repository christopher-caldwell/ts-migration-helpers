import React from 'react';

class OffensiveRetroFit extends React.Component {

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

    render(){
        let upgradeCards = this.props.upgradeCards;
        let offensiveCards = [];
        upgradeCards.forEach(card => {
            if (card.set === "offensive-retrofit"){
                // console.log(card);
                if (!card.faction || card.faction === "imperial"){
                    offensiveCards.push(card);
                }
            }
        });
        return (
            <div>
                {offensiveCards.map((card) => {
                        return (
                            <div className="ship-card span-1-of-3" key={card.id}>
                                <div className="upgrade-img-cont">
                                    <img src={`/images/cards/upgrades/offensive-retrofit/small-${card.image}`} alt={card.title} onClick={this.addUpgradeHandler.bind(this, card)}/>
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
};

export default OffensiveRetroFit;