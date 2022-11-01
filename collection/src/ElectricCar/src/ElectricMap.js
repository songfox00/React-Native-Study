import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Config from 'react-native-config';

const stat = ['', '통신이상', '충전대기', '충전중', '운영중지', '점검중', '', '', '', '상태미확인'];

export const ElectricMap = ({ route }) => {
    // console.log(route.params.item[0]);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const loadCar = async () => {
            const serviceKey = Config.ELECTRIC_API;
            await fetch('http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=' +
                serviceKey +
                '&zscode=11650&numOfRows=10&pageNo=1&dataType=JSON')
                .then(response => response.json())
                .then(res => {
                    const item = res.items.item;
                    console.log(item);

                    setLocation(item.map((item, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: parseFloat(item.lat),
                                longitude: parseFloat(item.lng)
                            }}
                            title={item.addr}
                            description={`충전기상태: ${stat[item.stat]}`}
                        />
                    )))

                    setLoading(true);
                })
                .catch(err => console.log('err: ', err));
        }

        loadCar();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: parseFloat(route.params.latitude),
                    longitude: parseFloat(route.params.longitude),
                    latitudeDelta: 0.0122,
                    longitudeDelta: 0.01,
                }}>
                <Marker
                    coordinate={{
                        latitude: parseFloat(route.params.latitude),
                        longitude: parseFloat(route.params.longitude)
                    }}>
                    <Image
                        source={require('./image/cur_loaction.png')}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                    />
                </Marker>
                {loading && location}
            </MapView>
        </View>
    )
}