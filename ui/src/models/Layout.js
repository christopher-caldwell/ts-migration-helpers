class Layout {
    constructor() {
        this.board = null;
        this.activeId = null;
        this.activeIndex = null;
        this.activeLayout = null;
        this.hash = null;
    }

    /**
     * Set the current board and active tab ID.
     *
     * @param {Object} board
     * @param {string} tabId
     *
     * @returns {void}
     */
    setBoard(board) {
        const { tabId, hash } = board;
        this.board = board;

        this.activeId = tabId || board.config.layout[0].id;
        this.activeIndex = this.fetchTabIndex(tabId);
        this.hash = hash;

        // Set panel ID based on object key
        if (!this.board.loading) {
            Object.keys(this.board.panels).forEach(panelId => {
                if (this.board.panels[panelId]) {
                    this.board.panels[panelId].id = panelId;
                }
            });
        }

        // Active layout has an empty pseudo-row to make operations easier
        this.activeLayout = [
            { columns: [{ size: 12, panels: [] }] },
            ...this.board.config.layout[this.activeIndex].rows,
        ];
    }

    fetchTabIndex(tabId) {
        let tabIndex = 0;
        if (this.board.type === 'RadioBoard') {
            tabIndex = this.board.config.layout.length > 1 ? 1 : 0;
        }

        if (this.board.config) {
            this.board.config.layout.some((tab, index) => {
                if (tab.id === tabId) {
                    tabIndex = index;

                    return true;
                }

                return false;
            });
        }

        return tabIndex;
    }

    /**
     * Returns the active tab and its properties.
     *
     * @returns {{layout: Array, tabIndex: number, available: number}}
     */
    getActive() {
        return {
            layout: this.activeLayout,
            tabId: this.activeId,
            tabIndex: this.activeIndex,
            available: this.getAvailablePanels(),
            hash: this.hash,
        };
    }

    getActiveLayout() {
        return this.activeLayout;
    }

    getAvailablePanels() {
        if (this.board.panels === null) {
            return null;
        }

        const inUse = this.determinePanelsInUse(this.activeLayout);

        return Object.keys(this.board.panels).filter(type => inUse.indexOf(type) === -1);
    }

    determinePanelsInUse(rows) {
        let inUse = [];

        rows.forEach(row => {
            row.columns.forEach(column => {
                if (column.rows !== undefined) {
                    inUse = [...inUse, ...this.determinePanelsInUse(column.rows)];
                } else {
                    inUse = [...inUse, ...column.panels];
                }
            });
        });

        return inUse;
    }

    swapPanels(a, b) {
        const layout = [...this.activeLayout];

        this.updatePath(layout, a.objectPath, b.id);
        this.updatePath(layout, b.objectPath, a.id);

        return layout;
    }

    movePanel(target, panelDropped) {
        const layout = this.removePanel(this.activeLayout, panelDropped.id);

        this.updatePath(layout, target.objectPath, panelDropped.id);

        return layout;
    }

    updatePath(rows, path, panelId) {
        const column = rows[path[0]].columns[path[1]];

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
            const columns = row.columns.map(column => {
                if (column.rows !== undefined) {
                    return {
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
