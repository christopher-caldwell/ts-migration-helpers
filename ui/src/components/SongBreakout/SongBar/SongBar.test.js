import React from 'react';
import { mount, shallow } from 'enzyme';

import defaultImage from 'images/default.png';
import CloseButton from 'components/CloseButton';
import TabsBar from '../TabsBar';
import SongBar from './SongBar.component';

const props = {
    artistName: 'Ted Nugent',
    songName: 'Cat Scratch Fever',
    activeTab: 'callout',
    setActiveTab: jest.fn(),
    image: 'image.png',
    loading: false,
    toggleTab: jest.fn(),
    onClose: jest.fn(),
    changeSong: jest.fn(),
    calloutDisabled: false,
    omtDisabled: false,
};

test('output of SongBar component', () => {
    const component = shallow(<SongBar {...props} />);
    expect(component.find('header.songBar')).toHaveLength(1);
    expect(component.find('div.arrowsContainer')).toHaveLength(1);
    expect(component.find('button.songChangeButton')).toHaveLength(2);
    expect(component.find('i.songArrow')).toHaveLength(2);
    expect(component.find('img.avatar')).toHaveLength(1);
    expect(component.find('img.avatar').prop('src')).toBe(props.image);
    expect(component.find('div.songInfo')).toHaveLength(1);
    expect(component.find('span.name')).toHaveLength(1);
    expect(component.find('span.subName')).toHaveLength(1);
    expect(component.find(TabsBar)).toHaveLength(1);
    expect(component.find(CloseButton)).toHaveLength(1);
    component.setProps({ loading: true });
    expect(component.find('img.avatar').prop('src')).toBe(defaultImage);
    expect(component.find('span.name')).toHaveLength(0);
});

test('correct song and artist is visible', () => {
    const component = shallow(<SongBar {...props} />);
    expect(component.find('div.songInfo').text()).toBe(`${props.songName}${props.artistName}`);
});

test('correct avatar shows up', () => {
    const component = mount(<SongBar {...props} />);
    expect(component.find('img.avatar').prop('src')).toBe(props.image);
    component.setProps({ image: null });
    expect(component.find('img.avatar').prop('src')).toBe(defaultImage);
    component.setProps({ image: undefined });
    expect(component.find('img.avatar').prop('src')).toBe(defaultImage);
});
