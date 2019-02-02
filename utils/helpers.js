import React from 'react';
import {View} from 'react-native'
import {FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'
import {blue} from "./color";

export function getDailyReminderValue() {
    return {
        today: '🤘🏽 Dont forget log your data today!'
    }
}


export function getMetricMetaInfo(metric) {
    const info = {
        run: {
            display: 'Run',
            max: 50,
            unit: 'm',
            step: 1,
            type: 'steppers',
            getIcon() {
                return (
                    <View>
                        <MaterialIcons
                            name='directions-run'
                            color={blue}
                            size={35}/>
                    </View>
                )
            }
        },
        bike: {
            display: 'Bike',
            max: 100,
            unit: 'm',
            step: 1,
            type: 'steppers',
            getIcon() {
                return (
                    <View>
                        <MaterialCommunityIcons
                            name='bike'
                            color={blue}
                            size={35}/>
                    </View>
                )
            }
        },
        swim: {
            display: 'Swim',
            max: 9900,
            unit: 'm',
            step: 1,
            type: 'steppers',
            getIcon() {
                return (
                    <View>
                        <MaterialCommunityIcons
                            name='swim'
                            color={blue}
                            size={35}/>
                    </View>
                )
            }
        },
        sleep: {
            display: 'Sleep',
            max: 24,
            unit: 'hh',
            step: 1,
            type: 'slider',
            getIcon() {
                return (
                    <View>
                        <FontAwesome
                            name='bed'
                            color={blue}
                            size={35}/>
                    </View>
                )
            }

        },
        eat: {
            displayName: 'Eat',
            max: 10,
            unit: 'rating',
            step: 1,
            type: 'slider',
            getIcon() {
                return (
                    <View>
                        <MaterialCommunityIcons
                            name='food'
                            color={blue}
                            size={35}
                        />
                    </View>
                )
            }
        },
    };

    return typeof metric === 'undefined'
        ? info
        : info[metric]
}


export function isBetween(num, x, y) {
    return num >= x && num <= y;
}

export function calculateDirection(heading) {
    let direction = '';

    if (isBetween(heading, 0, 22.5)) {
        direction = 'North'
    } else if (isBetween(heading, 22.5, 67.5)) {
        direction = 'North East'
    } else if (isBetween(heading, 67.5, 112.5)) {
        direction = 'East'
    } else if (isBetween(heading, 112.5, 157.5)) {
        direction = 'South East'
    } else if (isBetween(heading, 157.5, 202.5)) {
        direction = 'South'
    } else if (isBetween(heading, 202.5, 247.5)) {
        direction = 'South West'
    } else if (isBetween(heading, 247.5, 292.5)) {
        direction = 'West'
    } else if (isBetween(heading, 292.5, 337.5)) {
        direction = 'North West'
    } else if (isBetween(heading, 337.5, 360)) {
        direction = 'North'
    } else {
        direction = 'Calculating'
    }

    return direction
}

export function timeToString(time = Date.now()) {
    const date = new Date(time);
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
}
