import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import HelpPage from './HelpPage.component';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './HelpPage.module.scss' or its... Remove this comment to see the full error message
import styles from './HelpPage.module.scss';

describe('<HelpPage />', () => {
    it('should render unauthorized page', () => {
        const component = shallow(<HelpPage contentType="unauthorized" />);

        expect(component).toBeDefined();
        expect(component.find(`.${styles.helpPageContainerContent}`)).toHaveLength(1);
        expect(component.find('a')).toHaveLength(1);
    });

    it('should render help page', () => {
        const component = shallow(<HelpPage contentType="help" />);

        expect(component).toBeDefined();
        expect(component.find(`.${styles.helpPageContainerContent}`)).toHaveLength(1);
        const testString = 'Please contact your administrator';
        expect(
            component
                .find(`.${styles.helpPageContainerContent}`)
                .text()
                .includes(testString),
        ).toBe(true);
    });
});
