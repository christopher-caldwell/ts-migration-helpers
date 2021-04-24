import React from 'react';
import { shallow } from 'enzyme';

import HeaderCompare from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Components/HeaderCompare';

const renderHeaderCompare = (options = {}) => (
    shallow(
        <HeaderCompare
            isCompareDisabled={options.isCompareDisabled || true}
            loading={options.loading || true}
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
