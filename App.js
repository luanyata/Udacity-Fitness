import React from 'react'
import {View, SafeAreaView, Platform, StatusBar} from 'react-native'
import {createStore} from "redux"
import {Provider} from 'react-redux'
import reducer from './reducers'
import StackNav from './components/StackNav'
import {Constants} from 'expo'
import {purple} from "./utils/color";

const store = createStore(reducer);

function AppStatusBar({backgroundColor, ...props}) {
    return (
        <SafeAreaView styl={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </SafeAreaView>
    )
}

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <AppStatusBar backgroundColor={purple}
                                  barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}/>
                    <StackNav/>
                </View>
            </Provider>
        );
    }
}


