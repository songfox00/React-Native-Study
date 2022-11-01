import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

const requestPermission = async () => {
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

export const Home = () => {
    const navigation = useNavigation();
    const [elecLatitude, setLatitude] = useState(null);
    const [elecLongitude, setLongitude] = useState(null);

    // const openElectricCar = ({ latitude, longitude }) => {
    //     const serviceKey = 'oP%2Bu5mGCpIzWssH7xm7Teh6V41B4GcplWQ2Ae5sSsyvFxZXyKDuw7VUwBC%2FMsjR1nhq1N0NReYvLq9NsqhDe2w%3D%3D';
    //     fetch('http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=' +
    //         serviceKey +
    //         '&zscode=11650&numOfRows=10&pageNo=1&dataType=JSON')
    //         .then(response => response.json())
    //         .then(res => {
    //             // const lat = res.items.item[0].lat;
    //             // const lng = res.items.item[0].lng;
    //             var item = res.items.item;

    //             navigation.navigate('ElectricMap', { latitude: latitude, longitude: longitude, item: item });
    //         })
    //         .catch(err => console.log('err: ', err));

    // }

    const curLocation = () => {
        requestPermission().then(result => {
            console.log({ result });
            if (result === 'granted') {
                Geolocation.getCurrentPosition(
                    pos => {
                        const { latitude, longitude } = pos.coords;
                        console.log('geo: ' + latitude, '', longitude);

                        // openElectricCar({ latitude, longitude })
                        navigation.navigate('ElectricMap', { latitude: latitude, longitude: longitude })
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
    }

    return (
        <SafeAreaView style={styles.view}>
            <TouchableOpacity onPress={() => {
                curLocation()
            }}>
                <Text>
                    가장 가까운 전기 충천소 찾기
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})