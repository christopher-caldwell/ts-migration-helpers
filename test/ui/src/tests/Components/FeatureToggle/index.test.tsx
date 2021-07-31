import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'featureName' does not exist on type '{}'... Remove this comment to see the full error message
import FeatureToggle from 'components/FeatureToggle';

// @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
const mockFeatures = {
    system: {
        PacketSong: {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'store' does not exist on type '{}'.
            FeatureName: 'PacketSong',
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'features' does not exist on type '{}'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'featureName' does not exist on type '{}'... Remove this comment to see the full error message
            Enabled: true,
            FeatureByStation: false,
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
        },
    },
    station: {},
};
// @ts-expect-error ts-migrate(2339) FIXME: Property 'store' does not exist on type '{}'.
const mockStore = configureStore();
const store = mockStore({
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'features' does not exist on type '{}'.
    featureToggle: mockFeatures,
});
// @ts-expect-error ts-migrate(2339) FIXME: Property 'innerComponent' does not exist on type '... Remove this comment to see the full error message
const renderFeatureToggle = (options = {}) => (
    shallow(
        <FeatureToggle
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
            featureName={options.featureName || 'featureName'}
            fallback={<div>Fallback</div>}
            store={options.store || store}
            features={options.features || {}}
        >
            {options.innerComponent || ''}
        </FeatureToggle>,
    ).dive()
);

describe('<FeatureToggle />', () => {
    it('should render fallback', () => {
        const component = renderFeatureToggle();
        expect(component.find('div').text()).toBe('Fallback');
    });

    it('should render inner component', () => {
        const component = renderFeatureToggle({
            featureName: 'PacketSong',
            innerComponent: <div>Render Component</div>,
        });
        expect(component.find('div').text()).toBe('Render Component');
    });

    it('should render inner component when has Feature Toggle by system and station with the same name', () => {
        const mockFeaturesTest = {
            system: {
                PacketSong: {
                    FeatureName: 'PacketSong',
                    Enabled: true,
                    FeatureByStation: true,
                },
            },
            station: {
                PacketSong: {
                    FeatureName: 'PacketSong',
                    Enabled: true,
                },
            },
        };
        const mockStoreTest = mockStore({
            featureToggle: mockFeaturesTest,
        });
        const component = renderFeatureToggle({
            featureName: 'PacketSong',
            innerComponent: <div>Render Component</div>,
            store: mockStoreTest,
        });
        expect(component.find('div').text()).toBe('Render Component');
    });

    it('should render fallback when has FeatureByStation is enabled, but station feature is disabled', () => {
        const mockFeaturesTest = {
            system: {
                PacketSong: {
                    FeatureName: 'PacketSong',
                    Enabled: true,
                    FeatureByStation: true,
                },
            },
            station: {
                PacketSong: {
                    FeatureName: 'PacketSong',
                    Enabled: false,
                },
            },
        };
        const mockStoreTest = mockStore({
            featureToggle: mockFeaturesTest,
        });
        const component = renderFeatureToggle({
            featureName: 'PacketSong',
            store: mockStoreTest,
        });
        expect(component.find('div').text()).toBe('Fallback');
    });
});
