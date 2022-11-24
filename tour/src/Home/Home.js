import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Feather from 'react-native-vector-icons/dist/Feather';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

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
    const [text, onChangeText] = useState("");

    const getLocation = () => {
        requestPermission().then(result => {
            console.log({ result });
            if (result === 'granted') {
                Geolocation.getCurrentPosition(
                    pos => {
                        const { latitude, longitude } = pos.coords;
                        // console.log(latitude, '', longitude);

                        navigation.navigate('TourMap', { latitude: latitude, longitude: longitude })
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
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text} />
                <Feather
                    name="search"
                    size={30}
                    color='#AAC4FF' />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { getLocation(); }} style={styles.recommendView}>
                    <View style={styles.recommendBtn}>
                        <Ionicons
                            name="location-sharp"
                            size={45}
                            color="#AAC4FF" />
                    </View>
                    <Text style={styles.recommendText}>
                        근처 관광지
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={styles.recommendView}>
                    <View style={styles.recommendBtn}>
                        <Ionicons
                            name="flag"
                            size={45}
                            color="#AAC4FF" />
                    </View>
                    <Text style={styles.recommendText}>
                        지역별 관광지
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={styles.recommendView}>
                    <View style={styles.recommendBtn}>
                        <MaterialIcons
                            name="festival"
                            size={45}
                            color="#AAC4FF" />
                    </View>
                    <Text style={styles.recommendText}>
                        행사
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        flex: 1
    },
    inputView: {
        backgroundColor: '#fff',
        height: 45,
        marginHorizontal: 17,
        borderRadius: 20,
        borderColor: '#999',
        flexDirection: 'row',
        marginVertical: 50,
        alignItems: 'center',
        paddingHorizontal: 7
    },
    input: {
        height: 45,
        width: 260
    },
    recommendBtn: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    recommendView: {
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 15
    },
    recommendText: {
        color: '#333333'
    }
})

export default Home;