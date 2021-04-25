import React from 'react';

import ColumnGroupHeader from '../ColumnGroupHeader';
import ColumnHeaders from '../ColumnHeaders';
import TitleArtistCell from '../TitleArtistCell';
import TextCell from '../TextCell';
import Row from '../Row';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../ColumnGroups/ColumnGroups.m... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../ColumnGroups/ColumnGroups.m... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../ColumnGroups/ColumnGroups.m... Remove this comment to see the full error message
import { columnGroup } from '../ColumnGroups/ColumnGroups.module.css';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songOrder' implicitly has an 'any... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SongInfo.module.css' or its ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songOrder' implicitly has an 'any... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
import { titleArtistCustom, titleVersionCustom, songInfoColumnGroup } from './SongInfo.module.css';

const headerSetup = {
    titleArtist: { name: 'Title/Artist', addedStyle: titleArtistCustom, width: 200 },
    version: { name: 'Version', addedStyle: titleVersionCustom, width: 150 },
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
const SongInfo = ({ songOrder, songMetadata, columnKeys }) => songMetadata && songOrder.length ? (
    <div className={`${columnGroup} ${songInfoColumnGroup}`}>
        <ColumnGroupHeader name="Song Information" />
        <ColumnHeaders columnKeys={columnKeys} headerSetup={headerSetup} />
        {songOrder.map(songId => {
            const { songName, artistName, version = '-' } = songMetadata[songId] || {};
            const cellPicker = {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
                titleArtist: (
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
                        key="version"
                        text={version}
                        addedStyle={headerSetup.version.addedStyle}
                        width={headerSetup.version.width}
                    />
                ),
            };
            const cells = columnKeys.map(columnKey => cellPicker[columnKey]);
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            return <Row key={songId} cells={cells} />;
        })}
    </div>
) : null;

export { SongInfo as default, headerSetup };
