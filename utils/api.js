import {AsyncStorage} from 'react-native'
import {CALENDAR_STORAGE_KEY, formatCalendarResults} from "./_calendar";


export function fetchCalendarResults() {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(formatCalendarResults)
}


export function submitEntry({key, entry}) {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({[key]: entry}))
}

export function remoteEntry(key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(resulst => {
            const data = JSON.parse(resulst);
            data[key] = undefined;
            delete data[key];
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}
