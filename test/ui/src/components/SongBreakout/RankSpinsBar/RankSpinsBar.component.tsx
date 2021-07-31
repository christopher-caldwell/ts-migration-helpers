// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './RankSpinsBar.module.css' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'priorSix' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './RankSpinsBar.module.css' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'priorStation' implicitly has an '... Remove this comment to see the full error message
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'coreRank' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './RankSpinsBar.module.css' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'totalColor' implicitly has an 'an... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'priorSix' implicitly has an 'any'... Remove this comment to see the full error message
import { container, group, heading, box, metric, num, title, green, red } from './RankSpinsBar.module.css';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hexColor' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'totalRank' implicitly has an 'any... Remove this comment to see the full error message
const RankSpinsBar = ({
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'six' implicitly has an 'any' type... Remove this comment to see the full error message
    priorRank: { rank: { corePop: priorCore = '-', totalPop: priorTotal = '-' } = {} },
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'coreColor' implicitly has an 'any... Remove this comment to see the full error message
    priorSpins: { '6a12m': priorSix, '24hr': priorDay, totalMarket: priorMarket, totalStation: priorStation },
    rank: { coreRank, totalRank },
    spins: { '6a12m': six, '24hr': day, totalMrkt: market, totalStn: station },
    colors: { core: coreColor, total: totalColor },
}) => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hexColor' implicitly has an 'any' type.
    const getUpOrDownArrow = (currentMetric, priorMetric) => {
        const bool = Math.sign(currentMetric - priorMetric) === 1;
        return <i className={`fa fa-${bool ? 'caret-up' : 'caret-down'} ${bool ? green : red}`} />;
    };

    const makeStyles = hexColor =>
        hexColor
            ? { border: `2px solid ${hexColor}`, borderRadius: '15px', padding: '2px 15px 0 15px' }
            : { border: '2px solid #ffffff00', borderRadius: '15px', padding: '2px 15px 0 15px' };

    return (
        <div className={container}>
            {['Rank', 'Spins'].map(groupHeading => (
                <div className={group} key={groupHeading}>
                    <span className={heading}>{groupHeading}</span>
                    <div className={box}>
                        {groupHeading === 'Rank'
                            ? [
                                ['Current Core Pop', coreRank, coreColor],
                                ['Prior Core Pop', priorCore],
                                ['Current Total Pop', totalRank, totalColor],
                                ['Prior Total Pop', priorTotal],
                            ].map(([headingName, data, color], index) => {
                                return (
                                    <div className={metric} key={headingName}>
                                        <span className={num} style={makeStyles(data === '-' ? false : color)}>
                                            {data}
                                        </span>
                                        <span className={title}>{headingName}</span>
                                    </div>
                                );
                            })
                            : [
                                ['6am12m', six, priorSix],
                                ['24hr', day, priorDay],
                                ['Total Station', station, priorStation],
                                ['Total Market', market, priorMarket],
                            ].map(([headingName, current, prior]) => (
                                <div className={metric} key={headingName}>
                                    <span className={num}>
                                        {`${current || '-'} `}
                                        {getUpOrDownArrow(current, prior)}
                                    </span>
                                    <span className={title}>{headingName}</span>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RankSpinsBar;
