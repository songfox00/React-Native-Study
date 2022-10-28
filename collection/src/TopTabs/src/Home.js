import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export const Home = () => {
    return (
        <SafeAreaView style={styles.view}>
            <Text>
                Home
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