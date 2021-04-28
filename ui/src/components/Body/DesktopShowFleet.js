import React, { Component } from 'react';
import {Link} from "react-router-dom";

class DesktopShowFleet extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="content-container desktop">
                <div className="row back-container">
                    <Link to="/profile"><button>Back</button></Link>
                </div>
                <div className="content-container">
                    <div className="row fleet-name-display">
                        <h1>{this.props.targetFleet.fleetName}</h1>
                    </div>
                    <div className="row fleet-info-display">
                        {this.props.targetFleet.ships.map(ship => {
                            return (
                                <section className="display-ship row" key={ship.id}>
                                    <div className="col span-1-of-4 ship-col">
                                        <div>
                                            <h3>Ship:</h3>
                                            <div className={"display-ship-img"}>
                                                <img src={`${ship.imagePath}`} alt={ship.name} />
                                            </div>
                                            <div className='display-ship-name'>{ship.name}</div>
                                        </div>
                                    </div>
                                    <div className="col span-3-of-4 upgrade-col">
                                        <div>
                                            <h3>Upgrades:</h3>
                                            {Object.values(ship.upgrades).map(upgrade => {
                                                if (upgrade !== null){
                                                    return (
                                                        <div className="display-upgrade" key={upgrade.set}>{upgrade.title}</div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                    <Link to={`profile/show/${this.props.targetFleet._id}/edit`}><button>Edit</button></Link>
                                </section>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default DesktopShowFleet;