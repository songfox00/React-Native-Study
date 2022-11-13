import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Button
} from 'react-native';
import BottomSheetModal from './src/BottomSheetModal';

export const App = () => {
    return (
        <View style={styles.rootContainer}>
            <BottomSheetModal />
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