import isFeatureActive from 'utils/featureToggle';

describe('utils/featureToggle', () => {
    it('should enable feature', () => {
        const mockFeatureToggle = {
            system: {
                PacketSong: {
                    FeatureName: 'PacketSong',
                    Enabled: true,
                    FeatureByStation: false,
                },
            },
            station: {},
        };
        const result = isFeatureActive(
            mockFeatureToggle,
            'PacketSong',
        );
        expect(result).toBeTruthy();
    });

    it('should disable feature', () => {
        const mockFeatureToggle = {
            system: {},
            station: {},
        };
        const result = isFeatureActive(
            mockFeatureToggle,
            'PacketSong',
        );
        expect(result).toBeFalsy();
    });

    it('should enable feature when Feature Toggle by system and station has the same name', () => {
        const mockFeatureToggle = {
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
        const result = isFeatureActive(
            mockFeatureToggle,
            'PacketSong',
        );
        expect(result).toBeTruthy();
    });

    it('should disable feature when has FeatureByStation enabled, but station feature is disabled', () => {
        const mockFeatureToggle = {
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
        const result = isFeatureActive(
            mockFeatureToggle,
            'PacketSong',
        );
        expect(result).toBeFalsy();
    });
});
