// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationInfo.module.scss' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'format' implicitly has an 'any' t... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationInfo.module.scss' or ... Remove this comment to see the full error message

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'station' implicitly has an 'any' ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationInfo.module.scss' or ... Remove this comment to see the full error message
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
