import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2786) FIXME: 'HeaderCompare' cannot be used as a JSX component.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type '{}'.
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2786) FIXME: 'HeaderCompare' cannot be used as a JSX component.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onSongClear' does not exist on type '{}'... Remove this comment to see the full error message
import HeaderCompare from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Components/HeaderCompare';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'onSongCompare' does not exist on type '{... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type '{}'.
const renderHeaderCompare = (options = {}) => (
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(2786) FIXME: 'HeaderCompare' cannot be used as a JSX component.
    shallow(
        <HeaderCompare
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSongClear' does not exist on type '{}'... Remove this comment to see the full error message
            isCompareDisabled={options.isCompareDisabled || true}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSongCompare' does not exist on type '{... Remove this comment to see the full error message
            loading={options.loading || true}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onToggleTrends' does not exist on type '... Remove this comment to see the full error message
            trendsEnabled={options.loading || true}
            onFilterSave={options.onFilterSave || (() => {})}
            onSongClear={options.onSongClear || (() => {})}
            onSongCompare={options.onSongCompare || (() => {})}
            onToggleTrends={options.onToggleTrends || (() => {})}
        />,
    )
);

describe('<HeaderCompare />', () => {
    it('should render component', () => {
        const component = renderHeaderCompare();
        expect(component.find('.music-tracker-filters')).toHaveLength(1);
        component.find('button').at(0).simulate('click');
    });
});
