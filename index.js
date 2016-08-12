import {ListView} from 'react-native'
import React, {PropTypes} from 'react'

import immutable from 'immutable'

const getIdentitiesFromList = (list) => list.keySeq().toArray()
const rowHasChanged = (r1, r2) => r1 !== r2
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID].get(rowID)

const ImmutableDataSource = React.createClass({
    propTypes: {
        list:            PropTypes.instanceOf(immutable.List).isRequired,
        renderRow:       PropTypes.func.isRequired,
        renderSeparator: PropTypes.func,
    },
    loadData (list) {
        const dataSource = new ListView.DataSource({
            rowHasChanged,
            getRowData
        })
        return {
            dataSource: dataSource.cloneWithRows(list, getIdentitiesFromList(list))
        }
    },
    getInitialState() {
        return this.loadData(this.props.list)
    },
    componentWillReceiveProps({list}) {
        if (list.size > 0 && list !== this.props.list) {
            this.setState({
                dataSource: this.loadData(list).dataSource,
            })
        }
    },
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderSeparator={this.props.renderSeparator}
                {...this.props}
            />
        )
    },
})

module.exports = ImmutableDataSource
