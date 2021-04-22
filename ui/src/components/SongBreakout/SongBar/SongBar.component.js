import React from 'react';

import CloseButton from 'components/CloseButton';
import defaultImage from 'images/default.png';
import TabsBar from '../TabsBar';

import {
    songBar,
    avatar,
    songInfo,
    name,
    subName,
    songChangeButton,
    arrowsContainer,
    songArrow,
    closeBtnPosition,
    disabledArrow,
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
