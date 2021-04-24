import React, { useState, useEffect, useMemo } from 'react';
import union from 'lodash/union';
import isEmpty from 'lodash/isEmpty';

import { getQuintileColor } from 'utils/quintileColoring';
import Modal from 'components/Modal';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import SongBar from './SongBar';
import RankSpinsBar from './RankSpinsBar';
import BreakoutTable from './BreakoutTable';

import { modalPosition, breakout, loadingPlacement, noBreakouts } from './SongBreakout.module.css';

const CALLOUT = 'callout';
const OMT = 'omt';
const NO_BREAKOUTS = 'noBreakouts';

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
        () => (omtPrefs.length ? union(omtPrefs, Object.keys(omtBreakouts)) : Object.keys(omtBreakouts)),
        [omtPrefs, omtBreakouts]
    );

    const [songId, setSongId] = useState(selectedSongId);
    const [activeTab, setActiveTab] = useState(CALLOUT);
    const [songHasChanged, setSongChanged] = useState(false);
    const [currentCalloutBreakoutOrder, setCalloutBreakoutOrder] = useState(initialCalloutBreakoutList);
    const [currentOmtBreakoutOrder, setOmtBreakoutOrder] = useState(initialOmtBreakoutList);

    const breakoutsMatch = (saved, current) => saved.every((breakoutName, index) => breakoutName === current[index]);
    const needToSave =
        !breakoutsMatch(initialCalloutBreakoutList, currentCalloutBreakoutOrder) ||
        !breakoutsMatch(initialOmtBreakoutList, currentOmtBreakoutOrder);
    const calloutHasBreakouts = !isEmpty(calloutBreakouts);
    const omtHasBreakouts = !isEmpty(omtBreakouts);

    const {
        metadata: { sNm, aNm },
        metrics: { callout, spins },
    } = songs.find(({ sId }) => sId === songId);

    const { quintileCoreGroup, quintileTotalGroup, popTotalRank = '-', popCoreRank = '-' } = useMemo(
        () => Object.values(omtData).find(({ songId: id }) => Number(id) === Number(songId)) || {},
        [omtData, songId]
    );

    useEffect(() => {
        getBreakoutPrefs();
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
            if (!omtHasBreakouts && !calloutHasBreakouts) return setActiveTab(NO_BREAKOUTS);
        };
        checkActiveTab();
    }, [calloutHasBreakouts, omtHasBreakouts, activeTab]);

    useEffect(() => {
        if (initialCalloutBreakoutList.length && !currentCalloutBreakoutOrder.length) {
            setCalloutBreakoutOrder(initialCalloutBreakoutList);
        }
        if (initialOmtBreakoutList.length && !currentOmtBreakoutOrder.length) {
            setOmtBreakoutOrder(initialOmtBreakoutList);
        }
    }, [initialCalloutBreakoutList, currentCalloutBreakoutOrder, initialOmtBreakoutList, currentOmtBreakoutOrder]);

    const toggleTab = tab => setActiveTab(tab);
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
            {!loading && activeTab === OMT ? (
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
