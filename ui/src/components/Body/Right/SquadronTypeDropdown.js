import React, { Component } from 'react';

class SquadronTypeDropdown extends Component {

    determineType = value => {
        this.props.determineType(value)
    };

    render(){
        return (
            <div className="select-type-cont">
                <label htmlFor="squad-type" id={"squad-type-label"}>Search for a squadron type</label>
                <select name="squadrons" id="squad-type" onChange={this.determineType} value={this.props.squadTypeSelected}>
                    <option value="" defaultChecked={true}>All</option>
                    <option value="tie-fighter">TIE</option>
                    <option value="tie-interceptor">TIE Interceptor</option>
                    <option value="tie-bomber">TIE Bomber</option>
                    <option value="tie-advanced">TIE Advanced</option>
                    <option value="rogue-villain">Rogues & Villains</option>
                </select>
            </div>
        )
    }
}

export default SquadronTypeDropdown;