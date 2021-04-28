import React from 'react';
import {objectiveCards} from '../../../data/cards.js'

class Objectives extends React.Component {

    render() {
        const objType = this.props.match.params.objectiveType;
        let selectedObjectiveCards = [];
        objectiveCards.forEach(card => {
            if (card.set === objType) {
                selectedObjectiveCards.push(card);
            }
        });

        return (
            <div className="cards-container">
                {selectedObjectiveCards.map(card => {
                    return (
                        <div className="squad-card span-1-of-3">
                            <img key={card.id} src={`/images/cards/objectives/${objType}/${card.image}`}
                                 alt={card.title}/>
                        </div>
                    )
                })}
            </div>
        )
    }

}

export default Objectives;