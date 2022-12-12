import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class Home extends Component {
    navigation = useNavigation();

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.navigation.navigate('BottomSheet')}>
                    <Text>
                        openBottomSheet
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Home;