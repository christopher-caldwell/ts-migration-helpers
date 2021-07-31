import React from 'react';
import {Link} from 'react-router-dom';
import '../css/Landing.css';

class Landing extends React.Component{

    render(){

        return (
            <div className="container main">
                <div className="row content-row">
                    <div className="col span-1-of-2">
                        <Link to='/builder/imperial'>
                            <div className="img-cont">
                                <img src={`./images/home-page/imperial-logo.png`} className="landing-img" alt="empire logo"/>
                            </div>
                            <div className="faction-cont">
                                <h2>Empire</h2>
                            </div>
                        </Link>
                    </div>
                    <div className="col span-1-of-2">
                        <Link to='/builder/rebel'>
                            <div className="img-cont">
                                <img src={`./images/home-page/rebel-logo.png`} alt="rebel logo" className="landing-img"/>
                            </div>
                            <div className="faction-cont">
                                <h2>Rebel</h2>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        )
    }

}
export default Landing;