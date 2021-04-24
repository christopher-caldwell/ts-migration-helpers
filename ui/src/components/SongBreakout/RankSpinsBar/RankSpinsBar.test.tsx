import React from 'react';
import { shallow, mount } from 'enzyme';

import RankSpinsBar from './RankSpinsBar.component.js';

const props = {
    priorRank: {
        rank: { corePop: 5, totalPop: 5 },
    },
    priorSpins: {
        '6a12m': 1234,
        '24hr': 123,
        totalMarket: 3456,
        totalStation: 4532,
    },
    rank: { coreRank: 12, totalRank: 15 },
    spins: { '6a12m': 123, '24hr': 1234, totalMrkt: 12345, totalStn: 12346 },
    colors: { core: 5, total: 3 },
};

test('jsx output of rank spins bar', () => {
    const component = mount(<RankSpinsBar {...props} />);
    expect(component.find('div.container')).toHaveLength(1);
    expect(component.find('div.group')).toHaveLength(2);
    expect(component.find('span.heading')).toHaveLength(2);
    expect(component.find('div.box')).toHaveLength(2);
    expect(component.find('div.metric')).toHaveLength(8);
    expect(component.find('span.num')).toHaveLength(8);
    expect(component.find('span.title')).toHaveLength(8);
});
