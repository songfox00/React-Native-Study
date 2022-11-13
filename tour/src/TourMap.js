import React, { useEffect, useState } from 'react';
import { Platform, View, Image, Dimensions, StyleSheet, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Config from 'react-native-config';
import BottomSheet from './BottomSheet';
import MapList from './MapList';

const screenHeight = Dimensions.get("window").height;

const TourMap = ({ route }) => {
    const [location, setLocation] = useState(<></>);
    const [pageLoading, setPageLoading] = useState(false);
    const [info, setInfo] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const latitude = route.params.latitude;
    const longitude = route.params.longitude;
    const os = Platform.OS == 'ios' ? "IOS" : "AND";

    const loadData = async () => {
        const serviceKey = Config.TOUR_AUTHKEY;
        await fetch("http://apis.data.go.kr/B551011/KorService/locationBasedList?serviceKey=" +
            serviceKey +
            "&numOfRows=10&pageNo=" + page + "&MobileOS=" + os + "&MobileApp=Tour&_type=json&listYN=Y&arrange=C" +
            "&mapX=" + longitude + "&mapY=" + latitude + "&radius=10000")
            .then(response => response.json())
            .then(res => {
                // console.log(res.response.body.items.item)
                const item = res.response.body.items.item;

                setPage(page + 1);
                setLocation(info.concat(item).map((item, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: parseFloat(item.mapy),
                            longitude: parseFloat(item.mapx)
                        }}
                        title={item.title}
                        description={item.addr1}
                    />
                )))
                setInfo(info => info.concat(item));
                setPageLoading(true);
            })
            .catch(err => console.log('err: ', err))
    }

    useEffect(() => {
        loadData();
    }, []);

    const onEnd = async () => {
        if (!loading) {
            setLoading(true);
            await loadData();
            setLoading(false);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    latitudeDelta: 0.0122,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                    }}
                >
                    <Image
                        source={require('./image/cur_loaction.png')}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                    />
                </Marker>
                {pageLoading && location}
            </MapView>
            {pageLoading && <BottomSheet>
                <MapList info={info} onEnd={onEnd} loading={loading} />
            </BottomSheet>}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 30
    },
    textview: {
        flex: 4,
        marginRight: 5
    },
    imageView: {
        flex: 1
    },
    title: {
        fontSize: 18,
        color: '#171717',
        fontWeight: 'bold'
    },
    distanceView: {
        flexDirection: 'row'
    },
    distance: {
        fontWeight: '700',
        fontSize: 14,
    },
    addr: {
        fontSize: 14
    },
})

export default TourMap;