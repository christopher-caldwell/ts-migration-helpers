import React, { Component } from "react";



class Left extends Component {
    render(){
        return(
            <div className="armada-logo span-1-of-4" id="armada-logo">
                <a href="https://www.fantasyflightgames.com/en/products/star-wars-armada/">
                    <img src={"/images/home-page/armada-logo.png"} className="armada-logo-img" alt="logo">
                    </img>
                </a>
            </div>
        )
    }
}



export default Left;