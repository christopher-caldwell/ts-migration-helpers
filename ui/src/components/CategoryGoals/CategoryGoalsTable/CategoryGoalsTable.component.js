import React from 'react';
import style from './CategoryGoalsTable.module.scss';

const CategoryGoalsTable = ({ categoryList, handleIdealCount }) => {
    const categoryGoalsTableElement = () =>
        categoryList.map(category => {
            const { id, label, description, group, active, readOnly, limit } = category;
            const key = `category-goals-${id}-${label}`;

            return (
                <div className={style.tableRow} key={key}>
                    <div className={`${style.tableCol} ${style.colCatCode}`}>{label}</div>
                    <div className={`${style.tableCol} ${style.colCatName}`}>{description}</div>
                    <div className={`${style.tableCol} ${style.colCatGroup}`}>{group}</div>
                    <div className={`${style.tableCol} ${style.colBoolean}`}>
                        {active ? 'Yes' : 'No'}
                    </div>
                    <div className={`${style.tableCol} ${style.colBoolean}`}>
                        {readOnly ? 'Yes' : 'No'}
                    </div>
                    <div className={`${style.tableCol} ${style.colIdealCount}`}>
                        <input
                            className={`ml-input ${style.input}`}
                            disabled={!active}
                            type="text"
                            value={limit || ''}
                            onChange={e => {
                                handleIdealCount(e, id);
                            }}
                        />
                    </div>
                </div>
            );
        });

    return (
        <div className={style.tableContainer}>
            <div className={style.table}>
                <div className={style.tableHeader}>
                    <div className={style.tableRow}>
                        <div className={`${style.tableCol} ${style.colCatCode}`}>Category Code</div>
                        <div className={`${style.tableCol} ${style.colCatName}`}>Category Name</div>
                        <div className={`${style.tableCol} ${style.colCatGroup}`}>
                            Category Group
                        </div>
                        <div className={`${style.tableCol} ${style.colBoolean}`}>Enabled</div>
                        <div className={`${style.tableCol} ${style.colBoolean}`}>Read-only</div>
                        <div className={`${style.tableCol} ${style.colIdealCount}`}>
                            Ideal Count
                        </div>
                    </div>
                </div>
                <div className={style.tableContent}>{categoryGoalsTableElement()}</div>
            </div>
        </div>
    );
};

export default CategoryGoalsTable;
