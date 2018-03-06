
import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
export default class Loading extends React.Component {
    render() {
        return (
            <ActivityIndicator size="large" color="#0000ff" />
        )
    }
}