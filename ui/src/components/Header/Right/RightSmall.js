import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import '../../css/Header.css';

class Right extends Component {

    toggleMenu = () => {
        // toggle the header and hide the left menu if clicked
        this.props.toggleHeaderMenu();
        this.props.hideLeftMenu();
    };

    render() {

        let rotate = "";
        if (this.props.headerMenuShown){
            rotate = "rotate";
        }
        return (
                <div className={"col span-1-of-2"} id={"menu-holder"}>
                    <div className="icon" onClick={this.toggleMenu}><i className={`fas fa-chevron-down ${rotate}`}/></div>
                </div>
        )
    }

}

const mapStateToProps = state => {
    return { headerMenuShown: state.headerMenuShown }
};

export default connect(mapStateToProps, actions)(Right);