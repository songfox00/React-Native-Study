import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export const Mypage = () => {
    return (
        <SafeAreaView style={styles.view}>
            <Text>
                Mypage
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