import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";

class UserProfile extends Component {
    render() {
        const profile = () => {
            switch (this.props.auth) {
                case null:
                    return;
                default:
                    return (
                        <div className="container">
                            <div className="row">

                            </div>
                        </div>
                    )

            }
        }
    }


        return (
            <div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth
    }
};

export default connect(mapStateToProps, actions)(UserProfile);
