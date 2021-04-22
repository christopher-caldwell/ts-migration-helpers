import React from 'react';
import { mount } from 'enzyme';

import StationInfo from './StationInfo.component';

import {
    radioStationName,
    radioSubtitle,
    radioSubtitleBorderLeft,
    subtitleContainer,
} from './StationInfo.module.scss';

test('correct station name display and info', () => {
    const props = {
        station: {
            summary: { name: 'Z100', call_letters: 'WHTZ-FM', location: 'New York', format_id: 6 },
        },
        lookupTables: {
            formats: [
                { value: 6, label: 'Top 40' },
                { value: 71, label: 'Adult Hits' },
            ],
        },
    };

    const component = mount(<StationInfo {...props} />);
    expect(component).toBeDefined();

    // CSS classes
    expect(component.find(`.${radioStationName}`)).toHaveLength(1);
    expect(component.find(`.${radioSubtitle}`)).toHaveLength(1);
    expect(component.find(`.${radioSubtitleBorderLeft}`)).toHaveLength(1);
    expect(component.find(`.${subtitleContainer}`)).toHaveLength(1);

    // Station info to be displayed
    expect(component.prop('station').summary.name).toEqual(props.station.summary.name);
    expect(component.prop('station').summary.call_letters).toEqual(
        props.station.summary.call_letters
    );
    expect(component.prop('station').summary.location).toEqual(props.station.summary.location);
    expect(component.prop('lookupTables').formats.label).toEqual(props.lookupTables.formats.label);
});
