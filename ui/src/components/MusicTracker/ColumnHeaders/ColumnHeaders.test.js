import React from 'react';
import { shallow } from 'enzyme';

import ColumnHeaders from './ColumnHeaders.component';
import { headerSetup as songInfoSetup } from '../SongInfo/SongInfo.component';

test('output when called inside song info group', () => {
    const props = { columnKeys: ['titleArtist', 'version'], headerSetup: songInfoSetup };
    const component = shallow(<ColumnHeaders {...props} />);
    expect(component.find('div.columnHeaders')).toHaveLength(1);
    component.find('button.columnHeader').forEach((button, index) => {
        expect(button.text()).toBe(songInfoSetup[props.columnKeys[index]].name);
    });
});
