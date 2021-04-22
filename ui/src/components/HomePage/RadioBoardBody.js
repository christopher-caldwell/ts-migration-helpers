import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Image from 'components/Utilities/Image';

class RadioBoardBody extends React.Component {
    static propTypes = {
        href: PropTypes.string.isRequired,
        summary: PropTypes.objectOf(PropTypes.any).isRequired,
    };

    render() {
        const { href, summary, id, setCurrentStation } = this.props;

        return (
            <div className="home-board-body">
                <Link
                    className="home-board-metrics"
                    to={href}
                    onClick={() => setCurrentStation(id)}
                >
                    <div className="home-board-radio-name-section">
                        <div className="home-board-radio-name">{summary.name}</div>
                        <div className="home-board-radio-call">{summary.call_letters}</div>
                        <div className="home-board-radio-location">{summary.location}</div>
                        <div className="home-board-radio-logo">
                            <Image alt="station logo" src={summary.image_url} />
                        </div>
                        <div className="home-board-radio-owner">{summary.owner}</div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default RadioBoardBody;
