import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './Home';

const HomeScreenView = () => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            {visible ?
                <View style={{ backgroundColor: '#999', flex: 1 }} /> : <></>
            }
            <Home setVisible={setVisible} visible={visible} />
        </View>
    )
}

export default HomeScreenView;