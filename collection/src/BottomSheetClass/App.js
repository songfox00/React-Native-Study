import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import BottomSheetClass from './src/BottomSheetClass';

export class App extends PureComponent {
    render() {
        return (
            <View style={styles.rootContainer}>
                <BottomSheetClass />
            </View>
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