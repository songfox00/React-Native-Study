import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import BottomSheetClass from './src/BottomSheetClass';
import NavigationClass from './Navigation';

export class App extends PureComponent {
    render() {
        return (
            <NavigationClass />
        )
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#999'
    }
})