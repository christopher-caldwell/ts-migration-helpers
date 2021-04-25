// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './TabsBar.module.css' or its c... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'omtDisabled' implicitly has an 'a... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'toggleTab' implicitly has an 'any... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './TabsBar.module.css' or its c... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import cn from 'classnames';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './TabsBar.module.css' or its c... Remove this comment to see the full error message
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
