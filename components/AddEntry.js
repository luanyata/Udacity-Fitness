import React, {Component} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from "../utils/helpers"
import UdacitySlider from './UdacitySlider'
import UdacitySteppers from './UdacitySteppers'
import DateHeader from './DateHeader'
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton'
import {submitEntry, remoteEntry} from "../utils/api"
import {connect} from 'react-redux'
import {addEntry} from "../actions";

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            onPress={onPress}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    };

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);

        this.setState((state) => {
            const count = state[metric] + step;

            return {
                ...state,
                [metric]: count > max ? max : count,
            }
        })
    };

    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step;

            return {
                ...state,
                [metric]: count < 0 ? 0 : count,
            }
        })
    };

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    };

    submit = () => {
        const key = timeToString();
        const entry = this.state;

        this.props.dispatch(addEntry({
            [key]: entry
        }));

        this.setState(() => ({run: 0, bike: 0, swim: 0, sleep: 0, eat: 0}));

        // Navigate to home

        submitEntry({key, entry})

        // Clear local notification
    };


    reset = () => {
        const key = timeToString();

        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }));

        //Route to Home

        remoteEntry(key)

    };

    render() {
        const metaInfo = getMetricMetaInfo();


        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons
                        name={'md-happy'}
                        size={100}
                    />
                    <Text>You already logged Your information for today</Text>
                    <TextButton onPress={this.reset()}>Reset </TextButton>
                </View>
            )
        }

        return (
            <View>
                <Text>
                    {JSON.stringify(this.state)}
                </Text>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key];
                    const value = this.state[key];

                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                                ? <UdacitySlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                />
                                : <UdacitySteppers
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />}
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}

function mapToStateProps(state) {
    const key = timeToString();

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }

}

export default connect(mapToStateProps)(AddEntry)
