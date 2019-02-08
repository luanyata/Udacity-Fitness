import React from 'react'
import {View, StatusBar} from 'react-native'
import {createStore} from "redux"
import {Provider} from 'react-redux'
import reducer from './reducers'
import StackNav from './components/StackNav'
import {Constants} from 'expo'
import {purple} from "./utils/color";
import {setLocalNotification} from "./utils/helpers";

const store = createStore(reducer);

function AppStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <AppStatusBar backgroundColor={purple}
                                  barStyle={'light-content'}/>
                    <StackNav/>
                </View>
            </Provider>
        );
    }
}


