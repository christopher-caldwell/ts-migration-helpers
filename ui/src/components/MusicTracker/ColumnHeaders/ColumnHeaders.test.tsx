import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import ColumnHeaders from './ColumnHeaders.component';
import { headerSetup as songInfoSetup } from '../SongInfo/SongInfo.component';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'button' implicitly has an 'any' type.
test('output when called inside song info group', () => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const props = { columnKeys: ['titleArtist', 'version'], headerSetup: songInfoSetup };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'button' implicitly has an 'any' type.
    const component = shallow(<ColumnHeaders {...props} />);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    expect(component.find('div.columnHeaders')).toHaveLength(1);
    component.find('button.columnHeader').forEach((button, index) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        expect(button.text()).toBe(songInfoSetup[props.columnKeys[index]].name);
    });
});
