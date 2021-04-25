// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import { OverlayTrigger } from 'react-bootstrap';

import AsideModal from 'components/AsideModal';
import AsideModalPanels from 'components/AsideModal/Panels';
import CustomCheckbox from 'components/CategoryCheckboxElement';
import CustomTooltip from 'components/CustomTooltip';
import CategoryItem from './CategoryItem.component';

jest.mock('images/packet-ab-white.png', () => <div className="mock-img-class" />);
jest.mock('images/packet-ab-blue.png', () => <div className="mock-img-class" />);
jest.mock('images/clock-regular-white.png', () => <div className="mock-img-class" />);
jest.mock('images/clock-regular-blue.png', () => <div className="mock-img-class" />);
jest.mock('images/pie-chart.png', () => <div className="mock-img-class" />);
jest.mock('images/pie-chart-blue.png', () => <div className="mock-img-class" />);

const standardProps = {
    // contains all required props, undefined are changed by test
    boardId: 3322022,
    catChange: undefined,
    draggable: undefined,
    multiSelect: undefined,
    saveDragSongs: jest.fn(),
    openAsideModal: jest.fn(),
    closeAsideModal: jest.fn(),
    song: {
        media_id: 412482,
        aNm: 'Jonas Brothers',
        sId: 412482,
        gs_category: undefined,
        sNm: 'title TBA 10am ET',
        version_name: 'Clean',
        modified_date: '2019-05-22T16:57:03.014Z',
    },
    togglePlanner: jest.fn(),
    songVersions: {
        data: {
            current: {
                12345612: { category: {}, media_id: 412482 },
            },
            staged: {},
        },
    },
    categoryHighlight: { data: { songId: 412482, mediaId: 412482 } },
    dehighlightAction: jest.fn(),
    highlightAction: jest.fn(),
};

test('should render component without checkbox, draggable, not in list view', () => {
    const contextProps = {
        ...standardProps,
        multiSelect: false,
        draggable: true,
        catChange: false,
    };
    const component = shallow(<CategoryItem {...contextProps} />);
    const versionTitleNode = component.find('p.version-title');

    expect(component).toBeDefined();
    expect(component.find('div.version-item-checkbox-container')).toHaveLength(1);
    expect(component.find(OverlayTrigger)).toHaveLength(1);
    expect(component.find(CustomCheckbox)).toHaveLength(0);
    expect(component.find('div.version-item')).toHaveLength(1);
    expect(component.find('i.drag-icon')).toHaveLength(1);
    expect(component.find('div.version-titles')).toHaveLength(1);
    expect(versionTitleNode).toHaveLength(2);
    expect(versionTitleNode.at(0).text()).toEqual(contextProps.song.sNm);
    expect(versionTitleNode.at(1).text()).toEqual(contextProps.song.aNm);
    expect(component.find('button.sidebar-icon-btn')).toHaveLength(3);
    expect(component.find('img.sidebar-icons')).toHaveLength(3);
    expect(component.find('span.version-item-taa')).toHaveLength(0);

    component.setProps({ draggable: false });
    expect(component.find('i.drag-icon')).toHaveLength(0);
});

test('should render component with checkboxes visible', () => {
    // render with checkbox
    const contextProps = {
        ...standardProps,
        multiSelect: true,
        draggable: true,
        catChange: false,
    };
    const component = shallow(<CategoryItem {...contextProps} />);

    expect(component.find(CustomCheckbox)).toHaveLength(1);
    expect(component.find(CustomCheckbox).shallow().find('div.custom-checkbox')).toHaveLength(1);
    // TODO: need to add tests for checkbox check and uncheck
});

test('should behave differently in list view', () => {
    const contextProps = {
        ...standardProps,
        multiSelect: false,
        draggable: true,
        catChange: false,
        list: true,
    };
    const component = shallow(<CategoryItem {...contextProps} />);

    expect(component.find('p.version-title-list')).toHaveLength(2);
    expect(component.find('span.version-item-taa')).toHaveLength(1);
    expect(component.find(CustomCheckbox)).toHaveLength(0);
});

// onRowClick
test('should highlight in blue when titles are clicked in sidbar', () => {
    const contextProps = {
        ...standardProps,
        multiSelect: false,
        draggable: true,
        catChange: false,
    };
    const component = shallow(<CategoryItem {...contextProps} />);
    const instance = component.instance();

    jest.spyOn(instance, 'onRowClick');
    jest.spyOn(instance, 'compareCategoryVersionSelection');
    component.find('.version-title').at(0).simulate('click');
    expect(instance.onRowClick).toHaveBeenCalledWith(contextProps.song);
    expect(instance.compareCategoryVersionSelection).toHaveBeenCalledWith(contextProps.song);

    component.find('.version-title').at(1).simulate('click');
    expect(instance.onRowClick).toHaveBeenCalledWith(contextProps.song);
    expect(instance.compareCategoryVersionSelection).toHaveBeenCalledWith(contextProps.song);
    expect(instance.compareCategoryVersionSelection(contextProps.song)).toEqual(true);
});

// build custom tooltip
test('should call buildCustomTooltip', () => {
    const contextProps = {
        ...standardProps,
        multiSelect: false,
        draggable: true,
        catChange: true,
    };
    const component = shallow(<CategoryItem {...contextProps} />);
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
    const instance = component.instance();
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
    const { sNm, aNm, version_name, gs_category } = instance.props.song;

    jest.spyOn(instance, 'buildCustomTooltip');
    instance.buildCustomTooltip();
    expect(instance.buildCustomTooltip).toHaveBeenCalled();
    expect(instance.buildCustomTooltip()).toEqual(
        <CustomTooltip
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
            type="info"
            title="THIS SONG HAS BEEN EDITED"
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
            message="This song was updated from NONE to NONE"
            left={5}
            songs={[
                {
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; left: number;... Remove this comment to see the full error message
                    sNm,
                    aNm,
                    version_name,
                    gs_category,
                },
            ]}
        />
    );

    component.setProps({ catChange: false, overLimit: true, limit: 10 });
    expect(instance.buildCustomTooltip()).toEqual(
        <CustomTooltip
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; left: number;... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
            type="warning"
            title="WARNING"
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
            message="This song exceeds the maximum of 10 for this category."
            left={5}
            songs={[
                {
                    sNm,
                    aNm,
                    version_name,
                    gs_category,
                },
            ]}
        />
    );

    component.setProps({ catChange: false, overLimit: false });
    expect(instance.buildCustomTooltip()).toEqual(
        <CustomTooltip
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; left: number;... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
            type="info"
            title="SONG DETAILS"
            left={5}
            songs={[
                {
                    sNm,
                    aNm,
                    version_name,
                    gs_category,
                },
            ]}
            enabled={!instance.state.dragging}
        />
    );
});

// icons
// sim on mouse enter/exit on hover icon
test('should update state and change img src for mouseEnter/mouseLeave events', () => {
    const contextProps = {
        ...standardProps,
        multiSelect: false,
        draggable: true,
        catChange: false,
    };
    const component = shallow(<CategoryItem {...contextProps} />);
    const instance = component.instance();
    const icon = type => component.find('button.sidebar-icon-btn').at(type);

    expect(component.state('rstHover')).toBeFalsy();
    expect(component.state('pHover')).toBeFalsy();
    expect(component.state('dpHover')).toBeFalsy();

    // testing hover setState is firing
    jest.spyOn(instance, 'toggleHover');

    icon(0).simulate('mouseEnter'); // restriction icon
    expect(instance.toggleHover).toHaveBeenCalledWith('rstHover');
    expect(component.state('rstHover')).toBeTruthy();

    icon(0).simulate('mouseLeave');
    expect(instance.toggleHover).toHaveBeenCalledWith('rstHover');
    expect(component.state('rstHover')).toBeFalsy();

    icon(1).simulate('mouseEnter'); // packet icon
    expect(instance.toggleHover).toHaveBeenCalledWith('pHover');
    expect(component.state('pHover')).toBeTruthy();

    icon(1).simulate('mouseLeave');
    expect(instance.toggleHover).toHaveBeenCalledWith('pHover');
    expect(component.state('pHover')).toBeFalsy();

    icon(2).simulate('mouseEnter'); // daypart icon
    expect(instance.toggleHover).toHaveBeenCalledWith('dpHover');
    expect(component.state('dpHover')).toBeTruthy();

    icon(2).simulate('mouseLeave');
    expect(instance.toggleHover).toHaveBeenCalledWith('dpHover');
    expect(component.state('dpHover')).toBeFalsy();
});

// drag and drop
test('should drag when draggable and dragging one song', () => {
    const contextProps = {
        ...standardProps,
        multiSelect: false,
        draggable: true,
        catChange: false,
    };
    const component = shallow(<CategoryItem {...contextProps} />);
    const instance = component.instance();

    expect(instance.props.togglePlanner).toEqual(contextProps.togglePlanner);

    component.find('div.version-item').simulate('dragStart');
    expect(instance.props.togglePlanner).toHaveBeenCalledWith(true);
    expect(instance.props.saveDragSongs).toHaveBeenCalledWith([contextProps.song]);

    component.find('div.version-item').simulate('dragEnd');
    expect(instance.props.togglePlanner).toHaveBeenCalledWith(false);
});

test('should drag when draggable and dragging multiple songs song', () => {
    const contextProps = {
        ...standardProps,
        multiSelect: true,
        draggable: true,
        catChange: false,
        checkedSongs: [
            {
                media_id: 123456,
                aNm: 'ZZ Top',
                sId: 123456,
                sNm: 'La Grange',
                version_name: 'Not So Clean',
                modified_date: '2019-05-22T16:57:03.014Z',
            },
        ],
    };
    const component = shallow(<CategoryItem {...contextProps} />);
    const instance = component.instance();

    expect(instance.props.togglePlanner).toEqual(contextProps.togglePlanner);

    component.find('div.version-item').simulate('dragStart');
    expect(instance.props.togglePlanner).toHaveBeenCalledWith(true);
    expect(instance.props.saveDragSongs).toHaveBeenCalledWith(contextProps.checkedSongs);

    component.find('div.version-item').simulate('dragEnd');
    expect(instance.props.togglePlanner).toHaveBeenCalledWith(false);
});

// sim icon click
test('should open the restriction side modal on click of hour restriction icon', () => {
    const contextProps = {
        ...standardProps,
        multiSelect: true,
        draggable: true,
        catChange: false,
    };
    const component = shallow(<CategoryItem {...contextProps} />);
    const instance = component.instance();

    component.find('button.sidebar-icon-btn').at(0).simulate('click');
    component.setProps({ asideModalSongId: instance.props.song.media_id });
    expect(instance.props.openAsideModal).toHaveBeenCalledWith(instance.props.song.media_id);
    expect(instance.props.asideModalSongId).toEqual(instance.props.song.media_id);
    expect(instance.state.restrictionOpen).toBeTruthy();
    expect(component.find(AsideModal)).toHaveLength(1);
    expect(component.find(AsideModal).children(AsideModalPanels)).toHaveLength(1);
    expect(component.find(AsideModal).dive().find('h5').text()).toEqual('Hour Restriction');
});

test('should open the side modal on click of daypart icon', () => {
    const contextProps = {
        ...standardProps,
        draggable: true,
        catChange: true,
        multiSelect: false,
    };
    const component = shallow(<CategoryItem {...contextProps} />);
    const instance = component.instance();
    const daypartButton = component.find('button.sidebar-icon-btn').at(2);

    daypartButton.simulate('click');
    component.setProps({ asideModalSongId: instance.props.song.media_id });
    expect(daypartButton).toHaveLength(1);
    expect(instance.props.openAsideModal).toHaveBeenCalledWith(instance.props.song.media_id);
    expect(instance.props.asideModalSongId).toEqual(instance.props.song.media_id);
    expect(instance.state.daypartOpen).toBeTruthy();
    expect(component.find(AsideModal)).toHaveLength(1);
    expect(component.find(AsideModal).children(AsideModalPanels)).toHaveLength(1);
    expect(component.find(AsideModal).dive().find('h5').text()).toEqual('Alternate Daypart');
});
