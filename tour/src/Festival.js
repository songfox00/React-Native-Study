import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import Config from 'react-native-config';

const Item = ({ item }) => (
    <TouchableOpacity style={styles.button}>
        <View style={styles.imageView}>
            {item.firstimage != "" ?
                <Image
                    source={{ uri: item.firstimage }}
                    style={{ width: 120, height: 160 }}
                /> :
                <Image
                    source={require('./image/no_image.png')}
                    style={{ width: 120, height: 160 }} />
            }

        </View>
        <View style={styles.textview}>
            <Text style={styles.title}>
                {item.title}
            </Text>
            <Text style={styles.addr} numberOfLines={1} ellipsizeMode='tail'>
                {item.addr1 == "" ? "-" : item.addr1}
            </Text>
            <Text style={styles.due}>
                ~ {item.eventenddate}
            </Text>
        </View>
    </TouchableOpacity>
)

const Festival = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const os = Platform.OS == 'ios' ? "IOS" : "AND";

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var monthStr = month < 10 ? 0 + String(month) : month;
        var dateStr = date < 10 ? 0 + String(date) : date;

        const today = String(year) + monthStr + String(dateStr)
        console.log(today);
        const serviceKey = Config.TOUR_AUTHKEY;
        await fetch("http://apis.data.go.kr/B551011/KorService/searchFestival?serviceKey=" +
            serviceKey +
            "&numOfRows=10&pageNo=" + page + "&MobileOS=" + os + "&MobileApp=Tour&_type=json&listYN=Y&arrange=D" +
            "&eventStartDate=" + today)
            .then(response => response.json())
            .then(res => {
                const item = res.response.body.items.item;
                // console.log(item)

                setPage(page + 1);
                setList(list => list.concat(item));
            })
            .catch(err => console.log('err: ', err))
    }

    const onEnd = async () => {
        if (!loading) {
            setLoading(true);
            await loadData();
            setLoading(false);
        }
    }

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => { }}
            />
        )
    };

    return (
        <View>
            <FlatList
                data={list}
                renderItem={renderItem}
                onEndReached={onEnd}
                onEndReachedThreshold={0.9}
                ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
                keyExtractor={(item) => item.contentid}
                style={{ backgroundColor: '#fff' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderBottomColor: '#d4d4d4',
        borderBottomWidth: 1,
    },
    textview: {
        flex: 2
    },
    imageView: {
        flex: 1,
        marginRight: 10
    },
    title: {
        fontSize: 16,
        color: '#171717',
        fontWeight: 'bold',
        marginBottom: 5
    },
    addr: {
        fontSize: 13,
        marginBottom: 5
    },
    due: {
        color: '#171717',
        fontSize: 14,
    }
})

export default Festival;