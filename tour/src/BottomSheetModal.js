import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    PanResponder,
    Platform,

} from 'react-native';
import MapList from './MapList';

const screenHeight = Dimensions.get("window").height;

const barHeight = 50;
const half = screenHeight * 0.55;
const top = Platform.OS == 'ios' ? 20 : 0;
const bottom = screenHeight - barHeight;

export const BottomSheet = (props) => {
    const panY = useRef(new Animated.Value(bottom)).current;
    const defaultY = useRef(bottom);

    const translateY = panY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const openBottomSheet = Animated.timing(panY, {
        toValue: top,
        duration: 300,
        useNativeDriver: false,
    });

    const middleBottomSheet = Animated.timing(panY, {
        toValue: half,
        duration: 300,
        useNativeDriver: false
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: bottom,
        duration: 300,
        useNativeDriver: false,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(defaultY.current + gestureState.dy);
            panY._value <= top ? panY.setValue(top) : null;
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy > 0) {  //아래로 드래그
                if (gestureState.moveY <= screenHeight - half) {
                    middleBottomSheet.start(() => {
                        defaultY.current = half;
                    });
                }
                else {
                    closeBottomSheet.start(() => {
                        defaultY.current = bottom;
                    })
                }
            }
            else if (gestureState.dy < 0) { //위로 드래그
                if (gestureState.moveY <= screenHeight * 0.5) {
                    openBottomSheet.start(() => {
                        defaultY.current = top;
                    });
                }
                else {
                    middleBottomSheet.start(() => {
                        defaultY.current = half;
                    });
                }
            }
        }
    })).current;

    useEffect(() => {
        closeBottomSheet.start();
    }, []);

    return (
        <Animated.View
            style={[styles.view, { top: translateY, bottom: 0 }]}
        >
            <View style={styles.bottomSheetPoint}
                {...panResponders.panHandlers}
            >
                <View style={styles.bar} />
            </View>
            <View style={{ ...styles.bottomSheetContainer, }}>
                <MapList item={props.info} />
            </View>
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
    bar: {
        backgroundColor: '#999',
        borderRadius: 30,
        width: 80,
        height: 5
    },
    bottomSheetPoint: {
        height: barHeight,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: '#e4e4e4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
})

export default BottomSheet;