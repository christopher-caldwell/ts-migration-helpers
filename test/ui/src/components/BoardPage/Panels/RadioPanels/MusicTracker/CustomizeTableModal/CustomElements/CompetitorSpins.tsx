// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import React, { Component } from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'competitors' implicitly has an 'any' ty... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'path' does not exist on type 'Readonly<{... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import Select from 'react-select-plus';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'competitors' implicitly has an 'any' ty... Remove this comment to see the full error message
import classNames from 'classnames';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'path' does not exist on type 'Readonly<{... Remove this comment to see the full error message
import escapeRegexCharacters from 'utils/escapeRegexCharacters';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
import request from 'utils/request';

const COMPARE_LIMIT = 2;

class CompetitorSpins extends Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);

        this.onCompareCompetitors = this.onCompareCompetitors.bind(this);
        this.loadOptions = this.loadOptions.bind(this);
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'competitors' implicitly has an 'any' ty... Remove this comment to see the full error message
    onCompareCompetitors(competitors) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'path' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
        const { path, toggleCompetitors } = this.props;
        const { category: categoryId } = path;

        toggleCompetitors(categoryId, competitors);
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
    loadOptions(input, callback) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
        const competitors = this.props.selectedCompetitors || [];
        const escapedValue = escapeRegexCharacters(input);
        const uriValue = encodeURIComponent(escapedValue);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        const hasCompetitors = competitors.length && competitors.length < COMPARE_LIMIT;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedCompetitors' does not exist on t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const canLoad = input || escapedValue || hasCompetitors;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        if (!canLoad) {
            return callback(null, { options: [] });
        }

        return request(`/search/${uriValue}`, {
            params: { options: JSON.stringify({ size: 25 }) },
        })
            .then(results => {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
                const options = results.station.entities.map(entity => ({
                    value: entity.id,
                    label: entity.station_call_letters,
                }));

                return { options };
            })
            .catch(e => {
                throw e;
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
            });
    }

    renderOption(option) {
        return (
            <div className="Select-custom-option">
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type. */}
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                <div className="Select-custom-option-name">{option.label}</div>
            </div>
        );
    }

    renderValue(option) {
        return option.label;
    }

    render() {
        const competitors = this.props.selectedCompetitors || [];
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const isUnderLimit = competitors.length < COMPARE_LIMIT;

        return (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
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
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
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
