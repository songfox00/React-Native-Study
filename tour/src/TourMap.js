import React, { useEffect, useState } from 'react';
import { Platform, View, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Config from 'react-native-config';
import BottomSheet from './BottomSheetModal';
import MapList from './MapList';

const TourMap = ({ route }) => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(null);

    const latitude = route.params.latitude;
    const longitude = route.params.longitude;
    const os = Platform.OS == 'ios' ? "IOS" : "AND";

    useEffect(() => {
        const loadData = async () => {
            const serviceKey = Config.TOUR_AUTHKEY;
            await fetch("http://apis.data.go.kr/B551011/KorService/locationBasedList?serviceKey=" +
                serviceKey +
                "&numOfRows=10&pageNo=1&MobileOS=" + os + "&MobileApp=Tour&_type=json&listYN=Y&arrange=C" +
                "&mapX=" + longitude + "&mapY=" + latitude + "&radius=10000")
                .then(response => response.json())
                .then(res => {
                    // console.log(res.response.body.items.item)
                    const item = res.response.body.items.item;
                    setLocation(item.map((item, index) => (
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
                    setInfo(item);
                    setLoading(true);
                })
                .catch(err => console.log('err: ', err))
        }
        loadData();
    }, []);

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
                {loading && location}
            </MapView>
            {loading && <BottomSheet info={info} modalViisible={route.params.modalViisible} />}
        </View>
    )
}

export default TourMap;