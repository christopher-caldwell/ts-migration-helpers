import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import connect from 'react-redux/lib/connect/connect';

import PropTypes from 'prop-types';
import { FormGroup, Radio } from 'react-bootstrap';

import { fetchFormats, fetchMarkets } from 'stores/lookupTables/lookupTablesActions';
import SortButton from 'components/Controls/SortButton';
import MultiSelect from 'components/Controls/MultiselectWithSearch';

const radioDomains = [
    {
        name: 'iHeart Only',
        value: 'iheart',
    },
    {
        name: 'Published Panel',
        value: 'published',
    },
];

const sortButtons = [
    {
        name: 'Call Letters',
        id: 'call_letters',
    },
    {
        name: 'Market Rank',
        id: 'market_rank',
    },
    {
        name: 'Station Name',
        id: 'station_name',
    },
];

const isSortFilter = true;

class RadioListFilter extends React.Component {
    static propTypes = {
        fetchFormats: PropTypes.func.isRequired,
        fetchMarkets: PropTypes.func.isRequired,
        filters: PropTypes.shape({
            domain: PropTypes.string,
            sort: PropTypes.shape({
                field: PropTypes.string,
                ascending: PropTypes.bool,
            }),
            formats: PropTypes.arrayOf(PropTypes.number),
            markets: PropTypes.arrayOf(PropTypes.number),
        }).isRequired,
        onFilterSave: PropTypes.func.isRequired,
        fetchingFormats: PropTypes.bool,
        fetchingMarkets: PropTypes.bool,
        formatsList: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.number,
            })
        ),
        marketsList: PropTypes.arrayOf(
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.number,
            })
        ),
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    static defaultProps = {
        fetchingFormats: true,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        fetchingMarkets: true,
        formatsList: [],
        marketsList: [],
    };

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        this.renderOptions = this.renderOptions.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
        this.renderSortButtons = this.renderSortButtons.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        this.handleSelectedChangedFormats = this.handleSelectedChangedFormats.bind(this);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
        this.handleSelectedChangedMarkets = this.handleSelectedChangedMarkets.bind(this);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
    }

    componentDidMount() {
        this.getFormats();
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        this.getMarkets();
    }

    // Radio Board Domains Filter
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchFormats' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchMarkets' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
    onChange(e) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'formatsSelected' implicitly has an 'any... Remove this comment to see the full error message
        const domainValue = e.currentTarget.value;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
            onFilterSave,
            filters: { formats, markets, domain, sort },
        } = this.props;

        if (domain === domainValue) {
            return;
        }

        onFilterSave({
            domain: domainValue,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'marketsSelected' implicitly has an 'any... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchFormats' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
            sort,
            formats,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchMarkets' does not exist on type 'Re... Remove this comment to see the full error message
            markets,
        });
    }

    // Radio Board Sort Filters
    onSortChange(sortKey) {
        const {
            onFilterSave,
            filters: { formats, markets, domain, sort },
        } = this.props;

        if (!sort.field || sort.field !== sortKey) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'formatsSelected' implicitly has an 'any... Remove this comment to see the full error message
            sort.field = sortKey;
            sort.ascending = true;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'formatsList' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
        } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'marketsList' does not exist on type 'Rea... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
            sort.ascending = !sort.ascending;
        }

        onFilterSave(
            {
                domain,
                sort,
                formats,
                markets,
            },
            isSortFilter
        );
    }

    getFormats() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'marketsSelected' implicitly has an 'any... Remove this comment to see the full error message
        this.props.fetchFormats({
            params: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
                options: JSON.stringify({
                    fields: ['format_name', 'format_id'],
                    order: 'format_name',
                }),
            },
        });
    }

    getMarkets() {
        this.props.fetchMarkets({
            params: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
                options: JSON.stringify({
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'formatsSelected' implicitly has an 'any... Remove this comment to see the full error message
                    fields: ['market_name', 'market_id'],
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
                    order: 'market_name',
                }),
            },
        });
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
    // Radio Board Formats Filters
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'params' implicitly has an 'any' type.
    handleSelectedChangedFormats(formatsSelected) {
        const {
            onFilterSave,
            filters: { markets, domain, sort },
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'marketsSelected' implicitly has an 'any... Remove this comment to see the full error message
        } = this.props;

        onFilterSave({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'formatsList' does not exist on type 'Rea... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
            domain,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
            sort,
            formats: formatsSelected,
            markets,
        });
    }

    // Radio Board Markets Filters
    handleSelectedChangedMarkets(marketsSelected) {
        const {
            onFilterSave,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
            filters: { formats, domain, sort },
        } = this.props;

        onFilterSave({
            domain,
            sort,
            formats,
            markets: marketsSelected,
        });
    }

    renderOptions() {
        const {
            filters: { domain },
        } = this.props;
        const domainSelected = domain;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
        return radioDomains.map(radioButton => (
            <Radio
                key={radioButton.value}
                inline
                name="radioList"
                value={radioButton.value}
                checked={domainSelected === radioButton.value}
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'formatsList' does not exist on type 'Rea... Remove this comment to see the full error message
                onChange={this.onChange}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchingMarkets' does not exist on type ... Remove this comment to see the full error message
            >
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type. */}
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message */}
                {radioButton.name}
            </Radio>
        ));
    }

    renderSortButtons() {
        const {
            filters: { sort },
        } = this.props;

        return sortButtons.map(button => (
            <SortButton
                key={button.id}
                sortKey={button.id}
                buttonText={button.name}
                onClick={this.onSortChange}
                sort={sort}
            />
        ));
    }

    render() {
        const {
            formatsList,
            marketsList,
            fetchingFormats,
            fetchingMarkets,
            filters: { formats, markets },
        } = this.props;
        let formatsSelected = [];
        let marketsSelected = [];

        if (!fetchingFormats) {
            formatsSelected = formats;
        }

        if (!fetchingMarkets) {
            marketsSelected = markets;
        }

        return (
            <div className="radio-board-filters">
                <FormGroup className="filter-group radio-published-filter">
                    <div className="checkbox-label">Show:</div>
                    {this.renderOptions()}
                </FormGroup>
                <MultiSelect
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                    options={formatsList}
                    selected={formatsSelected}
                    customLabel="Formats"
                    onSelectedChanged={this.handleSelectedChangedFormats}
                    isLoading={fetchingFormats}
                />
                <MultiSelect
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
                    options={marketsList}
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'params' implicitly has an 'any' type.
                    selected={marketsSelected}
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'params' implicitly has an 'any' type.
                    customLabel="Markets"
                    onSelectedChanged={this.handleSelectedChangedMarkets}
                    isLoading={fetchingMarkets}
                />
                <div className="sort-filters-container">
                    <div className="checkbox-label">Sort by:</div>
                    <div className="sort-buttons-container">{this.renderSortButtons()}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const lookupTables = state.lookupTables || {};
    return {
        formatsList: lookupTables.formats,
        fetchingFormats: lookupTables.fetchingFormats,
        marketsList: lookupTables.markets,
        fetchingMarkets: lookupTables.fetchingMarkets,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchFormats: params => dispatch(fetchFormats(params)),
    fetchMarkets: params => dispatch(fetchMarkets(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RadioListFilter);
