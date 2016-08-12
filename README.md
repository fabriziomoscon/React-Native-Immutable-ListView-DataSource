# React Native Immutable ListView DataSource

## Why

If you are using ImmutableJS in your app and don't want to convert back toJS.

## Install
```
npm install --save react-native-immutable-listview-datasource
```

## Full example

```
/* @flow */

import React, {Component} from 'react'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native'

import immutable from 'immutable'

import MyListView from 'react-native-immutable-listview-datasource'

const styles = StyleSheet.create({
    list: {
        flex: 1,
        padding: 30,
        backgroundColor: 'rgb(39, 174, 96)'
    },
    row: {
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        color: 'white'
    }
})

const countries = immutable.fromJS([
    {name: 'China', population: '1,393,783,836'},
    {name: 'India', population: '1,267,401,849'},
    {name: 'U.S.A.', population: '322,583,006'},
    {name: 'Indonesia', population: '252,812,245'},
    {name: 'Brazil', population: '202,033,670'}
])

const Title = ({children}) => (
    <Text style={styles.title}>{children}</Text>
)

const Row = ({name, population}) => (
    <View style={styles.row}>
        <Title>{name}</Title>
        <Title>{population}</Title>
    </View>
)

const renderRow = (rowData) => (
    <Row name={rowData.get('name')}
        population={rowData.get('population')} />
)

const CountiesByPopulation = React.createClass({
    getInitialState() {
        return {
            countries: countries,
        }
    },
    componentDidMount() {
      setTimeout(() => {
        this.setState({
            countries: countries.pop()
        })
      }, 3000)

    },
    renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <Row
                name={rowData.get('name')}
                population={rowData.get('population')}
            />
        )
    },
    render() {
        return (
            <MyListView
                style={styles.list}
                list={this.state.countries}
                renderRow={renderRow}
            />
        )
    },
})

module.exports = CountiesByPopulation
```

Read my article about this package https://medium.com/@dalejefferson/react-native-immutablejs-listview-datasource-part-2-cf072df71c8#.ak3wgcnp6
