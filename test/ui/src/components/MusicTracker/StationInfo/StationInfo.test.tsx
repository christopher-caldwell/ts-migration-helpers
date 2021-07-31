import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationInfo.module.scss' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount } from 'enzyme';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationInfo.module.scss' or ... Remove this comment to see the full error message
import StationInfo from './StationInfo.component';

import {
    radioStationName,
    radioSubtitle,
    radioSubtitleBorderLeft,
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ station: { summary: { name: string; call_l... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './StationInfo.module.scss' or ... Remove this comment to see the full error message
    subtitleContainer,
} from './StationInfo.module.scss';

test('correct station name display and info', () => {
    const props = {
        station: {
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ station: { summary: { name: string; call_l... Remove this comment to see the full error message
            summary: { name: 'Z100', call_letters: 'WHTZ-FM', location: 'New York', format_id: 6 },
        },
        lookupTables: {
            formats: [
                { value: 6, label: 'Top 40' },
                { value: 71, label: 'Adult Hits' },
            ],
        },
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'label' does not exist on type '{ value: ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ station: { summary: { name: string; call_l... Remove this comment to see the full error message
    const component = mount(<StationInfo {...props} />);
    expect(component).toBeDefined();

    // CSS classes
    expect(component.find(`.${radioStationName}`)).toHaveLength(1);
    expect(component.find(`.${radioSubtitle}`)).toHaveLength(1);
    expect(component.find(`.${radioSubtitleBorderLeft}`)).toHaveLength(1);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'label' does not exist on type '{ value: ... Remove this comment to see the full error message
    expect(component.find(`.${subtitleContainer}`)).toHaveLength(1);

    // Station info to be displayed
    expect(component.prop('station').summary.name).toEqual(props.station.summary.name);
    expect(component.prop('station').summary.call_letters).toEqual(
        props.station.summary.call_letters
    );
    expect(component.prop('station').summary.location).toEqual(props.station.summary.location);
    expect(component.prop('lookupTables').formats.label).toEqual(props.lookupTables.formats.label);
});
