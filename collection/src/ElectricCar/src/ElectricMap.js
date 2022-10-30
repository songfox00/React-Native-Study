import React from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export const ElectricMap = ({ route }) => {
    console.log(route.params);

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
                }}
            >
                <Marker
                    icon={
                        require('./image/cur_loaction.png')
                    }
                    coordinate={{
                        latitude: parseFloat(route.params.latitude),
                        longitude: parseFloat(route.params.longitude)
                    }}
                />
                <Marker
                    coordinate={{
                        latitude: parseFloat(route.params.elecLatitude),
                        longitude: parseFloat(route.params.elecLongitude)
                    }} />
            </MapView>
        </View>
    )
}