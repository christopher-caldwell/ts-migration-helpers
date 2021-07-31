import React from 'react';

import CloseButton from 'components/CloseButton';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/default.png' or its cor... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/default.png' or its cor... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SongBar.module.css' or its c... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/default.png' or its cor... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songName' implicitly has an 'any'... Remove this comment to see the full error message
import defaultImage from 'images/default.png';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'loading' implicitly has an 'any' ... Remove this comment to see the full error message
import TabsBar from '../TabsBar';

import {
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'activeTab' implicitly has an 'any... Remove this comment to see the full error message
    songBar,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'toggleTab' implicitly has an 'any... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SongBar.module.css' or its c... Remove this comment to see the full error message
    avatar,
    songInfo,
    name,
    subName,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songName' implicitly has an 'any'... Remove this comment to see the full error message
    songChangeButton,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'image' implicitly has an 'any' ty... Remove this comment to see the full error message
    arrowsContainer,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'loading' implicitly has an 'any' ... Remove this comment to see the full error message
    songArrow,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onClose' implicitly has an 'any' ... Remove this comment to see the full error message
    closeBtnPosition,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'activeTab' implicitly has an 'any... Remove this comment to see the full error message
    disabledArrow,
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'toggleTab' implicitly has an 'any... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SongBar.module.css' or its c... Remove this comment to see the full error message
} from './SongBar.module.css';

const SongBar = ({
    songName,
    artistName,
    image,
    loading,
    onClose,
    changeSong,
    activeTab,
    toggleTab,
    calloutDisabled,
    omtDisabled,
    upDisabled,
    downDisabled,
}) => {
    const arrowUp = () => changeSong(-1);
    const arrowDown = () => changeSong(1);

    return (
        <header className={songBar}>
            <div className={arrowsContainer}>
                <button
                    className={`${songChangeButton}${upDisabled ? ` ${disabledArrow}` : ''}`}
                    disabled={upDisabled}
                    onClick={arrowUp}
                >
                    <i className={`fa fa-chevron-up ${songArrow}`} />
                </button>
                <button
                    className={`${songChangeButton}${downDisabled ? ` ${disabledArrow}` : ''}`}
                    disabled={downDisabled}
                    onClick={arrowDown}
                >
                    <i className={`fa fa-chevron-down ${songArrow}`} />
                </button>
            </div>
            {loading ? (
                <>
                    <img className={avatar} src={defaultImage} alt="Avatar" />
                    <p className={songInfo}>Loading...</p>
                </>
            ) : (
                <>
                    <img className={avatar} src={image || defaultImage} alt="Avatar" />
                    <div className={songInfo}>
                        <span className={name}>{songName}</span>
                        <span className={subName}>{artistName}</span>
                    </div>
                    <TabsBar
                        activeTab={activeTab}
                        toggleTab={toggleTab}
                        calloutDisabled={calloutDisabled}
                        omtDisabled={omtDisabled}
                    />
                </>
            )}
            <CloseButton onClose={onClose} extraStyle={closeBtnPosition} />
        </header>
    );
};

export default SongBar;
