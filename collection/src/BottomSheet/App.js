import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Button
} from 'react-native';
import BottomSheet from './src/BottomSheetModal';

export const App = () => {
    return (
        <View style={styles.rootContainer}>
            <BottomSheet />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#999'
    }
})