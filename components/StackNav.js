import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import TabNav from './TabNav'
import EntryDetail from './EntryDetail'
import {white, purple} from "../utils/color";
import {Platform} from 'react-native'


const MainNavigation = createStackNavigator({
    home: {
        screen: TabNav,
        navigationOptions: {
            header: null,
        },
    },
    EntryDetail: {
        screen: EntryDetail,
        navigationOptions: ({navigation}) => ({
            headerTintColor: Platform.OS === 'ios' ? purple : white,
            headerStyle: {
                backgroundColor: Platform.OS === 'ios' ? white : purple,
            },
        }),
    },
});

export default createAppContainer(MainNavigation)
