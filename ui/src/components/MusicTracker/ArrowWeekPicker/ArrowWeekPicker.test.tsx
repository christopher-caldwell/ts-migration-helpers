import React from 'react';
import { shallow } from 'enzyme';

import ArrowWeekPicker from './ArrowWeekPicker.component';

const props = {
    startDate: '2020-05-24',
    endDate: '2020-05-30',
};

test('jsx output of arrow picker', () => {
    const component = shallow(<ArrowWeekPicker {...props} />);
    expect(component).toBeDefined();
    expect(component.find('div.arrowPicker')).toHaveLength(1);
    expect(component.find('button.arrowButton')).toHaveLength(2);
    expect(component.find('i.arrowIcon')).toHaveLength(2);
    expect(component.find('span.dateText')).toHaveLength(1);

    // output of dates here
    expect(component.find('span.dateText').text()).toEqual('May 24 - 30, 2020');
    component.setProps({
        startDate: '2020-05-31',
        endDate: '2020-06-06',
    });
    expect(component.find('span.dateText').text()).toEqual('May 31 - Jun 6, 2020');
    component.setProps({
        startDate: '2020-06-28',
        endDate: '2020-07-04',
    });
    expect(component.find('span.dateText').text()).toEqual('Jun 28 - Jul 4, 2020');
});
