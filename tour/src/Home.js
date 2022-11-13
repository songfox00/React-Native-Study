import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid } from 'react-native';
import BottomSheet from './BottomSheet';

requestPermission = async () => {
    try {
        if (Platform.OS === 'ios') {
            return await Geolocation.requestAuthorization('always');
        }
        if (Platform.OS === 'android') {
            return await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
        }
    } catch (e) {
        console.log(e);
    }
};

const Home = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const pressButton = () => setModalVisible(true);

    const getLocation = () => {
        requestPermission().then(result => {
            console.log({ result });
            if (result === 'granted') {
                Geolocation.getCurrentPosition(
                    pos => {
                        const { latitude, longitude } = pos.coords;
                        // console.log(latitude, '', longitude);

                        navigation.navigate('TourMap', { latitude: latitude, longitude: longitude, modalVisible: modalVisible })
                    },
                    error => {
                        comsole.log(error);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 10000,
                    },
                );
            }
        });
    };

    return (
        <SafeAreaView style={styles.view}>
            <TouchableOpacity onPress={() => { getLocation(); pressButton(); }}>
                <Text>
                    주변 관광지 찾기
                </Text>
            </TouchableOpacity>
            {/* <BottomSheet modalVisible={modalVisible} /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})

export default Home;