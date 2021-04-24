import React from 'react';
import { shallow, mount } from 'enzyme';

import MusicTracker from './MusicTracker.component';
import StationHeader from './StationHeader';
import Table from './Table';

const mtProps = { match: { params: { boardId: 3322022 } } }; // now station..
test('output of container and child components', () => {
    const component = shallow(<MusicTracker {...mtProps} />);
    expect(component).toBeDefined();
    expect(component.find('.musicTrackerContainer')).toHaveLength(1); // dive because comp is connected
    expect(component.find(StationHeader)).toHaveLength(1);
    expect(component.find(Table)).toHaveLength(1);
});
