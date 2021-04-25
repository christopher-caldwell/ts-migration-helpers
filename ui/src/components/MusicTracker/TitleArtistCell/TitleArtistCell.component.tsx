import React from 'react';

import Checkbox from 'components/Checkbox';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './TitleArtistCell.module.css' ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './TitleArtistCell.module.css' ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './TitleArtistCell.module.css' ... Remove this comment to see the full error message
import { container, titleArtist, text } from './TitleArtistCell.module.css';

const TitleArtistCell = ({ songName, songId, artistName, width }) => (
    <div className={container} style={{ width }}>
        <Checkbox id={songId} isChecked={false} handleCheck={() => {}} />
        <div className={titleArtist}>
            <p className={text}>{songName}</p>
            <p className={text}>{artistName}</p>
        </div>
    </div>
);

export default TitleArtistCell;
