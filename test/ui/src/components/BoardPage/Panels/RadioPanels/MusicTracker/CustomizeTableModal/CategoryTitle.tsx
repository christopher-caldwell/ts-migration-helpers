import React from 'react';
import { Checkbox } from 'react-bootstrap';

type Props = {
    beChecked: boolean;
    checked: boolean;
    title: string;
    onClick: (...args: any[]) => any;
    anchor?: React.ReactElement;
    disabled?: boolean;
    plusMinus?: React.ReactElement;
};

const CategoryTitle = ({ title, checked, disabled, onClick, beChecked, anchor, plusMinus }: Props) => (
    <div className="category-title">
        {beChecked ? (
            <Checkbox
                checked={checked}
                className="category-title-label p3"
                disabled={disabled}
                readOnly
                onClick={onClick}
            >
                {title}
            </Checkbox>
        ) : (
            <div className="category-title-label p3">{title}</div>
        )}
        {plusMinus}
        {anchor}
    </div>
);

CategoryTitle.defaultProps = {
    anchor: null,
    disabled: false,
    plusMinus: null,
};

export default CategoryTitle;
