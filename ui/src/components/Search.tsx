import React from 'react';
import connect from 'react-redux/lib/connect/connect';

import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { debounce, get, filter } from 'lodash';
import { Link } from 'react-router-dom';

import escapeRegexCharacters from 'utils/escapeRegexCharacters';
import request from 'utils/request';
import {
    requestDateIntegrity,
    updateDateIntegrity,
} from 'stores/dateIntegrity/dateIntegrityActions';
import history from '../history';

const mapTypeToPath = { station: 'radio', station_call: 'radio' };

const icons = { Station: 'podcast' };

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value);
    if (escapedValue === '') {
        return [];
    }

    const uriValue = encodeURIComponent(escapedValue);
    return request(`/suggest/${uriValue}`).then(results => results);
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function getSectionSuggestions(section) {
    const type = get(section, 'type', '');
    const entities = get(section, 'entities', '');
    const typeToPath = get(mapTypeToPath, type, '');

    return (typeToPath && entities) || [];
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        // initialize the date integrity on the first load
        const { requestDateIntegrityAction } = props;
        requestDateIntegrityAction();

        this.state = {
            value: '',
            suggestions: [],
        };

        this.onSuggestionsFetchRequested = debounce(this.onSuggestionsFetchRequested, 300);
        this.renderSuggestion = this.renderSuggestion.bind(this);
    }

    onChange = (event, { newValue }) => this.setState({ value: newValue });

    onSuggestionsFetchRequested = ({ value }) =>
        getSuggestions(value).then(suggestions => {
            this.setState({ suggestions: filter(suggestions, fill => fill) });
        });

    onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

    onValueClearRequested = () => this.setState({ value: '', suggestions: [] });

    onSuggestionSelected = () => {
        const { updateDateIntegrityAction } = this.props;
        updateDateIntegrityAction({ persist: true });

        this.setState({ value: '', suggestions: [] });
    };

    onEnterKey = e => {
        e.preventDefault();
        const uriValue = encodeURIComponent(this.state.value);

        if (this.state.value) {
            history.push(`/results/Stations/${uriValue}`);
        }

        this.setState({ value: '', suggestions: [] });
    };

    renderSuggestion(suggestion) {
        const path = mapTypeToPath[suggestion.type];
        return (
            <Link to={`/board/${path}/${suggestion.id}`}>
                <div className={`search-item-name ${suggestion.type}`}>{suggestion.name}</div>
                <div className="search-sub-item-name">{suggestion.sub_name}</div>
            </Link>
        );
    }

    renderSectionTitle = section => {
        const type = get(section, 'type', '');
        const entities = get(section, 'entities', '');
        const typeToPath = get(mapTypeToPath, type, '');

        if (!typeToPath || !entities || (type && !entities.length)) return false;
        return (
            <Link
                to={`/results/${section.type}s/${this.state.value}`}
                onClick={this.onSuggestionsClearRequested}
            >
                <i className={`search-section-icon fa fa-${icons[section.type]}`} />
                <span className="section-title">{section.type}</span>
                <div className="link-indicator">
                    {`Search ${section.type}s`}
                    <i className="fa fa-chevron-right" />
                </div>
            </Link>
        );
    };

    renderSuggestionsContainer = ({ containerProps, children, query }) => (
        <div {...containerProps}>
            {children}
            <div className="react-autosuggest__section-title">
                <Link
                    to={`/results/Stations/${encodeURIComponent(query)}`}
                    onClick={this.onSuggestionsClearRequested}
                >
                    <i className="search-section-icon fa fa-list" />
                    <span className="section-title">ALL</span>
                    <div className="link-indicator">
                        Show All Station Results
                        <i className="fa fa-chevron-right" />
                    </div>
                </Link>
            </div>
        </div>
    );

    renderClearButton(value) {
        if (value === '') return null;

        return (
            <button title="Clear search" type="button" onClick={this.onValueClearRequested}>
                <i className="fa fa-times" />
            </button>
        );
    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Search for stations',
            value,
            onChange: this.onChange,
        };

        return (
            <div className="navbar-search">
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="fa fa-search" />
                    </span>
                    <form className="search-results" onSubmit={this.onEnterKey}>
                        <Autosuggest
                            getSectionSuggestions={getSectionSuggestions}
                            getSuggestionValue={getSuggestionValue}
                            inputProps={inputProps}
                            multiSection
                            renderSuggestion={this.renderSuggestion}
                            renderSuggestionsContainer={this.renderSuggestionsContainer}
                            renderSectionTitle={this.renderSectionTitle}
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            onSuggestionSelected={this.onSuggestionSelected}
                        />
                    </form>
                    <span className="input-group-addon">{this.renderClearButton(value)}</span>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    requestDateIntegrityAction: PropTypes.func.isRequired,
    updateDateIntegrityAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    requestDateIntegrityAction: requestDateIntegrity,
    updateDateIntegrityAction: updateDateIntegrity,
};

export default connect(null, mapDispatchToProps)(Search);
