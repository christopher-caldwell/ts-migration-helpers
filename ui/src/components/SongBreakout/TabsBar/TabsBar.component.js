import React from 'react';
import cn from 'classnames';

import { tabs, tab, left, right, active, disabled, tooltip, tooltipIcon } from './TabsBar.module.css';

const TabsBar = ({ calloutDisabled, omtDisabled, activeTab, toggleTab }) => (
    <div className={tabs}>
        <button
            className={cn(tab, left, {
                [active]: activeTab === 'callout',
                [disabled]: calloutDisabled,
            })}
            onClick={() => toggleTab('callout')}
            disabled={calloutDisabled}
        >
            Callout
        </button>
        <button
            className={cn(tab, right, {
                [active]: activeTab === 'omt',
                [disabled]: omtDisabled,
            })}
            onClick={() => toggleTab('omt')}
            disabled={omtDisabled}
        >
            OMT
        </button>
        {/* below is a tooltip that shows up upon hover of a disabled tab */}
        <div className={tooltip}>
            <i className={`fa fa-exclamation-triangle ${tooltipIcon}`} />
            <span>{`No ${calloutDisabled ? 'Callout' : 'OMT'} breakouts available`}</span>
        </div>
    </div>
);

export default TabsBar;
