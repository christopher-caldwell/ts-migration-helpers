import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import FeatureToggle from 'components/FeatureToggle';

const mockFeatures = {
    system: {
        PacketSong: {
            FeatureName: 'PacketSong',
            Enabled: true,
            FeatureByStation: false,
        },
    },
    station: {},
};
const mockStore = configureStore();
const store = mockStore({
    featureToggle: mockFeatures,
});
const renderFeatureToggle = (options = {}) => (
    shallow(
        <FeatureToggle
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
