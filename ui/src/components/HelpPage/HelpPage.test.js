import React from 'react';
import { shallow } from 'enzyme';
import HelpPage from './HelpPage.component';
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
