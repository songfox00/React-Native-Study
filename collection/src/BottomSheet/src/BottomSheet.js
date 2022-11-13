import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    PanResponder,
    Platform,
} from 'react-native';
import PropTypes from 'prop-types';

const screenHeight = Dimensions.get("window").height;

export const BottomSheet = (props) => {
    const panY = useRef(new Animated.Value(props.bottomHeight)).current;
    const defaultY = useRef(props.bottomHeight);

    const translateY = panY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const openBottomSheet = Animated.timing(panY, {
        toValue: props.topHeight,
        duration: 300,
        useNativeDriver: false,
    });

    const middleBottomSheet = Animated.timing(panY, {
        toValue: props.halfHeight,
        duration: 300,
        useNativeDriver: false
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: props.bottomHeight,
        duration: 300,
        useNativeDriver: false,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(defaultY.current + gestureState.dy);
            panY._value <= props.topHeight ? panY.setValue(props.topHeight) : null;
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy > 0) {  //아래로 드래그
                if (gestureState.moveY <= screenHeight - props.halfHeight) {
                    middleBottomSheet.start(() => {
                        defaultY.current = props.halfHeight;
                    });
                }
                else {
                    closeBottomSheet.start(() => {
                        defaultY.current = props.bottomHeight;
                    })
                }
            }
            else if (gestureState.dy < 0) { //위로 드래그
                if (gestureState.moveY <= screenHeight * 0.5) {
                    openBottomSheet.start(() => {
                        defaultY.current = props.topHeight;
                    });
                }
                else {
                    middleBottomSheet.start(() => {
                        defaultY.current = props.halfHeight;
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
            style={[styles.view, { top: panY, bottom: 0, backgroundColor: props.backgroundColor, borderTopLeftRadius: props.topBorderRadius, borderTopRightRadius: props.topBorderRadius, }]}
        >
            <View style={{ ...styles.bottomSheetPoint, height: props.barHeight }}
                {...panResponders.panHandlers}
            >
                <View style={{ ...styles.bar, backgroundColor: props.barLineColor, width: props.barLineWidth, height: props.barLineHeight }} />
            </View>
            <View style={{ ...styles.bottomSheetContainer, }}>
                {props.children}
            </View>
        </Animated.View >
    )
}

BottomSheet.propTypes = {
    barHeight: PropTypes.number,
    topHeight: PropTypes.number,
    halfHeight: PropTypes.number,
    bottomHeight: PropTypes.number,
    backgroundColor: PropTypes.string,
    barLineHeight: PropTypes.number,
    barLineWidth: PropTypes.number,
    barLineColor: PropTypes.string,
    topBorderRadius: PropTypes.number
}

BottomSheet.defaultProps = {
    barHeight: 50,
    topHeight: Platform.OS == 'ios' ? 20 : 0,
    halfHeight: screenHeight * 0.55,
    bottomHeight: screenHeight - 50,
    backgroundColor: '#fff',
    barLineHeight: 5,
    barLineWidth: 80,
    barLineColor: '#999',
    topBorderRadius: 20
}

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
    bar: {
        borderRadius: 30,
    },
    bottomSheetPoint: {
        borderColor: '#e4e4e4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetContainer: {
        flex: 1,
    },
})

export default BottomSheet;