import React from 'react';

import RadioListFilter from 'components/HomePage/Filters/RadioFilters/RadioListFilter';

class RadioHeader extends React.Component {
    render() {
        return (
            <div className="dashboard-header">
                <RadioListFilter {...this.props} />
            </div>
        );
    }
}

export default RadioHeader;
