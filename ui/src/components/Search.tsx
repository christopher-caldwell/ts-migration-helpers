import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import connect from 'react-redux/lib/connect/connect';

import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { debounce, get, filter } from 'lodash';
import { Link } from 'react-router-dom';

import escapeRegexCharacters from 'utils/escapeRegexCharacters';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
import request from 'utils/request';
import {
    requestDateIntegrity,
    updateDateIntegrity,
} from 'stores/dateIntegrity/dateIntegrityActions';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
import history from '../history';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'suggestion' implicitly has an 'any' typ... Remove this comment to see the full error message
const mapTypeToPath = { station: 'radio', station_call: 'radio' };

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'section' implicitly has an 'any' type.
const icons = { Station: 'podcast' };

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
function getSuggestions(value) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'suggestion' implicitly has an 'any' typ... Remove this comment to see the full error message
    const escapedValue = escapeRegexCharacters(value);
    if (escapedValue === '') {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'section' implicitly has an 'any' type.
        return [];
    }

    const uriValue = encodeURIComponent(escapedValue);
    return request(`/suggest/${uriValue}`).then(results => results);
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'suggestion' implicitly has an 'any' typ... Remove this comment to see the full error message
function getSuggestionValue(suggestion) {
    return suggestion.name;
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'section' implicitly has an 'any' type.
function getSectionSuggestions(section) {
    const type = get(section, 'type', '');
    const entities = get(section, 'entities', '');
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateDateIntegrityAction' does not exis... Remove this comment to see the full error message
    const typeToPath = get(mapTypeToPath, type, '');

    return (typeToPath && entities) || [];
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'suggestion' implicitly has an 'any' typ... Remove this comment to see the full error message
class Search extends React.Component {
    constructor(props) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'then' does not exist on type 'never[] | ... Remove this comment to see the full error message
        super(props);
        // initialize the date integrity on the first load
        const { requestDateIntegrityAction } = props;
        requestDateIntegrityAction();

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'section' implicitly has an 'any' type.
        this.state = {
            value: '',
            suggestions: [],
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateDateIntegrityAction' does not exis... Remove this comment to see the full error message
        this.onSuggestionsFetchRequested = debounce(this.onSuggestionsFetchRequested, 300);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
        this.renderSuggestion = this.renderSuggestion.bind(this);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'containerProps' implicitly has an... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'newValue' implicitly has an 'any'... Remove this comment to see the full error message
    onChange = (event, { newValue }) => this.setState({ value: newValue });

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'suggestion' implicitly has an 'any' typ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message
    onSuggestionsFetchRequested = ({ value }) =>
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'then' does not exist on type 'never[] | ... Remove this comment to see the full error message
        getSuggestions(value).then(suggestions => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'section' implicitly has an 'any' type.
            this.setState({ suggestions: filter(suggestions, fill => fill) });
        });

    onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
    onValueClearRequested = () => this.setState({ value: '', suggestions: [] });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateDateIntegrityAction' does not exis... Remove this comment to see the full error message
    onSuggestionSelected = () => {
        const { updateDateIntegrityAction } = this.props;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        updateDateIntegrityAction({ persist: true });

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        this.setState({ value: '', suggestions: [] });
    };

    onEnterKey = e => {
        e.preventDefault();
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'containerProps' implicitly has an... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const uriValue = encodeURIComponent(this.state.value);

        if (this.state.value) {
            history.push(`/results/Stations/${uriValue}`);
        }

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'suggestion' implicitly has an 'any' typ... Remove this comment to see the full error message
        this.setState({ value: '', suggestions: [] });
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    renderSuggestion(suggestion) {
        const path = mapTypeToPath[suggestion.type];
        return (
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
            <Link to={`/board/${path}/${suggestion.id}`}>
                <div className={`search-item-name ${suggestion.type}`}>{suggestion.name}</div>
                <div className="search-sub-item-name">{suggestion.sub_name}</div>
            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message */}
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'section' implicitly has an 'any' type. */}
            </Link>
        );
    }

    renderSectionTitle = section => {
        const type = get(section, 'type', '');
        const entities = get(section, 'entities', '');
        const typeToPath = get(mapTypeToPath, type, '');

        if (!typeToPath || !entities || (type && !entities.length)) return false;
        return (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
            <Link
                to={`/results/${section.type}s/${this.state.value}`}
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                onClick={this.onSuggestionsClearRequested}
            >
                <i className={`search-section-icon fa fa-${icons[section.type]}`} />
                <span className="section-title">{section.type}</span>
                <div className="link-indicator">
                    {`Search ${section.type}s`}
                    {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'containerProps' implicitly has an... Remove this comment to see the full error message */}
                    <i className="fa fa-chevron-right" />
                {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'query' implicitly has an 'any' ty... Remove this comment to see the full error message */}
                </div>
            </Link>
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
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
                        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type. */}
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
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
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
