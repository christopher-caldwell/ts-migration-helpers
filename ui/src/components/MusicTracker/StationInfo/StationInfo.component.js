import React from 'react';

import { radioStationName, radioSubtitle, radioSubtitleBorderLeft, subtitleContainer } from './StationInfo.module.scss';

const StationInfo = ({ station, station: { name, callLetters, market, format }, lookupTables }) => station ? (
    <>
        <h3 className={radioStationName}>{name}</h3>
        <div className={subtitleContainer}>
            <span className={radioSubtitle}>{`${callLetters} ${market}`}</span>
            <span className={radioSubtitleBorderLeft}>{format}</span>
        </div>
    </>
) : null;

export default StationInfo;
