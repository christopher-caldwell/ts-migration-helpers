import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import moment from 'moment';
import getNumberWithComma from 'utils/NumberFunctions';
import ButtonCell from 'components/BoardPage/Panels/RadioPanels/MusicTracker/ButtonCell';
import CheckboxCell from 'components/BoardPage/Panels/RadioPanels/MusicTracker/CheckboxCell';
import PercentCell from 'components/BoardPage/Panels/RadioPanels/MusicTracker/PercentCell';
import QuintileCell from 'components/BoardPage/Panels/RadioPanels/MusicTracker/QuintileCell';
import TierTrendCell from 'components/BoardPage/Panels/RadioPanels/MusicTracker/TierTrendCell';
import TextCell from 'components/BoardPage/Panels/RadioPanels/MusicTracker/TextCell';
import DateCell from 'components/BoardPage/Panels/RadioPanels/MusicTracker/DateCell';
import DropdownCell from 'components/BoardPage/Panels/RadioPanels/MusicTracker/DropdownCell';
import utils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';
import isEmpty from 'lodash/isEmpty';
import TooltipColumnGroupHeader from 'components/BoardPage/Panels/RadioPanels/MusicTracker/TooltipColumnGroupHeader';

const makeColumnMap = ({
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'callLetter' implicitly has an 'an... Remove this comment to see the full error message
    callLetter,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message
    data,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'isCompareEnabled' implicitly has ... Remove this comment to see the full error message
    isCompareEnabled,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'stationCategories' implicitly has... Remove this comment to see the full error message
    stationCategories,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'selectSong' implicitly has an 'an... Remove this comment to see the full error message
    selectSong,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'selectedSongs' implicitly has an ... Remove this comment to see the full error message
    selectedSongs,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onTitleClick' implicitly has an '... Remove this comment to see the full error message
    onTitleClick,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onMetricClick' implicitly has an ... Remove this comment to see the full error message
    onMetricClick,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'toggleCategory' implicitly has an... Remove this comment to see the full error message
    toggleCategory,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'filters' implicitly has an 'any' ... Remove this comment to see the full error message
    filters,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'toggleCalloutCore' implicitly has... Remove this comment to see the full error message
    toggleCalloutCore,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'calloutCore' implicitly has an 'a... Remove this comment to see the full error message
    calloutCore,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'toggleCalloutTotal' implicitly ha... Remove this comment to see the full error message
    toggleCalloutTotal,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'calloutTotal' implicitly has an '... Remove this comment to see the full error message
    calloutTotal,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'toggleOmtCore' implicitly has an ... Remove this comment to see the full error message
    toggleOmtCore,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'omtCore' implicitly has an 'any' ... Remove this comment to see the full error message
    omtCore,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'toggleOmtTotal' implicitly has an... Remove this comment to see the full error message
    toggleOmtTotal,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'omtTotal' implicitly has an 'any'... Remove this comment to see the full error message
    omtTotal,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'competitors' implicitly has an 'a... Remove this comment to see the full error message
    competitors,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cmmFormat' implicitly has an 'any... Remove this comment to see the full error message
    cmmFormat,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'versionsWithPacket' implicitly ha... Remove this comment to see the full error message
    versionsWithPacket,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'catChangeIDs' implicitly has an '... Remove this comment to see the full error message
    catChangeIDs,
    // will include when we need sync again ButtonColumnGroupHeader
    // someCategoryModified,
    // onCategoriesSaveClick,
    // loading,
}) => ({
    songInformation: {
        name: 'Song Information',
        columns: {
            checked: {
                header: '',
                disableSort: true,
                cell: (
                    <CheckboxCell
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; disabled: any; onSongSelect: an... Remove this comment to see the full error message
                        data={data}
                        disabled={isCompareEnabled}
                        onSongSelect={selectSong}
                        selectedSongs={selectedSongs}
                    />
                ),
                width: 40,
            },
            sNm: {
                header: 'Title/Artist',
                cell: (
                    <ButtonCell
                        data={data}
                        textExtractor={songData => songData.metadata.sNm}
                        subTextExtractor={songData => songData.metadata.aNm}
                        onClick={onTitleClick}
                    />
                ),
                width: 200,
            },
            versionName: {
                header: 'Version',
                disableSort: true,
                cell: (
                    <DropdownCell
                        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                        data={data}
                        toggleCategory={toggleCategory}
                        stationCategories={stationCategories}
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
                        textExtractor={row =>
                            utils.versionTextExtractor(row.category, 'staged', 'current')}
                    />
                ),
                width: 150,
            },
        },
    },
    category: {
        name: 'Version categories',
        // eslint-disable-next-line react/display-name
        render: () => (
            <TooltipColumnGroupHeader
                headerText="Version categories"
                tooltipTitle="Version categories"
                tooltip="Defaults to the last updated version."
            />
        ),
        minWidth: 150,
        columns: {
            'category.current': {
                header: 'Current',
                cell: (
                    <TextCell
                        data={data}
                        render={({ row }) => {
                            const toolTip = utils.categoryExtractor(
                                row.category,
                                'current',
                                'current'
                            );
                            return toolTip.category;
                        }}
                        tooltipExtractor={songData => {
                            const toolTip = utils.categoryExtractor(
                                songData.category,
                                'current',
                                'current'
                            );
                            return `Version: ${toolTip.versionName}\n
Category: ${toolTip.category}\n
Last Modified Date: ${toolTip.lastModifiedDate}
                            `;
                        }}
                    />
                ),
                width: 70,
            },
            'category.prior': {
                header: 'Prior',
                cell: (
                    <TextCell
                        data={data}
                        render={({ row }) => {
                            const toolTip = utils.categoryExtractor(row.category, 'prior', 'prior');
                            return toolTip.category;
                        }}
                        tooltipExtractor={row => {
                            const toolTip = utils.categoryExtractor(row.category, 'prior', 'prior');
                            return `Category: ${toolTip.category}\n
Last Modified Date: ${toolTip.lastModifiedDate}`;
                        }}
                    />
                ),
                width: 50,
            },
            'category.recommended': {
                header: 'Recommended',
                cell: (
                    <TextCell
                        data={data}
                        render={({ row }) => {
                            const text = utils.recommendedCategoryExtractor(
                                row.category,
                                'recommended',
                                'recommended'
                            );
                            return text.category;
                        }}
                        tooltipExtractor={row => {
                            const recommended = utils.recommendedCategoryExtractor(
                                row.category,
                                'recommended',
                                'recommended'
                            );
                            return `Rank: ${recommended.rank}`
                        }}
                    />
                ),
                width: 105,
            },
            'category.staged': {
                header: 'New',
                cell: (() => {
                    const currentDateMinusWeek = moment.utc().subtract(7, 'days');
                    if (
                        filters &&
                        currentDateMinusWeek.isSameOrBefore(
                            moment.utc(`${filters.applied.dateRange.endDate} 23:59:59`)
                        )
                    ) {
                        const { isModifiedCategory } = utils;
                        return (
                            <ButtonCell
                                data={data}
                                // TODO this has to fixed with correct color code
                                // anto: i have ideas but we need to spend time to implement
                                classNameExtractor={songData => {
                                    const {
                                        category,
                                        category: { current, staged },
                                    } = songData;
                                    const mediaId =
                                        current && current[0] ? current[0].media_id : null;
                                    const songMatch = catChangeIDs.some(
                                        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'changeId' implicitly has an 'any'... Remove this comment to see the full error message
                                        ({ media_id: changeId }) => changeId === mediaId
                                    );
                                    return classNames('table-category-button', {
                                        // staged is empty and if current has values
                                        // then it is carry over (green)
                                        'category-carryover': !isModifiedCategory(
                                            category,
                                            versionsWithPacket
                                        ),
                                        // if staged and current has values and if the
                                        // modified date [0]th item is different from current'
                                        // then it is modified (purple)
                                        'category-modified':
                                            songMatch ||
                                            isModifiedCategory(category, versionsWithPacket),
                                        // for empty category (red)
                                        'empty-category': isEmpty(staged) && isEmpty(current),
                                    });
                                }}
                                textExtractor={songData => {
                                    const {
                                        category: { current },
                                    } = songData;
                                    const mediaId =
                                        current && current[0] ? current[0].media_id : null;
                                    const songMatch = catChangeIDs.find(
                                        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'changeId' implicitly has an 'any'... Remove this comment to see the full error message
                                        ({ media_id: changeId }) => changeId === mediaId
                                    );
                                    return songMatch
                                        ? songMatch.category
                                        : utils.categoryExtractor(
                                            songData.category,
                                            'staged',
                                            'current'
                                        ).category;
                                }}
                                tooltipExtractor={songData => {
                                    const toolTip = utils.categoryExtractor(
                                        songData.category,
                                        'staged',
                                        'current'
                                    );
                                    return `Version: ${toolTip.versionName}\n
Category: ${toolTip.category}\nLast Modified Date: ${toolTip.lastModifiedDate}`;
                                }}
                                onClick={toggleCategory}
                            />
                        );
                    }
                    return (
                        <TextCell
                            data={data}
                            render={({ row }) => {
                                const toolTip = utils.categoryExtractor(
                                    row.category,
                                    'staged',
                                    'current'
                                );
                                return toolTip.category;
                            }}
                            tooltipExtractor={songData => {
                                const toolTip = utils.categoryExtractor(
                                    songData.category,
                                    'staged',
                                    'current'
                                );
                                return `Version: ${toolTip.versionName}\n
Category: ${toolTip.category}\nLast Modified Date: ${toolTip.lastModifiedDate}`;
                            }}
                        />
                    );
                })(),
                width: 50,
            },
        },
    },
    crg: {
        name: 'CRG',
        minWidth: 55,
        columns: {
            crg: {
                header: 'CRG',
                cell: <TextCell data={data} textExtractor={songData => songData.metrics.crg} />,
                width: 55,
            },
        },
    },
    enhanced: {
        name: 'ePOP',
        // eslint-disable-next-line react/display-name
        render: () => (
            <TooltipColumnGroupHeader
                headerText="TAA"
                tooltipTitle="TAA"
                tooltip="Total Audience Appeal"
            />
        ),
        minWidth: 55,
        columns: {
            'enhanced.pop.rnk': {
                header: 'TAA Rank',
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; quintileKey: st... Remove this comment to see the full error message
                cell: <QuintileCell data={data} prefix="metrics" quintileKey="enhanced.pop.rnk" />,
                width: 55,
            },
            'enhanced.pop.num': {
                header: 'TAA',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; hasTrend: true;... Remove this comment to see the full error message
                        prefix="metrics"
                        hasTrend
                        quintileKey="enhanced.pop.rnk"
                    />
                ),
                width: 65,
            },
            'enhanced.plus100.spins': {
                header: '+100',
                cell: (
                    <TierTrendCell
                        data={data}
                        prefix="metrics"
                        tierSpinsKey="enhanced.plus100.spins"
                    />
                ),
                width: 55,
            },
            'enhanced.plus300.spins': {
                header: '+300',
                cell: (
                    <TierTrendCell
                        data={data}
                        prefix="metrics"
                        tierSpinsKey="enhanced.plus300.spins"
                    />
                ),
                width: 55,
            },
        },
    },
    callout: {
        name: 'Callout Research',
        // eslint-disable-next-line react/display-name
        render: () => (
            <TooltipColumnGroupHeader
                headerText="Callout Research"
                tooltipTitle="Callout Scores"
                tooltip={`
                    Callout scores fielded during the calendar week displayed to tie all info to
                    days/dates data occurred.
                `}
            />
        ),
        minWidth: 150,
        columns: {
            'callout.pop.cRnk': {
                header: 'Core Pop Rank',
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; quintileKey: st... Remove this comment to see the full error message
                cell: <QuintileCell data={data} prefix="metrics" quintileKey="callout.pop.score" />,
                width: 75,
            },
            'callout.pop.score': {
                header: 'Core Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Core Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                        displayTotalRank="rank.score"
                    />
                ),
                width: 60,
                clickExpand: toggleCalloutCore,
                expanded: calloutCore,
                expandGroup: 'expand-core',
            },
            'callout.2pop.score': {
                header: 'Core 2Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Core 2Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 65,
                clickExpand: toggleCalloutCore,
                expanded: calloutCore,
                expandGroup: 'expand-core',
            },
            'callout.ptl.score': {
                header: 'Core PTL',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Core PTL"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 65,
                clickExpand: toggleCalloutCore,
                expanded: calloutCore,
                expandGroup: 'expand-core',
            },
            'callout.unf.score': {
                header: 'Core UNF',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.unf.score}
                        className="column-highlighted"
                    />
                ),
                width: calloutCore ? 55 : 0,
                className: 'column-highlighted',
            },
            'callout.neg.score': {
                header: 'Core NEG',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.neg.score}
                        className="column-highlighted"
                    />
                ),
                width: calloutCore ? 55 : 0,
                className: 'column-highlighted',
            },
            'callout.ddl.score': {
                header: 'Core DDL',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.ddl.score}
                        className="column-highlighted"
                    />
                ),
                width: calloutCore ? 55 : 0,
                className: 'column-highlighted',
            },
            'callout.nop.score': {
                header: 'Core NOP',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.nop.score}
                        className="column-highlighted"
                    />
                ),
                width: calloutCore ? 55 : 0,
                className: 'column-highlighted',
            },
            'callout.lik.score': {
                header: 'Core LIK',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.lik.score}
                        className="column-highlighted"
                    />
                ),
                width: calloutCore ? 55 : 0,
                className: 'column-highlighted',
            },
            'callout.fav.score': {
                header: 'Core FAV',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.fav.score}
                        className="column-highlighted"
                    />
                ),
                width: calloutCore ? 55 : 0,
                className: 'column-highlighted',
            },
            'callout.pop.tRnk': {
                header: 'Total POP Rank',
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; quintileKey: st... Remove this comment to see the full error message
                cell: <QuintileCell data={data} prefix="metrics" quintileKey="callout.pop.total" />,
                width: 75,
            },
            'callout.pop.total': {
                header: 'Total POP',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Total POP"
                        hasTrend
                        clickHandler={onMetricClick}
                        displayTotalRank="rank.total"
                    />
                ),
                width: 65,
                clickExpand: toggleCalloutTotal,
                expanded: calloutTotal,
                expandGroup: 'expand-total',
            },
            'callout.2pop.total': {
                header: 'Total 2Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Total 2Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 70,
                clickExpand: toggleCalloutTotal,
                expanded: calloutTotal,
                expandGroup: 'expand-total',
            },
            'callout.ptl.total': {
                header: 'Total PTL',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Total PTL"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 70,
                clickExpand: toggleCalloutTotal,
                expanded: calloutTotal,
                expandGroup: 'expand-total',
            },
            'callout.pop.tPeakScore': {
                header: 'Peak Total Pop',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.pop.tPeakScore}
                    />
                ),
                width: 80,
            },
            'callout.pop.tPeakDt': {
                header: 'Peak Total Pop Date',
                cell: (
                    <DateCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.pop.tPeakDt}
                    />
                ),
                width: 80,
            },
            'callout.unf.total': {
                header: 'Total UNF',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.unf.total}
                        className="column-highlighted"
                    />
                ),
                width: calloutTotal ? 55 : 0,
                className: 'column-highlighted',
            },
            'callout.neg.total': {
                header: 'Total NEG',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.neg.total}
                        className="column-highlighted"
                    />
                ),
                width: calloutTotal ? 55 : 0,
                className: 'column-highlighted',
            },
            'callout.ddl.total': {
                header: 'Total DDL',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.ddl.total}
                        className="column-highlighted"
                    />
                ),
                width: calloutTotal ? 55 : 0,
                className: 'column-highlighted',
            },
            'callout.nop.total': {
                header: 'Total NOP',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.nop.total}
                        className="column-highlighted"
                    />
                ),
                width: calloutTotal ? 55 : 0,
                className: 'column-highlighted',
            },
            'callout.lik.total': {
                header: 'Total LIK',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.lik.total}
                        className="column-highlighted"
                    />
                ),
                width: calloutTotal ? 55 : 0,
                className: 'column-highlighted',
            },
            'callout.fav.total': {
                header: 'Total FAV',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.callout.fav.total}
                        className="column-highlighted"
                    />
                ),
                width: calloutTotal ? 55 : 0,
                className: 'column-highlighted',
            },
            'callout.pop.aa': {
                header: 'AA Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="AA Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.2pop.aa': {
                header: 'AA 2Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="AA 2Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.ptl.aa': {
                header: 'AA PTL',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="AA PTL"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.pop.hisp': {
                header: 'Hisp Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Hisp Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.2pop.hisp': {
                header: 'Hisp 2Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Hisp 2Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.ptl.hisp': {
                header: 'Hisp PTL',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Hisp PTL"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.pop.aahisp': {
                header: 'AA/Hisp Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="AA/Hisp Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 60,
            },
            'callout.2pop.aahisp': {
                header: 'AA/Hisp 2Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="AA/Hisp 2Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 60,
            },
            'callout.ptl.aahisp': {
                header: 'AA/Hisp PTL',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="AA/Hisp PTL"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 60,
            },
            'callout.pop.white': {
                header: 'White Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="White Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.2pop.white': {
                header: 'White 2Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="White 2Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.ptl.white': {
                header: 'White PTL',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="White PTL"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.pop.asian': {
                header: 'Asian Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Asian Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.2pop.asian': {
                header: 'Asian 2Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Asian 2Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.ptl.asian': {
                header: 'Asian PTL',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Asian PTL"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.pop.male': {
                header: 'Male POP',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Male POP"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.2pop.male': {
                header: 'Male 2Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Male 2Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.ptl.male': {
                header: 'Male PTL',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Male PTL"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.pop.female': {
                header: 'Female POP',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Female POP"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 60,
            },
            'callout.2pop.female': {
                header: 'Female 2Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Female 2Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 60,
            },
            'callout.ptl.female': {
                header: 'Female PTL',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Female PTL"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 60,
            },
            'callout.pop.young': {
                header: 'Young POP',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Young POP"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 60,
            },
            'callout.2pop.young': {
                header: 'Young 2Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Young 2Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 60,
            },
            'callout.ptl.young': {
                header: 'Young PTL',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Young PTL"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 60,
            },
            'callout.pop.old': {
                header: 'Old POP',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Old POP"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.2pop.old': {
                header: 'Old 2Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Old 2Pop"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 60,
            },
            'callout.ptl.old': {
                header: 'Old PTL',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; clickable: true... Remove this comment to see the full error message
                        prefix="metrics"
                        clickable
                        tooltipTitle="Old PTL"
                        hasTrend
                        clickHandler={onMetricClick}
                    />
                ),
                width: 55,
            },
            'callout.pop.consolidated1TotalRank': {
                header: `${cmmFormat || ''} Consolidated 1 Total POP Rank`,
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; quintileKey: st... Remove this comment to see the full error message
                        prefix="metrics"
                        quintileKey="callout.pop.consolidated1Total"
                    />
                ),
                width: 100,
            },
            'callout.pop.consolidated1Total': {
                header: `${cmmFormat || ''} Consolidated 1 Total POP`,
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                        prefix="metrics"
                        tooltipTitle="Consolidated 1 Total POP"
                    />
                ),
                width: 100,
            },
            'callout.pop.consolidated2TotalRank': {
                header: `${cmmFormat || ''} Consolidated 2 Total POP Rank`,
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; quintileKey: st... Remove this comment to see the full error message
                        prefix="metrics"
                        quintileKey="callout.pop.consolidated2Total"
                    />
                ),
                width: 100,
            },
            'callout.pop.consolidated2Total': {
                header: `${cmmFormat || ''} Consolidated 2 Total POP`,
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                        prefix="metrics"
                        tooltipTitle="Consolidated 2 Total POP"
                    />
                ),
                width: 100,
            },
            'callout.pop.consolidated3TotalRank': {
                header: `${cmmFormat || ''} Consolidated 3 Total POP Rank`,
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; quintileKey: st... Remove this comment to see the full error message
                        prefix="metrics"
                        quintileKey="callout.pop.consolidated3Total"
                    />
                ),
                width: 100,
            },
            'callout.pop.consolidated3Total': {
                header: `${cmmFormat || ''} Consolidated 3 Total POP`,
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                        prefix="metrics"
                        tooltipTitle="Consolidated 3 Total POP"
                    />
                ),
                width: 100,
            },
        },
    },
    customCallout: {
        name: 'Custom Consolidated Callout',
        // eslint-disable-next-line react/display-name
        render: () => (
            <TooltipColumnGroupHeader
                headerText="Custom Consolidated Callout"
                tooltipTitle="Custom Consolidated Callout"
                tooltip={`
                    Consolidated Callout that uses similar station data to provide
                    the most applicable research to your station.
                `}
            />
        ),
        minWidth: 150,
        columns: {
            'customCallout.pop.cRnk': {
                header: 'Core Pop Rank',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; quintileKey: st... Remove this comment to see the full error message
                        prefix="metrics"
                        quintileKey="customCallout.pop.quintileCoreGroup"
                    />
                ),
                width: 75,
            },
            'customCallout.pop.score': {
                header: 'Core Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                        prefix="metrics"
                        tooltipTitle="Core Pop"
                        hasTrend
                        displayTotalRank="pop.scoreRank"
                        quintileKey="customCallout.pop.quintileCoreGroup"
                    />
                ),
                width: 60,
            },
            'customCallout.2pop.score': {
                header: 'Core 2Pop',
                cell: (
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                    <QuintileCell data={data} prefix="metrics" tooltipTitle="Core 2Pop" hasTrend />
                ),
                width: 65,
            },
            'customCallout.ptl.score': {
                header: 'Core PTL',
                cell: (
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                    <QuintileCell data={data} prefix="metrics" tooltipTitle="Core PTL" hasTrend />
                ),
                width: 65,
            },
            'customCallout.pop.tRnk': {
                header: 'Total POP Rank',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; quintileKey: st... Remove this comment to see the full error message
                        prefix="metrics"
                        quintileKey="customCallout.pop.quintileTotalGroup"
                    />
                ),
                width: 75,
            },
            'customCallout.pop.total': {
                header: 'Total POP',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                        prefix="metrics"
                        tooltipTitle="Total POP"
                        hasTrend
                        displayTotalRank="pop.totalRank"
                        quintileKey="customCallout.pop.quintileTotalGroup"
                    />
                ),
                width: 65,
            },
            'customCallout.2pop.total': {
                header: 'Total 2Pop',
                cell: (
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                    <QuintileCell data={data} prefix="metrics" tooltipTitle="Total 2Pop" hasTrend />
                ),
                width: 70,
            },
            'customCallout.ptl.total': {
                header: 'Total PTL',
                cell: (
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                    <QuintileCell data={data} prefix="metrics" tooltipTitle="Total PTL" hasTrend />
                ),
                width: 70,
            },
        },
    },
    omt: {
        name: 'OMT',
        // eslint-disable-next-line react/display-name
        render: () => (
            <TooltipColumnGroupHeader
                headerText="OMT"
                tooltipTitle="OMT"
                tooltip="Online Music Test."
            />
        ),
        minWidth: 150,
        columns: {
            'omt.pop.cRnk': {
                header: 'Core Pop Rank',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; quintileKey: st... Remove this comment to see the full error message
                        prefix="metrics"
                        quintileKey="omt.pop.quintileCoreGroup"
                    />
                ),
                width: 75,
            },
            'omt.pop.score': {
                header: 'Core Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                        prefix="metrics"
                        tooltipTitle="Core Pop"
                        hasTrend
                        displayTotalRank="pop.scoreRank"
                        quintileKey="omt.pop.quintileCoreGroup"
                    />
                ),
                width: 60,
                clickExpand: toggleOmtCore,
                expanded: omtCore,
                expandGroup: 'expand-core',
            },
            'omt.2pop.score': {
                header: 'Core 2Pop',
                cell: (
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                    <QuintileCell data={data} prefix="metrics" tooltipTitle="Core 2Pop" hasTrend />
                ),
                width: 65,
                clickExpand: toggleOmtCore,
                expanded: omtCore,
                expandGroup: 'expand-core',
            },
            'omt.ptl.score': {
                header: 'Core PTL',
                cell: (
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                    <QuintileCell data={data} prefix="metrics" tooltipTitle="Core PTL" hasTrend />
                ),
                width: 65,
                clickExpand: toggleOmtCore,
                expanded: omtCore,
                expandGroup: 'expand-core',
            },
            'omt.unf.score': {
                header: 'Core UNF',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.omt.unf.score}
                        className="column-highlighted"
                    />
                ),
                width: omtCore ? 55 : 0,
                className: 'column-highlighted',
            },
            'omt.neg.score': {
                header: 'Core NEG',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.omt.neg.score}
                        className="column-highlighted"
                    />
                ),
                width: omtCore ? 55 : 0,
                className: 'column-highlighted',
            },
            'omt.ddl.score': {
                header: 'Core DDL',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.omt.ddl.score}
                        className="column-highlighted"
                    />
                ),
                width: omtCore ? 55 : 0,
                className: 'column-highlighted',
            },
            'omt.nop.score': {
                header: 'Core NOP',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.omt.nop.score}
                        className="column-highlighted"
                    />
                ),
                width: omtCore ? 55 : 0,
                className: 'column-highlighted',
            },
            'omt.lik.score': {
                header: 'Core LIK',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.omt.lik.score}
                        className="column-highlighted"
                    />
                ),
                width: omtCore ? 55 : 0,
                className: 'column-highlighted',
            },
            'omt.fav.score': {
                header: 'Core FAV',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.omt.fav.score}
                        className="column-highlighted"
                    />
                ),
                width: omtCore ? 55 : 0,
                className: 'column-highlighted',
            },
            'omt.pop.tRnk': {
                header: 'Total POP Rank',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; quintileKey: st... Remove this comment to see the full error message
                        prefix="metrics"
                        quintileKey="omt.pop.quintileTotalGroup"
                    />
                ),
                width: 75,
            },
            'omt.pop.total': {
                header: 'Total POP',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                        prefix="metrics"
                        tooltipTitle="Total POP"
                        hasTrend
                        displayTotalRank="pop.totalRank"
                        quintileKey="omt.pop.quintileTotalGroup"
                    />
                ),
                width: 65,
                clickExpand: toggleOmtTotal,
                expanded: omtTotal,
                expandGroup: 'expand-total',
            },
            'omt.2pop.total': {
                header: 'Total 2Pop',
                cell: (
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                    <QuintileCell data={data} prefix="metrics" tooltipTitle="Total 2Pop" hasTrend />
                ),
                width: 70,
                clickExpand: toggleOmtTotal,
                expanded: omtTotal,
                expandGroup: 'expand-total',
            },
            'omt.ptl.total': {
                header: 'Total PTL',
                cell: (
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                    <QuintileCell data={data} prefix="metrics" tooltipTitle="Total PTL" hasTrend />
                ),
                width: 70,
                clickExpand: toggleOmtTotal,
                expanded: omtTotal,
                expandGroup: 'expand-total',
            },
            'omt.unf.total': {
                header: 'Total UNF',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.omt.unf.total}
                        className="column-highlighted"
                    />
                ),
                width: omtTotal ? 55 : 0,
                className: 'column-highlighted',
            },
            'omt.neg.total': {
                header: 'Total NEG',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.omt.neg.total}
                        className="column-highlighted"
                    />
                ),
                width: omtTotal ? 55 : 0,
                className: 'column-highlighted',
            },
            'omt.ddl.total': {
                header: 'Total DDL',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.omt.ddl.total}
                        className="column-highlighted"
                    />
                ),
                width: omtTotal ? 55 : 0,
                className: 'column-highlighted',
            },
            'omt.nop.total': {
                header: 'Total NOP',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.omt.nop.total}
                        className="column-highlighted"
                    />
                ),
                width: omtTotal ? 55 : 0,
                className: 'column-highlighted',
            },
            'omt.lik.total': {
                header: 'Total LIK',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.omt.lik.total}
                        className="column-highlighted"
                    />
                ),
                width: omtTotal ? 55 : 0,
                className: 'column-highlighted',
            },
            'omt.fav.total': {
                header: 'Total FAV',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.omt.fav.total}
                        className="column-highlighted"
                    />
                ),
                width: omtTotal ? 55 : 0,
                className: 'column-highlighted',
            },
        },
    },
    customOmt: {
        name: 'Custom Consolidated OMT',
        // eslint-disable-next-line react/display-name
        render: () => (
            <TooltipColumnGroupHeader
                headerText="Custom Consolidated OMT"
                tooltipTitle="Custom Consolidated OMT"
                tooltip={`
                    Consolidated OMT that uses similar station data to provide the most
                    applicable research to your station.
                `}
            />
        ),
        minWidth: 150,
        columns: {
            'customOmt.pop.cRnk': {
                header: 'Core Pop Rank',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; quintileKey: st... Remove this comment to see the full error message
                        prefix="metrics"
                        quintileKey="customOmt.pop.quintileCoreGroup"
                    />
                ),
                width: 75,
            },
            'customOmt.pop.score': {
                header: 'Core Pop',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                        prefix="metrics"
                        tooltipTitle="Core Pop"
                        hasTrend
                        displayTotalRank="pop.scoreRank"
                        quintileKey="customOmt.pop.quintileCoreGroup"
                    />
                ),
                width: 60,
            },
            'customOmt.2pop.score': {
                header: 'Core 2Pop',
                cell: (
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                    <QuintileCell data={data} prefix="metrics" tooltipTitle="Core 2Pop" hasTrend />
                ),
                width: 65,
            },
            'customOmt.ptl.score': {
                header: 'Core PTL',
                cell: (
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                    <QuintileCell data={data} prefix="metrics" tooltipTitle="Core PTL" hasTrend />
                ),
                width: 65,
            },
            'customOmt.pop.tRnk': {
                header: 'Total POP Rank',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; quintileKey: st... Remove this comment to see the full error message
                        prefix="metrics"
                        quintileKey="customOmt.pop.quintileTotalGroup"
                    />
                ),
                width: 75,
            },
            'customOmt.pop.total': {
                header: 'Total POP',
                cell: (
                    <QuintileCell
                        data={data}
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                        prefix="metrics"
                        tooltipTitle="Total POP"
                        hasTrend
                        displayTotalRank="pop.totalRank"
                        quintileKey="customOmt.pop.quintileTotalGroup"
                    />
                ),
                width: 65,
            },
            'customOmt.2pop.total': {
                header: 'Total 2Pop',
                cell: (
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                    <QuintileCell data={data} prefix="metrics" tooltipTitle="Total 2Pop" hasTrend />
                ),
                width: 70,
            },
            'customOmt.ptl.total': {
                header: 'Total PTL',
                cell: (
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ data: any; prefix: string; tooltipTitle: s... Remove this comment to see the full error message
                    <QuintileCell data={data} prefix="metrics" tooltipTitle="Total PTL" hasTrend />
                ),
                width: 70,
            },
        },
    },
    spins: {
        name: 'Spins',
        // eslint-disable-next-line react/display-name
        render: () => (
            <TooltipColumnGroupHeader
                headerText="Spins"
                tooltipTitle="Spins"
                tooltip={`
                    Spins monitored by Mediabase for the week displayed (see calendar on the left)
                    or since first airplay.
                `}
            />
        ),
        minWidth: 150,
        columns: {
            'spins.6am7pm': {
                header: 'Spins 6AM-7PM',
                cell: (
                    <TextCell
                        textExtractor={songData => songData.metrics.spins['6am7pm']}
                        data={data}
                    />
                ),
                width: 70,
            },
            'spins.6a12m': {
                header: 'Spins 6AM-12M',
                cell: (
                    <TextCell
                        textExtractor={songData => songData.metrics.spins['6a12m']}
                        data={data}
                    />
                ),
                width: 65,
            },
            'spins.24hr': {
                header: 'Spins 24HR',
                cell: (
                    <TextCell
                        textExtractor={songData => songData.metrics.spins['24hr']}
                        data={data}
                    />
                ),
                width: 65,
            },
            'spins.mrkt': {
                header: 'Market Spins 24HR',
                cell: (
                    <TextCell textExtractor={songData => songData.metrics.spins.mrkt} data={data} />
                ),
                width: 80,
            },
            'spins.totalMrkt': {
                header: 'Total Market Spins 24HR',
                cell: (
                    <TextCell
                        textExtractor={songData => songData.metrics.spins.totalMrkt}
                        data={data}
                    />
                ),
                width: 80,
            },
            'spins.totalStn': {
                header: 'Total Station Spins 24HR',
                cell: (
                    <TextCell
                        textExtractor={songData => songData.metrics.spins.totalStn}
                        data={data}
                    />
                ),
                width: 80,
            },
            'spins.peakChartPos': {
                header: 'Peak Chart Position',
                cell: (
                    <TextCell
                        textExtractor={songData => songData.metrics.spins.peakChartPos}
                        data={data}
                    />
                ),
                width: 80,
            },
            'spins.peakChartDt': {
                header: 'Peak Chart Date',
                cell: (
                    <DateCell
                        data={data}
                        textExtractor={songData => songData.metrics.spins.peakChartDt}
                    />
                ),
                width: 80,
            },
            'spins.peak': {
                header: 'Peak Spins',
                cell: (
                    <TextCell textExtractor={songData => songData.metrics.spins.peak} data={data} />
                ),
                width: 80,
            },
            'spins.peakSpinsDt': {
                header: 'Peak Spins Date',
                cell: (
                    <DateCell
                        data={data}
                        textExtractor={songData => songData.metrics.spins.peakSpinsDt}
                    />
                ),
                width: 80,
            },
            'spins.competitor1.6am7pm': {
                header: `${competitors && competitors.competitor1} Spins 6AM-7PM`,
                cell: (
                    <TextCell
                        textExtractor={songData => (songData.spins.competitor1 || {})['6am7pm']}
                        data={data}
                    />
                ),
                width: 80,
            },
            'spins.competitor1.6am12m': {
                header: `${competitors && competitors.competitor1} Spins 6AM-12M`,
                cell: (
                    <TextCell
                        textExtractor={songData => (songData.spins.competitor1 || {})['6am12m']}
                        data={data}
                    />
                ),
                width: 80,
            },
            'spins.competitor1.24hr': {
                header: `${competitors && competitors.competitor1} Spins 24HR`,
                cell: (
                    <TextCell
                        textExtractor={songData => (songData.spins.competitor1 || {})['24hr']}
                        data={data}
                    />
                ),
                width: 80,
            },
            'spins.competitor2.6am7pm': {
                header: `${competitors && competitors.competitor2} Spins 6AM-7PM`,
                cell: (
                    <TextCell
                        textExtractor={songData => (songData.spins.competitor2 || {})['6am7pm']}
                        data={data}
                    />
                ),
                width: 80,
            },
            'spins.competitor2.6am12m': {
                header: `${competitors && competitors.competitor2} Spins 6AM-12M`,
                cell: (
                    <TextCell
                        textExtractor={songData => (songData.spins.competitor2 || {})['6am12m']}
                        data={data}
                    />
                ),
                width: 80,
            },
            'spins.competitor2.24hr': {
                header: `${competitors && competitors.competitor2} Spins 24HR`,
                cell: (
                    <TextCell
                        textExtractor={songData => (songData.spins.competitor2 || {})['24hr']}
                        data={data}
                    />
                ),
                width: 80,
            },
        },
    },
    mscore: {
        name: 'MScore',
        // eslint-disable-next-line react/display-name
        render: () => (
            <TooltipColumnGroupHeader
                headerText="MScore"
                tooltipTitle="MScore"
                tooltip={`
                    The MScore pertains to Sunday through Wednesday of the week the callout was
                    conducted and is  rolling average of 4 weeks of switching scores. Playcount
                    pertains to &quot;Switch week 1&quot;.
                `}
            />
        ),
        minWidth: 100,
        columns: {
            'mscore.switching': {
                header: 'MSCORE',
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'mscoreData' implicitly has an 'any' typ... Remove this comment to see the full error message
                sortValueExtractor: mscoreData => parseFloat(mscoreData.metrics.mscore.switching),
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.mscore.switching}
                        classNameExtractor={mscoreData =>
                            classNames('txt-cell', {
                                'mscore-positive': +mscoreData.metrics.mscore.switching > 0,
                                'mscore-negative': +mscoreData.metrics.mscore.switching < 0,
                            })}
                    />
                ),
                width: 90,
            },
            'mscore.plyCount': {
                header: 'Playcount',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.mscore.plyCount}
                    />
                ),
                width: 80,
            },
            'mscore.sWeek1': {
                header: 'Switch Week 1',
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'mscoreData' implicitly has an 'any' typ... Remove this comment to see the full error message
                sortValueExtractor: mscoreData => parseFloat(mscoreData.metrics.mscore.sWeek1),
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.mscore.sWeek1}
                        classNameExtractor={mscoreData =>
                            classNames('txt-cell', {
                                'mscore-positive': +mscoreData.metrics.mscore.sWeek1 > 0,
                                'mscore-negative': +mscoreData.metrics.mscore.sWeek1 < 0,
                            })}
                    />
                ),
                width: 100,
            },
            'mscore.sWeek2': {
                header: 'Switch Week 2',
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'mscoreData' implicitly has an 'any' typ... Remove this comment to see the full error message
                sortValueExtractor: mscoreData => parseFloat(mscoreData.mscore.sWeek2),
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.mscore.sWeek2}
                        classNameExtractor={mscoreData =>
                            classNames('txt-cell', {
                                'mscore-positive': +mscoreData.metrics.mscore.sWeek2 > 0,
                                'mscore-negative': +mscoreData.metrics.mscore.sWeek2 < 0,
                            })}
                    />
                ),
                width: 100,
            },
            'mscore.sWeek3': {
                header: 'Switch Week 3',
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'mscoreData' implicitly has an 'any' typ... Remove this comment to see the full error message
                sortValueExtractor: mscoreData => parseFloat(mscoreData.mscore.sWeek3),
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.mscore.sWeek3}
                        classNameExtractor={mscoreData =>
                            classNames('txt-cell', {
                                'mscore-positive': +mscoreData.metrics.mscore.sWeek3 > 0,
                                'mscore-negative': +mscoreData.metrics.mscore.sWeek3 < 0,
                            })}
                    />
                ),
                width: 100,
            },
            'mscore.sWeek4': {
                header: 'Switch Week 4',
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'mscoreData' implicitly has an 'any' typ... Remove this comment to see the full error message
                sortValueExtractor: mscoreData => parseFloat(mscoreData.mscore.sWeek4),
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData => songData.metrics.mscore.sWeek4}
                        classNameExtractor={mscoreData =>
                            classNames('txt-cell', {
                                'mscore-positive': +mscoreData.metrics.mscore.sWeek4 > 0,
                                'mscore-negative': +mscoreData.metrics.mscore.sWeek4 < 0,
                            })}
                    />
                ),
                width: 100,
            },
        },
    },
    iHeartDigital: {
        name: 'iHeart Digital',
        // eslint-disable-next-line react/display-name
        render: () => (
            <TooltipColumnGroupHeader
                headerText="iHeart Digital"
                tooltipTitle="iHeart Digital"
                tooltip="The thumbs data is from the current week from your stations stream."
            />
        ),
        minWidth: 200,
        columns: {
            'iHeartDigital.thumbsUp': {
                header: 'Thumbs Up %',
                cell: (
                    <PercentCell
                        data={data}
                        textExtractor={songData => songData.metrics.iHeartDigital.thumbsUp}
                    />
                ),
                width: 70,
            },
            'iHeartDigital.thumbsDown': {
                header: 'Thumbs Down %',
                cell: (
                    <PercentCell
                        data={data}
                        textExtractor={songData => songData.metrics.iHeartDigital.thumbsDown}
                    />
                ),
                width: 70,
            },
            'iHeartDigital.completed': {
                header: 'Completed',
                cell: (
                    <PercentCell
                        data={data}
                        textExtractor={songData => songData.metrics.iHeartDigital.completed}
                    />
                ),
                width: 100,
            },
        },
    },
    hitPredictor: {
        name: 'Hit Predictor',
        // eslint-disable-next-line react/display-name
        render: () => (
            <TooltipColumnGroupHeader
                headerText="Hit Predictor"
                tooltipTitle="Hit Predictor"
                tooltip={`
                    The Hit predictor score is a one-time score given to a song and does not change
                    based on time, geography or filters.
                `}
            />
        ),
        minWidth: 100,
        columns: {
            'hitPredictor.score': {
                header: 'Score',
                cell: (
                    <TextCell
                        data={data}
                        textExtractor={songData =>
                            getNumberWithComma(songData.metrics.hitPredictor.score, 2)}
                    />
                ),
                width: 125,
            },
        },
    },
    mediabase: {
        name: 'Mediabase',
        columns: {
            'mediabase.spins.totalAudience': {
                header: 'Total Audience Spins',
                cell: <TextCell data={data} />,
                width: 70,
                flexGrow: 1,
            },
            'mediabase.spins.current': {
                header: 'TW',
                cell: <TextCell data={data} />,
                width: 50,
                flexGrow: 1,
            },
            'mediabase.spins.previous': {
                header: 'LW',
                cell: <TextCell data={data} />,
                width: 50,
                flexGrow: 1,
            },
            'mediabase.spins.historical': {
                header: 'Hist. Spins',
                cell: <TextCell data={data} />,
                width: 55,
                flexGrow: 1,
            },
            'mediabase.spins.marketPercent': {
                header: `${callLetter} % Share`,
                cell: <TextCell data={data} />,
                width: 55,
                flexGrow: 1,
            },
            'mediabase.spins.market': {
                header: 'Market Spins',
                cell: <TextCell data={data} />,
                width: 55,
                flexGrow: 1,
            },
            'mediabase.spins.6am7pm': {
                header: '6AM - 7PM Spins',
                cell: <TextCell data={data} />,
                width: 55,
                flexGrow: 1,
            },
        },
    },
});

export default makeColumnMap;
