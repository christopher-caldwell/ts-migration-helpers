import React from 'react';
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
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.number,
            })
        ),
    };

    static defaultProps = {
        fetchingFormats: true,
        fetchingMarkets: true,
        formatsList: [],
        marketsList: [],
    };

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.renderSortButtons = this.renderSortButtons.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.handleSelectedChangedFormats = this.handleSelectedChangedFormats.bind(this);
        this.handleSelectedChangedMarkets = this.handleSelectedChangedMarkets.bind(this);
    }

    componentDidMount() {
        this.getFormats();
        this.getMarkets();
    }

    // Radio Board Domains Filter
    onChange(e) {
        const domainValue = e.currentTarget.value;
        const {
            onFilterSave,
            filters: { formats, markets, domain, sort },
        } = this.props;

        if (domain === domainValue) {
            return;
        }

        onFilterSave({
            domain: domainValue,
            sort,
            formats,
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
            sort.field = sortKey;
            sort.ascending = true;
        } else {
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
        this.props.fetchFormats({
            params: {
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
                options: JSON.stringify({
                    fields: ['market_name', 'market_id'],
                    order: 'market_name',
                }),
            },
        });
    }

    // Radio Board Formats Filters
    handleSelectedChangedFormats(formatsSelected) {
        const {
            onFilterSave,
            filters: { markets, domain, sort },
        } = this.props;

        onFilterSave({
            domain,
            sort,
            formats: formatsSelected,
            markets,
        });
    }

    // Radio Board Markets Filters
    handleSelectedChangedMarkets(marketsSelected) {
        const {
            onFilterSave,
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

        return radioDomains.map(radioButton => (
            <Radio
                key={radioButton.value}
                inline
                name="radioList"
                value={radioButton.value}
                checked={domainSelected === radioButton.value}
                onChange={this.onChange}
            >
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
                    options={formatsList}
                    selected={formatsSelected}
                    customLabel="Formats"
                    onSelectedChanged={this.handleSelectedChangedFormats}
                    isLoading={fetchingFormats}
                />
                <MultiSelect
                    options={marketsList}
                    selected={marketsSelected}
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
