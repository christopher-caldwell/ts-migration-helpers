import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import musiclabLogo from 'images/music-lab-logo.png';
import style from './HelpPage.module.scss';

const SERVICE_NOW_LINK = `https://iheartmedia.service-now.com/sp
    ?id=sc_cat_item&sys_id=f00df0a7db30c010ceeee9ec0b9619fb`;
const unauthorizedContent = (
    <>
        It seems you do not have enough privilege to access this page. Submit a &nbsp;
        <a href={SERVICE_NOW_LINK}>request</a>
        &nbsp; to gain access.
    </>
);
const helpContent = <>Please contact your administrator Eric Riggs at EricRiggs@iheartmedia.com</>;
const contentMap = {
    unauthorized: unauthorizedContent,
    help: helpContent,
};

const HelpPage = ({ contentType }) => (
    <div className={`auth-container main-container ${style.helpPageContainer}`}>
        <div className={style.helpPageContainerHeader}>
            <img
                src={musiclabLogo}
                className={style.helpPageContainerLogo}
                alt="Music Lab @ iHeartMedia Inc."
            />
        </div>
        <div className={style.helpPageContainerContent}>
            {contentMap[contentType]}
            <div className={style.helpPageContainerFooter}>
                <Link to="/login">Back to Sign in</Link>
            </div>
        </div>
    </div>
);

HelpPage.propTypes = {
    contentType: PropTypes.string.isRequired,
};

export default HelpPage;
