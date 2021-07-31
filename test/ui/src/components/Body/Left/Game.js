import React from 'react';
import BottomButtons from './BottomButtons';
import SelectedShips from './SelectedShips';
import AddPiece from "./AddPiece";

const game = (props) => {
    return (
        <div className="functionality-buttons">
            <SelectedShips commanderCards={props.commanderCards} upgradeDelete={props.upgradeDelete} shipInfo={props.shipInfo} faction={props.faction} delete={props.delete} toggle={props.toggle}/>
            <AddPiece/>
            <BottomButtons shipInfo={props.shipInfo}/>
        </div>
    )
};

export default game;