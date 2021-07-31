class Layout {
    constructor() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
        this.board = null;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hash' does not exist on type 'Layout'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeId' does not exist on type 'Layout... Remove this comment to see the full error message
        this.activeId = null;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeIndex' does not exist on type 'Lay... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeIndex' does not exist on type 'Lay... Remove this comment to see the full error message
        this.activeIndex = null;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hash' does not exist on type 'Layout'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
        this.activeLayout = null;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hash' does not exist on type 'Layout'.
        this.hash = null;
    }

    /**
     * Set the current board and active tab ID.
     *
     * @param {Object} board
     // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
     * @param {string} tabId
     *
     * @returns {void}
     */
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tabId' implicitly has an 'any' type.
    setBoard(board) {
        const { tabId, hash } = board;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        this.board = board;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeId' does not exist on type 'Layout... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hash' does not exist on type 'Layout'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
        this.activeId = tabId || board.config.layout[0].id;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeIndex' does not exist on type 'Lay... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hash' does not exist on type 'Layout'.
        this.activeIndex = this.fetchTabIndex(tabId);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
        this.hash = hash;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        // Set panel ID based on object key
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        if (!this.board.loading) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rows' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
            Object.keys(this.board.panels).forEach(panelId => {
                // @ts-expect-error ts-migrate(7005) FIXME: Variable 'inUse' implicitly has an 'any[]' type.
                if (this.board.panels[panelId]) {
                    this.board.panels[panelId].id = panelId;
                }
            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'inUse' implicitly has an 'any[]' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
            });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
        }

        // Active layout has an empty pseudo-row to make operations easier
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'target' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        this.activeLayout = [
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
            { columns: [{ size: 12, panels: [] }] },
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tabId' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rows' implicitly has an 'any' type.
            ...this.board.config.layout[this.activeIndex].rows,
        ];
    }

    fetchTabIndex(tabId) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        let tabIndex = 0;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rows' implicitly has an 'any' type.
        if (this.board.type === 'RadioBoard') {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tabId' implicitly has an 'any' type.
            tabIndex = this.board.config.layout.length > 1 ? 1 : 0;
        }

        if (this.board.config) {
            this.board.config.layout.some((tab, index) => {
                if (tab.id === tabId) {
                    tabIndex = index;
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tab' implicitly has an 'any' type.

                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeIndex' does not exist on type 'Lay... Remove this comment to see the full error message
                    return true;
                }

                return false;
            });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hash' does not exist on type 'Layout'.
        }

        return tabIndex;
    }

    /**
     // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
     * Returns the active tab and its properties.
     *
     // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
     * @returns {{layout: Array, tabIndex: number, available: number}}
     */
    getActive() {
        return {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
            layout: this.activeLayout,
            tabId: this.activeId,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'board' does not exist on type 'Layout'.
            tabIndex: this.activeIndex,
            available: this.getAvailablePanels(),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rows' implicitly has an 'any' type.
            hash: this.hash,
        };
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
    getActiveLayout() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
        return this.activeLayout;
    }

    getAvailablePanels() {
        if (this.board.panels === null) {
            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'inUse' implicitly has an 'any[]' type.
            return null;
        }

        const inUse = this.determinePanelsInUse(this.activeLayout);

        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'inUse' implicitly has an 'any[]' type.
        return Object.keys(this.board.panels).filter(type => inUse.indexOf(type) === -1);
    }

    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'inUse' implicitly has an 'any[]' type.
    determinePanelsInUse(rows) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'b' implicitly has an 'any' type.
        let inUse = [];

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeLayout' does not exist on type 'La... Remove this comment to see the full error message
        rows.forEach(row => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rows' implicitly has an 'any' type.
            row.columns.forEach(column => {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'target' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7034) FIXME: Variable 'inUse' implicitly has type 'any[]' in so... Remove this comment to see the full error message
                if (column.rows !== undefined) {
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rows' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
                    inUse = [...inUse, ...this.determinePanelsInUse(column.rows)];
                } else {
                    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'inUse' implicitly has an 'any[]' type.
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rows' implicitly has an 'any' type.
                    inUse = [...inUse, ...column.panels];
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
                }
            });
        });

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
        return inUse;
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'inUse' implicitly has an 'any[]' type.
    }

    swapPanels(a, b) {
        const layout = [...this.activeLayout];

        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'inUse' implicitly has an 'any[]' type.
        this.updatePath(layout, a.objectPath, b.id);
        this.updatePath(layout, b.objectPath, a.id);

        return layout;
    }

    movePanel(target, panelDropped) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'target' implicitly has an 'any' type.
        const layout = this.removePanel(this.activeLayout, panelDropped.id);

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'panelDropped' implicitly has an 'any' t... Remove this comment to see the full error message
        this.updatePath(layout, target.objectPath, panelDropped.id);

        return layout;
    }

    updatePath(rows, path, panelId) {
        const column = rows[path[0]].columns[path[1]];

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rows' implicitly has an 'any' type.
        if (path.length > 3) {
            this.updatePath(column.rows, path.slice(2), panelId);
        } else if (path.length === 3) {
            column.panels[path[2]] = panelId;
        } else {
            column.panels.push(panelId);
        }
    }

    removePanel(rows, panelId) {
        return rows.map(row => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rows' implicitly has an 'any' type.
            const columns = row.columns.map(column => {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
                if (column.rows !== undefined) {
                    return {
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
                        ...column,
                        rows: this.removePanel(column.rows, panelId),
                    };
                }

                const panelIndex = column.panels.indexOf(panelId);

                if (panelIndex > -1) {
                    column.panels.splice(panelIndex, 1);
                }

                return column;
            });

            return { ...row, columns };
        });
    }
}

export default Layout;
