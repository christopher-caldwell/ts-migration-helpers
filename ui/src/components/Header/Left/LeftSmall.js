import React from 'react';
import '../../css/Header.css';

const left = () => {
    return (
        <div className="link-container col span-1-of-2">
            <a href="https://www.fantasyflightgames.com/en/products/star-wars-armada/"
               className="active armada-logo-container">
                <img src={"/images/home-page/armada-logo.png"} className="armada-logo-img" alt="logo">
                </img>
            </a>
        </div>
    )
}

export default left;