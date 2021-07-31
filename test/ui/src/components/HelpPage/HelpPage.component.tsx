import React from 'react';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/music-lab-logo.png' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/music-lab-logo.png' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/music-lab-logo.png' or ... Remove this comment to see the full error message
import { Link } from 'react-router-dom';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './HelpPage.module.scss' or its... Remove this comment to see the full error message
import musiclabLogo from 'images/music-lab-logo.png';
import style from './HelpPage.module.scss';

const SERVICE_NOW_LINK = `https://iheartmedia.service-now.com/sp
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'contentType' implicitly has an 'a... Remove this comment to see the full error message
    ?id=sc_cat_item&sys_id=f00df0a7db30c010ceeee9ec0b9619fb`;
const unauthorizedContent = (
    <>
        It seems you do not have enough privilege to access this page. Submit a &nbsp;
        {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'contentType' implicitly has an 'a... Remove this comment to see the full error message */}
        <a href={SERVICE_NOW_LINK}>request</a>
        &nbsp; to gain access.
    </>
);
// @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
const helpContent = <>Please contact your administrator Eric Riggs at EricRiggs@iheartmedia.com</>;
const contentMap = {
    unauthorized: unauthorizedContent,
    help: helpContent,
};

const HelpPage = ({ contentType }) => (
    <div className={`auth-container main-container ${style.helpPageContainer}`}>
        {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
        <div className={style.helpPageContainerHeader}>
            <img
                src={musiclabLogo}
                className={style.helpPageContainerLogo}
                alt="Music Lab @ iHeartMedia Inc."
            />
        </div>
        <div className={style.helpPageContainerContent}>
            {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
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
