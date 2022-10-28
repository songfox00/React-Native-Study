import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export const Setting = () => {
    return (
        <SafeAreaView style={styles.view}>
            <Text>
                Setting
            </Text>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
})