import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Select from 'react-select-plus';
import classNames from 'classnames';

import escapeRegexCharacters from 'utils/escapeRegexCharacters';
import request from 'utils/request';

const COMPARE_LIMIT = 2;

class CompetitorSpins extends Component {
    constructor(props) {
        super(props);

        this.onCompareCompetitors = this.onCompareCompetitors.bind(this);
        this.loadOptions = this.loadOptions.bind(this);
    }

    onCompareCompetitors(competitors) {
        const { path, toggleCompetitors } = this.props;
        const { category: categoryId } = path;

        toggleCompetitors(categoryId, competitors);
    }

    loadOptions(input, callback) {
        const competitors = this.props.selectedCompetitors || [];
        const escapedValue = escapeRegexCharacters(input);
        const uriValue = encodeURIComponent(escapedValue);
        const hasCompetitors = competitors.length && competitors.length < COMPARE_LIMIT;
        const canLoad = input || escapedValue || hasCompetitors;

        if (!canLoad) {
            return callback(null, { options: [] });
        }

        return request(`/search/${uriValue}`, {
            params: { options: JSON.stringify({ size: 25 }) },
        })
            .then(results => {
                const options = results.station.entities.map(entity => ({
                    value: entity.id,
                    label: entity.station_call_letters,
                }));

                return { options };
            })
            .catch(e => {
                throw e;
            });
    }

    renderOption(option) {
        return (
            <div className="Select-custom-option">
                <div className="Select-custom-option-name">{option.label}</div>
            </div>
        );
    }

    renderValue(option) {
        return option.label;
    }

    render() {
        const competitors = this.props.selectedCompetitors || [];
        const isUnderLimit = competitors.length < COMPARE_LIMIT;

        return (
            <div className={classNames('category-item-competitors')}>
                <div className={classNames('compare-competitors-controls', 'competitor-spins')}>
                    <span className="competitor-label">Competitor Spins: </span>
                    <Select.Async
                        cache={false}
                        filterOption={() => isUnderLimit}
                        loadOptions={this.loadOptions}
                        onChange={this.onCompareCompetitors}
                        multi
                        noResultsText={isUnderLimit ? 'No results found' : 'Maximum stations selected'}
                        optionRenderer={this.renderOption}
                        placeholder="Station"
                        value={competitors}
                        valueRenderer={this.renderValue}
                    />
                </div>
            </div>
        );
    }
}

CompetitorSpins.propTypes = {
    path: PropTypes.shape({
        category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    toggleCompetitors: PropTypes.func.isRequired,
    selectedCompetitors: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]),
};

CompetitorSpins.defaultProps = { selectedCompetitors: [] };

export default CompetitorSpins;
