import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';

const Item = ({ item }) => (
    <TouchableOpacity style={styles.button}>
        <View style={styles.textview}>
            <View>
                <Text style={styles.title}>
                    {item.title}
                </Text>
            </View>
            <View>
                <Text style={styles.distance}>
                    {item.dist >= 1000 ? `${(parseFloat(item.dist) / 1000).toFixed(1)}km` : `${parseFloat(item.dist)}m`}
                </Text>
                {item.tel != "" ?
                    <Text style={styles.addr}>
                        {item.tel}
                    </Text> : null
                }

            </View>
            <View>
                <Text style={styles.addr}>
                    {item.addr1}
                </Text>
            </View>
        </View>
        <View style={styles.imageView}>
            {item.firstimage != "" ?
                <Image
                    source={{ uri: item.firstimage }}
                    style={{ width: 80, height: 80 }}
                /> :
                <Image
                    source={require('./image/no_image.png')}
                    style={{ width: 80, height: 80 }} />
            }

        </View>
    </TouchableOpacity>
)

const MapList = (props) => {
    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => { }}
            />
        )
    };

    return (
        <FlatList
            data={props.info}
            renderItem={renderItem}
            onEndReached={props.onEnd}
            onEndReachedThreshold={0.85}
            ListFooterComponent={props.loading && <ActivityIndicator size="large" color="#0000ff" />}
            keyExtractor={(item) => item.contentid}
        />
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

export default MapList;