import React from 'react';
import { shallow } from 'enzyme';
import MusicPlayer from 'components/Director/Components/MusicPlayer';

const renderMusicPlayer = (options = {}) => (
    shallow(
        <MusicPlayer
            song={options.song || 1}
            onSelectSong={options.onSelectSong || (() => { })}
        />,
    )
);

describe('<MusicPlayer />', () => {
    it('Should component render', () => {
        const mockOnSelectSong = jest.fn();
        const component = renderMusicPlayer({
            song: 1,
            onSelectSong: mockOnSelectSong,
        });
        expect(component.find('.music-player-container')).toHaveLength(1);
        expect(component.find('.fa-backward')).toHaveLength(1);
    });

    it('Should playerCreator return player', () => {
        const mockEvent = { target: { value: 'test' } };
        const component = renderMusicPlayer();
        const spyOnPlayerCreator = jest.spyOn(component.instance(), 'playerCreator');
        component.instance().playerCreator(mockEvent);
        expect(spyOnPlayerCreator).toHaveBeenCalled();
    });

    it('Should render play button when state is not playing', () => {
        const component = renderMusicPlayer();
        expect(component.find('.fa-play')).toHaveLength(1);
        expect(component.find('.fa-pause')).toHaveLength(0);
    });

    it('Should render pause button when state is playing', () => {
        const component = renderMusicPlayer();
        component.setState({ playerStatus: 'playing' });
        expect(component.find('.fa-pause')).toHaveLength(1);
        expect(component.find('.fa-play')).toHaveLength(0);
    });

    it('Should rewind be triggered when current time is less than 10', () => {
        const mockOnSelectSong = jest.fn();
        const mockEvent = {
            current: {
                currentTime: 9,
            },
        };
        const component = renderMusicPlayer({
            song: 1,
            onSelectSong: mockOnSelectSong,
        });
        component.instance().playerCreator(mockEvent);
        const spyRewind = jest.spyOn(component.instance(), 'rewind');
        component.instance().rewind();
        expect(spyRewind).toHaveBeenCalled();
    });

    it('Should rewind be triggered when current time is greather than 10', () => {
        const mockOnSelectSong = jest.fn();
        const mockEvent = {
            current: {
                currentTime: 15,
            },
        };
        const component = renderMusicPlayer({
            song: 1,
            onSelectSong: mockOnSelectSong,
        });
        component.instance().playerCreator(mockEvent);
        const spyRewind = jest.spyOn(component.instance(), 'rewind');
        component.instance().rewind();
        expect(spyRewind).toHaveBeenCalled();
    });

    it('Should foward be triggered when current time is less than duration', () => {
        const mockOnSelectSong = jest.fn();
        const mockEvent = {
            current: {
                currentTime: 5,
                duration: 20,
            },
        };
        const component = renderMusicPlayer({
            song: 1,
            onSelectSong: mockOnSelectSong,
        });
        component.instance().playerCreator(mockEvent);
        const spyforward = jest.spyOn(component.instance(), 'forward');
        component.instance().forward();
        expect(spyforward).toHaveBeenCalled();
    });

    it('Should foward be triggered when current time is greather than duration', () => {
        const mockOnSelectSong = jest.fn();
        const mockEvent = {
            current: {
                currentTime: 15,
                duration: 20,
            },
        };
        const component = renderMusicPlayer({
            song: 1,
            onSelectSong: mockOnSelectSong,
        });
        component.instance().playerCreator(mockEvent);
        const spyforward = jest.spyOn(component.instance(), 'forward');
        component.instance().forward();
        expect(spyforward).toHaveBeenCalled();
    });

    it('Should end() update state', () => {
        const mockOnSelectSong = jest.fn();
        const mockEvent = {
            current: {
                currentTime: 10,
            },
        };
        const component = renderMusicPlayer({
            song: 1,
            onSelectSong: mockOnSelectSong,
        });
        const oldState = component.state();
        const spyOnPlayerCreator = jest.spyOn(component.instance(), 'playerCreator');
        component.instance().playerCreator(mockEvent);
        const spyEnd = jest.spyOn(component.instance(), 'end');
        component.instance().end();
        const newState = component.state();
        expect(spyOnPlayerCreator).toHaveBeenCalled();
        expect(spyEnd).toHaveBeenCalled();
        expect(oldState).not.toBe(newState);
    });

    it('Should pause() update state', () => {
        const mockOnSelectSong = jest.fn();
        const mockPause = jest.fn();
        const mockEvent = {
            current: {
                currentTime: 10,
                pause: mockPause,
            },
        };
        const component = renderMusicPlayer({
            song: 1,
            onSelectSong: mockOnSelectSong,
        });
        const oldState = component.state();
        const spyOnPlayerCreator = jest.spyOn(component.instance(), 'playerCreator');
        component.instance().playerCreator(mockEvent);
        const spyPause = jest.spyOn(component.instance(), 'pause');
        component.instance().pause();
        const newState = component.state();
        expect(spyOnPlayerCreator).toHaveBeenCalled();
        expect(mockPause).toHaveBeenCalled();
        expect(spyPause).toHaveBeenCalled();
        expect(oldState).not.toBe(newState);
    });

    it('Should play() update state', () => {
        const mockOnSelectSong = jest.fn();
        const mockPlay = jest.fn();
        const mockEvent = {
            current: {
                currentTime: 10,
                play: mockPlay,
            },
        };
        const component = renderMusicPlayer({
            song: 1,
            onSelectSong: mockOnSelectSong,
        });
        const oldState = component.state();
        const spyOnPlayerCreator = jest.spyOn(component.instance(), 'playerCreator');
        component.instance().playerCreator(mockEvent);
        const spyPlay = jest.spyOn(component.instance(), 'play');
        component.instance().play();
        const newState = component.state();
        expect(spyOnPlayerCreator).toHaveBeenCalled();
        expect(mockPlay).toHaveBeenCalled();
        expect(spyPlay).toHaveBeenCalled();
        expect(oldState).not.toBe(newState);
    });
});
