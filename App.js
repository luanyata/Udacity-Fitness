import React from 'react'
import {View, Platform,StyleSheet} from 'react-native'
import {createStore} from "redux"
import {Provider} from 'react-redux'
import reducer from './reducers'
import TabNav from './components/TabNav'

const store = createStore(reducer);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <TabNav/>
                </View>
            </Provider>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 30 : 20
    }
});


