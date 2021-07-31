import React from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './daypart-single-song.module.s... Remove this comment to see the full error message
import { shallow, mount } from 'enzyme';
import Select from 'react-select';

import DaypartSingleSong from './component';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './daypart-single-song.module.s... Remove this comment to see the full error message
import SongDetails from '../../Components/SongDetails';
import DaypartRow from './DaypartRow';
import AsideModalControls from '../../Components/AsideModalControls';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './daypart-single-song.module.s... Remove this comment to see the full error message
import styles from './daypart-single-song.module.scss';

const standardProps = {
    selectedSong: {
        media_id: 412482,
        aNm: 'Jonas Brothers',
        sId: 412482,
        gs_category: undefined,
        sNm: 'title TBA 10am ET',
        version_name: 'Clean',
        modified_date: '2019-05-22T16:57:03.014Z',
        alternate: {}, // song has no dayparts when alternate is empty
    },
    bottomBarOpen: false,
    handleClose: jest.fn(),
    handleSave: jest.fn(),
    dayparts: [
        // redux => dayparts.data (not dayparts assinged to song)
        {
            id: 258,
            name: 'Night',
            synchronized: true,
        },
        {
            id: 259,
            name: 'Overnight',
            synchronized: true,
        },
        {
            id: 260,
            name: 'AM Drive',
            synchronized: true,
        },
        {
            id: 261,
            name: 'Mid-day',
            synchronized: false,
        },
        {
            id: 262,
            name: 'OVN',
            synchronized: true,
        },
        {
            id: 263,
            name: 'AMD Weekend',
            // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { media_id: number; aNm: str... Remove this comment to see the full error message
            synchronized: false,
        },
    ],
    categoryOptions: [
        { label: 'A', value: 17 },
        { label: 'B', value: 18 },
        { label: 'C', value: 19 },
        { label: 'M', value: 29 },
        { label: '01', value: 1 },
        { label: '02', value: 2 },
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { media_id: number; aNm: str... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { media_id: number; aNm: str... Remove this comment to see the full error message
        { label: '81', value: 12 },
        { label: '82', value: 13 },
        { label: 'H', value: 26 },
        { label: 'F', value: 22 },
        { label: 'S', value: 33 },
        { label: 'Z', value: 36 },
        { label: 'IHC', value: 28 },
    ],
};

test('should render component', () => {
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { media_id: number; aNm: str... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { media_id: number; aNm: str... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { media_id: number; aNm: str... Remove this comment to see the full error message
    const component = shallow(<DaypartSingleSong {...standardProps} />);

    expect(component).toBeDefined();
    expect(component.find(`.${styles.daypartModalContainer}`)).toHaveLength(1);
    expect(component.find(SongDetails)).toHaveLength(1);
    expect(component.find(DaypartRow)).toHaveLength(1);
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { media_id: number; aNm: str... Remove this comment to see the full error message
    expect(component.find(AsideModalControls)).toHaveLength(1);
});

test('the correct song is getting sent to the modal.', () => {
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { media_id: number; aNm: str... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { alternate: { 260: { catego... Remove this comment to see the full error message
    const component = shallow(<DaypartSingleSong {...standardProps} />);

    expect(standardProps.selectedSong.media_id).toEqual(
        component.find(SongDetails).props().song.media_id
    );
    expect(component.find(SongDetails).props().musicTracker).toBeTruthy();
});

test('if a song has no dayparts', () => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { media_id: number; aNm: str... Remove this comment to see the full error message
    const component = shallow(<DaypartSingleSong {...standardProps} />);
    const row = component.find(DaypartRow);

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(row).toHaveLength(1); // selectedSongs.alternate is empty
    expect(row.props().daypart.id).toBe(undefined); // 'Select Daypart' obj id is undef
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { alternate: { 260: { catego... Remove this comment to see the full error message
    expect(row.dive().find(Select)).toHaveLength(2); // displays 2 default dropdowns
    expect(row.dive().find(Select).at(0).props().value.label).toEqual('Add Daypart');
    expect(row.dive().find(Select).at(1).props().value.label).toEqual('');
});

test('song has daypart(s)', () => {
    const props = {
        ...standardProps,
        selectedSong: {
            ...standardProps.selectedSong,
            alternate: {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
                260: { category_id: 1, gs_category: null },
                262: { category_id: 12, gs_category: 'P' },
                // @ts-expect-error ts-migrate(2739) FIXME: Type '{ action: string; daypart: { value: string; ... Remove this comment to see the full error message
                258: { category_id: 17, gs_category: null },
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                // 246: { category_id: null, gs_category: 'P' }, // TODO: test when cat_id is null
            },
        },
    };

    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { alternate: { 260: { catego... Remove this comment to see the full error message
    const component = shallow(<DaypartSingleSong {...props} />);
    const rows = component.find(`.${styles.currentDaypartsContainer}`).find(DaypartRow);
    // ^ one row per song's daypart

    expect(rows).toHaveLength(3); // number of rows matches number of alternate categories in props

    const songDayparts = Object.keys(props.selectedSong.alternate);
    const songAltCategories = Object.values(props.selectedSong.alternate);

    rows.forEach((row, rowIdx) => {
        // daypart title --------------------------
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ action: string; daypart: { value: string; ... Remove this comment to see the full error message
        expect(row.dive().find(`.${styles.daypartMlModalSelect}`).text()).toEqual(
            // @ts-expect-error ts-migrate(2739) FIXME: Type '{ action: string; daypart: { value: string; ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            props.dayparts.find(dp => Number(dp.id) == songDayparts[rowIdx]).name
        );

        // alt cat dropdown ---------------------------
        expect(row.dive().find(Select).props().value.value) // selected value
            .toEqual(songAltCategories[rowIdx].category_id);
        expect(row.dive().find(Select).props().options) // dropdown options
            .toHaveLength(props.categoryOptions.length - 1); // minus current selection only
    });
});

test('changing alt. category on current daypart', () => {
    const props = {
        action: 'plus',
        daypart: { value: '', label: 'Add Daypart' },
        altCategory: { value: 28, label: 'IHC' },
        categoryOptions: standardProps.categoryOptions,
        dayparts: standardProps.dayparts,
        daypartOnChange: jest.fn(),
        categoryOnChange: jest.fn(),
        selectNewDaypart: false,
        changeCurrentAltCategory: jest.fn(),
    };

    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ action: string; daypart: { value: string; ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ action: string; daypart: { value: string; ... Remove this comment to see the full error message
    const component = shallow(<DaypartRow {...props} />);

    expect(component.find(Select).props().value.value).toEqual(28);
    const changeCategoryEvent = jest.fn();
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ action: string; daypart: { value: string; ... Remove this comment to see the full error message
    const newCategory = { value: 12, label: 81 };
    expect(component.find(Select).props().selectNewDaypart).toBeFalsy();
    component.setProps({ changeCurrentAltCategory: changeCategoryEvent });
    component.find(Select).simulate('change', newCategory);
    expect(changeCategoryEvent).toHaveBeenCalled();
    component.setProps({ altCategory: newCategory });
    expect(component.find(Select).props().value.value).toEqual(12);
});

test('choosing new daypart with alt. category', () => {
    const props = {
        action: 'plus',
        daypart: { value: '', label: 'Add Daypart' },
        altCategory: { value: '', label: '' },
        categoryOptions: standardProps.categoryOptions,
        dayparts: standardProps.dayparts,
        daypartOnChange: jest.fn(),
        categoryOnChange: jest.fn(),
        selectNewDaypart: true,
    };
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ action: string; daypart: { value: string; ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { alternate: { 260: { catego... Remove this comment to see the full error message
    const component = shallow(<DaypartRow {...props} />);

    // daypart dropdown change
    const newDaypartSelection = { value: 9999, label: 'test' };
    const handleDaypartEvent = jest.fn();

    expect(component.find(Select).at(0).props().value).toEqual(props.daypart);
    component.setProps({ daypartOnChange: handleDaypartEvent });
    component.find(Select).at(0).simulate('change', newDaypartSelection);

    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ action: string; daypart: { value: string; ... Remove this comment to see the full error message
    expect(handleDaypartEvent).toHaveBeenCalledWith(newDaypartSelection);
    component.setProps({ daypart: newDaypartSelection });
    expect(component.find(Select).at(0).props().value).toEqual(newDaypartSelection);

    // alt. category change
    const newAltCategorySelection = { value: 8888, label: 'test alt cat' };
    const handleAltCatEvent = jest.fn();

    expect(component.find(Select).at(1).props().value).toEqual(props.altCategory);
    component.setProps({ categoryOnChange: handleAltCatEvent });
    component.find(Select).at(1).simulate('change', newAltCategorySelection);

    expect(handleAltCatEvent).toHaveBeenCalledWith(newAltCategorySelection);
    component.setProps({ altCategory: newAltCategorySelection });
    expect(component.find(Select).at(1).props().value).toEqual(newAltCategorySelection);
});

test('plus button to add new daypart/alt. cat to current dayparts', () => {
    const props = {
        action: 'plus',
        daypart: { value: '', label: 'Add Daypart' },
        altCategory: { value: '', label: '' },
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { alternate: { 260: { catego... Remove this comment to see the full error message
        categoryOptions: standardProps.categoryOptions,
        dayparts: standardProps.dayparts,
        daypartOnChange: jest.fn(),
        categoryOnChange: jest.fn(),
        selectNewDaypart: true,
        addNewDaypart: jest.fn(),
    };
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ action: string; daypart: { value: string; ... Remove this comment to see the full error message
    const component = mount(<DaypartRow {...props} />);
    expect(component.find('i.fa-plus')).toHaveLength(0);
    component.setProps({
        daypart: { value: 99, label: 'daypart' },
        altCategory: { value: 99, label: 'alt. cat' },
    });
    expect(component.find('i.fa-plus')).toHaveLength(1);

    const clickEvent = jest.fn();
    component.setProps({ addNewDaypart: clickEvent });
    component.find('i.fa-plus').simulate('click');
    expect(clickEvent).toHaveBeenCalled();
});

test('new daypart w/ alt. catagory added to current dayparts list', () => {
    const props = {
        ...standardProps,
        selectedSong: {
            ...standardProps.selectedSong,
            alternate: {
                260: { category_id: 1, gs_category: null },
                262: { category_id: 12, gs_category: 'P' },
                258: { category_id: 17, gs_category: null },
                // 246: { category_id: null, gs_category: 'P' }, // TODO: test when cat_id is null
            },
        },
    };
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ selectedSong: { alternate: { 260: { catego... Remove this comment to see the full error message
    const component = shallow(<DaypartSingleSong {...props} />);
    expect(component.find(DaypartRow)).toHaveLength(4);
});
