/* @flow */

import {ListView} from 'react-native'

const getIdentitiesFromList = (list) => list.keySeq().toArray();
const rowHasChanged = (r1, r2) => r1 !== r2;
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID].get(rowID);

export default class ImmutableDataSource {
    constructor() {
        this.ds = new ListView.DataSource({
            rowHasChanged,
            getRowData
        });
    }

    cloneWithRows(rows) {
        this.ds = this.ds.cloneWithRows(rows, getIdentitiesFromList(rows))
        return this;
    }

    get rowIdentities() {
        return this.ds.rowIdentities
    }

    get sectionIdentities() {
        return this.ds.sectionIdentities;
    }

    getRowCount() {
        return this.ds.getRowCount()
    }

    rowShouldUpdate(sectionIdx, rowIdx) {
        return this.ds.rowShouldUpdate(sectionIdx, rowIdx)
    }

    getRowData(sectionIdx, rowIdx) {
        return this.ds.getRowData(sectionIdx, rowIdx)
    }
}
