import React, { useState, useEffect, useMemo } from 'react';
import union from 'lodash/union';
import isEmpty from 'lodash/isEmpty';

import { getQuintileColor } from 'utils/quintileColoring';
import Modal from 'components/Modal';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import SongBar from './SongBar';
import RankSpinsBar from './RankSpinsBar';
import BreakoutTable from './BreakoutTable';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SongBreakout.module.css' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SongBreakout.module.css' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SongBreakout.module.css' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import { modalPosition, breakout, loadingPlacement, noBreakouts } from './SongBreakout.module.css';

const CALLOUT = 'callout';
const OMT = 'omt';
const NO_BREAKOUTS = 'noBreakouts';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const SongBreakout = props => {
    const {
        songOrder,
        selectedSongId,
        songs,
        onClose,
        getSongDetails,
        getBreakoutPrefs,
        saveBreakoutPrefs,
        avatar = null,
        callout: { breakouts: calloutBreakouts = {}, ...calloutMetrics } = { breakouts: {}, rank: {}, score: {} },
        omt: { breakouts: omtBreakouts = {}, ...omtMetrics } = { breakouts: {}, rank: {}, score: {} },
        spins: priorSpins,
        dataLoading,
        calloutPrefs,
        omtPrefs,
        omtData,
    } = props;

    const initialCalloutBreakoutList = useMemo(
        () =>
            calloutPrefs.length ? union(calloutPrefs, Object.keys(calloutBreakouts)) : Object.keys(calloutBreakouts),
        [calloutPrefs, calloutBreakouts]
    );
    const initialOmtBreakoutList = useMemo(
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'saved' implicitly has an 'any' type.
        () => (omtPrefs.length ? union(omtPrefs, Object.keys(omtBreakouts)) : Object.keys(omtBreakouts)),
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
        [omtPrefs, omtBreakouts]
    );

    const [songId, setSongId] = useState(selectedSongId);
    const [activeTab, setActiveTab] = useState(CALLOUT);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'saved' implicitly has an 'any' type.
    const [songHasChanged, setSongChanged] = useState(false);
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'sId' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakoutName' implicitly has an 'any' t... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'quintileCoreGroup' does not exist on typ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'saved' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    const [currentCalloutBreakoutOrder, setCalloutBreakoutOrder] = useState(initialCalloutBreakoutList);
    const [currentOmtBreakoutOrder, setOmtBreakoutOrder] = useState(initialOmtBreakoutList);

    const breakoutsMatch = (saved, current) => saved.every((breakoutName, index) => breakoutName === current[index]);
    const needToSave =
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'sId' implicitly has an 'any' type... Remove this comment to see the full error message
        !breakoutsMatch(initialCalloutBreakoutList, currentCalloutBreakoutOrder) ||
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'quintileTotalGroup' does not exist on ty... Remove this comment to see the full error message
        !breakoutsMatch(initialOmtBreakoutList, currentOmtBreakoutOrder);
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'sId' implicitly has an 'any' type... Remove this comment to see the full error message
    const calloutHasBreakouts = !isEmpty(calloutBreakouts);
    const omtHasBreakouts = !isEmpty(omtBreakouts);

    const {
        metadata: { sNm, aNm },
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
        metrics: { callout, spins },
    } = songs.find(({ sId }) => sId === songId);

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tab' implicitly has an 'any' type.
    const { quintileCoreGroup, quintileTotalGroup, popTotalRank = '-', popCoreRank = '-' } = useMemo(
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'movement' implicitly has an 'any' type.
        () => Object.values(omtData).find(({ songId: id }) => Number(id) === Number(songId)) || {},
        [omtData, songId]
    );

    useEffect(() => {
        getBreakoutPrefs();
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    }, [getBreakoutPrefs]);

    useEffect(() => {
        getSongDetails(songId);
        return () => {
            setSongChanged(false);
        };
    }, [songId, getSongDetails]);

    useEffect(() => {
        // setting active tab from data available
        const checkActiveTab = () => {
            if (calloutHasBreakouts && omtHasBreakouts) return;
            if (calloutHasBreakouts) return activeTab === CALLOUT ? () => {} : setActiveTab(CALLOUT);
            if (omtHasBreakouts) return activeTab === OMT ? () => {} : setActiveTab(OMT);
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tab' implicitly has an 'any' type.
            if (!omtHasBreakouts && !calloutHasBreakouts) return setActiveTab(NO_BREAKOUTS);
        };
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'movement' implicitly has an 'any' type.
        checkActiveTab();
    }, [calloutHasBreakouts, omtHasBreakouts, activeTab]);

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'movement' implicitly has an 'any' type.
    useEffect(() => {
        if (initialCalloutBreakoutList.length && !currentCalloutBreakoutOrder.length) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
            setCalloutBreakoutOrder(initialCalloutBreakoutList);
        }
        if (initialOmtBreakoutList.length && !currentOmtBreakoutOrder.length) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tab' implicitly has an 'any' type.
            setOmtBreakoutOrder(initialOmtBreakoutList);
        }
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'movement' implicitly has an 'any' type.
    }, [initialCalloutBreakoutList, currentCalloutBreakoutOrder, initialOmtBreakoutList, currentOmtBreakoutOrder]);

    const toggleTab = tab => setActiveTab(tab);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    const getNextSongId = movement => songOrder[songOrder.indexOf(songId) + movement];
    const changeSong = movement => {
        setSongId(getNextSongId(movement));
        setSongChanged(true);
    };
    const stopPropagation = e => e.stopPropagation();
    const loading = dataLoading || songHasChanged;
    const closeAndSavePrefs = () => {
        if (needToSave) saveBreakoutPrefs({ callout: currentCalloutBreakoutOrder, omt: currentOmtBreakoutOrder });
        onClose();
    };

    return (
        <div className={breakout} onClick={stopPropagation}>
            <SongBar
                songName={sNm}
                artistName={aNm}
                image={avatar}
                loading={loading}
                onClose={closeAndSavePrefs}
                changeSong={changeSong}
                activeTab={activeTab}
                toggleTab={toggleTab}
                calloutDisabled={!calloutHasBreakouts}
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
                omtDisabled={!omtHasBreakouts}
                upDisabled={!getNextSongId(-1)}
                downDisabled={!getNextSongId(1)}
            />
            {loading ? <LoadingIndicator className={loadingPlacement} text="" /> : null}
            {!loading && activeTab === CALLOUT ? (
                <>
                    <RankSpinsBar
                        rank={{ coreRank: callout.pop.cRnk || '-', totalRank: callout.pop.tRnk || '-' }}
                        spins={spins}
                        priorRank={calloutMetrics}
                        priorSpins={priorSpins}
                        colors={{
                            core: getQuintileColor(callout.pop.score),
                            total: getQuintileColor(callout.pop.total),
                        }}
                    />
                    <BreakoutTable
                        breakouts={calloutBreakouts}
                        currentBreakoutOrder={currentCalloutBreakoutOrder}
                        setBreakoutOrder={setCalloutBreakoutOrder}
                    />
                </>
            ) : null}
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type. */}
            {!loading && activeTab === OMT ? (
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
                <>
                    <RankSpinsBar
                        rank={{ coreRank: popCoreRank, totalRank: popTotalRank }}
                        spins={spins}
                        priorRank={omtMetrics}
                        priorSpins={priorSpins}
                        colors={{
                            core: getQuintileColor(quintileCoreGroup, true),
                            total: getQuintileColor(quintileTotalGroup, true),
                        }}
                    />
                    <BreakoutTable
                        breakouts={omtBreakouts}
                        currentBreakoutOrder={currentOmtBreakoutOrder}
                        setBreakoutOrder={setOmtBreakoutOrder}
                    />
                </>
            ) : null}
            {!loading && activeTab === NO_BREAKOUTS ? (
                <div className={noBreakouts}>No Breakouts available for this song.</div>
            ) : null}
        </div>
    );
};

const BreakoutWithModal = props => (
    <Modal position={modalPosition}>
        <SongBreakout {...props} />
    </Modal>
);

export { BreakoutWithModal as default, SongBreakout };
