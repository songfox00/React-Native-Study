import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    Dimensions,
    PanResponder,
    Platform
} from 'react-native';

const screenHeight = Dimensions.get("window").height;

export const BottomSheet = () => {
    const half = screenHeight * 0.55;
    const top = Platform.OS == 'ios' ? 30 : 0;
    const bottom = screenHeight - 40;

    const panY = useRef(new Animated.Value(bottom)).current;
    const defaultY = useRef(bottom);
    const translateY = panY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const openBottomSheet = Animated.timing(panY, {
        toValue: top,
        duration: 300,
        useNativeDriver: true,
    });

    const middleBottomSheet = Animated.timing(panY, {
        toValue: half,
        duration: 300,
        useNativeDriver: true
    })

    const closeBottomSheet = Animated.timing(panY, {
        toValue: bottom,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(defaultY.current + gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy > 0) {  //아래로 드래그
                if (gestureState.moveY <= half) {
                    middleBottomSheet.start(() => {
                        defaultY.current = half;
                    });
                }
                else {
                    closeModal();
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
                    })
                }
            }
        }
    })).current;

    useEffect(() => {
        closeBottomSheet.start();
    }, []);

    const closeModal = () => {
        closeBottomSheet.start(() => {
            defaultY.current = bottom;
        })
    }

    return (
        <Modal
            visible={true}
            animationType={"fade"}
        >
            {/* <View style={styles.overlay}> */}
            <Animated.View
                style={{ transform: [{ translateY: translateY }] }}
            >
                <Animated.View style={styles.bottomSheetPoint}
                    {...panResponders.panHandlers}>
                    <View style={styles.bar}>

                    </View>
                </Animated.View>
                <View style={styles.bottomSheetContainer}>
                    <Text>This is BottomSheet</Text>
                </View>

            </Animated.View>
            {/* </View> */}
        </Modal>

    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        // justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    viewTop: {

    },
    background: {
        flex: 1,
    },
    bar: {
        backgroundColor: '#999',
        borderRadius: 30,
        width: 100,
        height: 5
    },
    bottomSheetPoint: {
        height: 30,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOpacity: 2,
        shadowColor: '#e4e4e4',
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSheetContainer: {
        height: screenHeight,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    }
})

export default BottomSheet;