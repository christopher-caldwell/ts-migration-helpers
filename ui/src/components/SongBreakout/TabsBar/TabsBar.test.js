import React from 'react';
import { mount, shallow } from 'enzyme';

import TabsBar from './TabsBar.component';

const props = {
    activeTab: 'callout',
    toggleTab: jest.fn(),
    calloutDisabled: false,
    omtDisabled: false,
};

test('jsx output of tabs bar', () => {
    const component = mount(<TabsBar {...props} />);
    expect(component.find('div.tabs')).toHaveLength(1);
    expect(component.find('button.tab')).toHaveLength(2);
    expect(component.find('div.tooltip')).toHaveLength(1);
});

test('song bar tabs click', () => {
    const component = mount(<TabsBar {...props} />);
    expect(component.find('div.tabs')).toHaveLength(1);
    const tabs = component.find('button.tab');
    expect(tabs).toHaveLength(2);
    expect(tabs.at(0).html().includes('active')).toBeTruthy();
    expect(tabs.at(1).html().includes('active')).toBeFalsy();
    component.find('button.tab').at(1).simulate('click');
    component.setProps({ activeTab: 'omt' });
    expect(props.toggleTab).toHaveBeenCalled();
    expect(tabs.at(0).html().includes('active')).toBeFalsy();
    expect(tabs.at(1).html().includes('active')).toBeTruthy();
    component.find('button.tab').at(0).simulate('click');
    component.setProps({ activeTab: 'callout' });
    expect(tabs.at(0).html().includes('active')).toBeTruthy();
    expect(tabs.at(1).html().includes('active')).toBeFalsy();
});

test('both tabs are not disabled behavior', () => {
    const contextProps = {
        ...props,
        toggleTab: jest.fn(),
        calloutDisabled: false,
        omtDisabled: false,
    };
    const component = mount(<TabsBar {...contextProps} />);
    component.find('button.tab').forEach(tab => expect(tab.prop('disabled')).toBeFalsy());
    component.find('button.tab').forEach(tab => tab.simulate('click'));
    expect(component.prop('toggleTab')).toHaveBeenCalledTimes(2);
});

test('callout tab is disabled', () => {
    const contextProps = {
        ...props,
        toggleTab: jest.fn(),
        calloutDisabled: true,
        omtDisabled: false,
    };
    const component = mount(<TabsBar {...contextProps} />);
    expect(component.find('button.tab').at(0).prop('disabled')).toBeTruthy();
    expect(component.find('button.tab').at(1).prop('disabled')).toBeFalsy();
    component.find('button.tab').at(0).simulate('click');
    expect(component.prop('toggleTab')).not.toHaveBeenCalled();
    component.find('button.tab').at(1).simulate('click');
    expect(component.prop('toggleTab')).toHaveBeenCalledTimes(1);
    expect(component.find('div.tooltip').text()).toBe('No Callout breakouts available');
});

test('omt tab disabled', () => {
    const contextProps = {
        ...props,
        toggleTab: jest.fn(),
        calloutDisabled: false,
        omtDisabled: true,
    };
    const component = mount(<TabsBar {...contextProps} />);
    expect(component.find('button.tab').at(0).prop('disabled')).toBeFalsy();
    expect(component.find('button.tab').at(1).prop('disabled')).toBeTruthy();
    component.find('button.tab').at(1).simulate('click');
    expect(component.prop('toggleTab')).not.toHaveBeenCalled();
    component.find('button.tab').at(0).simulate('click');
    expect(component.prop('toggleTab')).toHaveBeenCalledTimes(1);
    expect(component.find('div.tooltip').text()).toBe('No OMT breakouts available');
});

test('both tabs disabled', () => {
    const contextProps = {
        ...props,
        toggleTab: jest.fn(),
        calloutDisabled: true,
        omtDisabled: true,
    };
    const component = mount(<TabsBar {...contextProps} />);
    component.find('button.tab').forEach(tab => expect(tab.prop('disabled')).toBeTruthy());
    component.find('button.tab').forEach(tab => tab.simulate('click'));
    component.find('button.tab').forEach(tab => expect(component.prop('toggleTab')).not.toHaveBeenCalled());
});
