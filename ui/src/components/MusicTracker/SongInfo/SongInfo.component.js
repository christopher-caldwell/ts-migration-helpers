import React from 'react';

import ColumnGroupHeader from '../ColumnGroupHeader';
import ColumnHeaders from '../ColumnHeaders';
import TitleArtistCell from '../TitleArtistCell';
import TextCell from '../TextCell';
import Row from '../Row';

import { columnGroup } from '../ColumnGroups/ColumnGroups.module.css';
import { titleArtistCustom, titleVersionCustom, songInfoColumnGroup } from './SongInfo.module.css';

const headerSetup = {
    titleArtist: { name: 'Title/Artist', addedStyle: titleArtistCustom, width: 200 },
    version: { name: 'Version', addedStyle: titleVersionCustom, width: 150 },
};

const SongInfo = ({ songOrder, songMetadata, columnKeys }) => songMetadata && songOrder.length ? (
    <div className={`${columnGroup} ${songInfoColumnGroup}`}>
        <ColumnGroupHeader name="Song Information" />
        <ColumnHeaders columnKeys={columnKeys} headerSetup={headerSetup} />
        {songOrder.map(songId => {
            const { songName, artistName, version = '-' } = songMetadata[songId] || {};
            const cellPicker = {
                titleArtist: (
                    <TitleArtistCell
                        key="titleArtist"
                        width={headerSetup.titleArtist.width}
                        songId={songId}
                        songName={songName}
                        artistName={artistName}
                    />
                ),
                version: (
                    <TextCell
                        key="version"
                        text={version}
                        addedStyle={headerSetup.version.addedStyle}
                        width={headerSetup.version.width}
                    />
                ),
            };
            const cells = columnKeys.map(columnKey => cellPicker[columnKey]);
            return <Row key={songId} cells={cells} />;
        })}
    </div>
) : null;

export { SongInfo as default, headerSetup };
