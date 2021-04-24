import React from 'react';
import { shallow, mount } from 'enzyme';

import TitleArtistCell from './TitleArtistCell.component';
import Checkbox from '../Checkbox/Checkbox.component';

const props = {
    songName: 'Young blood',
    songId: '123456_45675861',
    artistName: '5 Seconds of Summer',
    width: 150,
};

test('title artist cell component output', () => {
    const component = shallow(<TitleArtistCell {...props} />);
    expect(component).toBeDefined();
    expect(component.find('div.container')).toHaveLength(1);
    expect(component.find(Checkbox)).toHaveLength(1);
    expect(component.find('div.titleArtist')).toHaveLength(1);
    expect(component.find('p.text')).toHaveLength(2);
    expect(
        component
            .find('p.text')
            .at(0)
            .text(),
    ).toEqual(props.songName);
    expect(
        component
            .find('p.text')
            .at(1)
            .text(),
    ).toEqual(props.artistName);
});
