import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    PanResponder,
    Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { useHeaderHeight } from '@react-navigation/elements';

const screenHeight = Dimensions.get("window").height;

export const BottomSheet = (props) => {
    const headerHeight = props.header ? useHeaderHeight() : 0;
    const bottomHeight = props.bottomHeight - headerHeight;
    const halfHeight = props.halfHeight - headerHeight;

    const panY = useRef(new Animated.Value(halfHeight)).current;
    const defaultY = useRef(halfHeight);

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(defaultY.current + gestureState.dy);
            panY._value <= props.topHeight ? panY.setValue(props.topHeight) : null;
            panY._value >= bottomHeight ? panY.setValue(bottomHeight) : null;
        },
        onPanResponderRelease: (event, gestureState) => {
            var moveY = gestureState.moveY - headerHeight;
            if (gestureState.vy <= -0.5) {
                if (gestureState.vy <= -2.5) {
                    openBottomSheet();
                }
                else {
                    if (defaultY.current == bottomHeight) {
                        middleBottomSheet();
                    }
                    else if (defaultY.current == halfHeight && moveY >= halfHeight) {
                        middleBottomSheet();
                    }
                    else if (defaultY.current == halfHeight) {
                        openBottomSheet();
                    }
                    else {
                        openBottomSheet();
                    }
                }
            }
            else if (gestureState.vy >= 0.5) {
                if (gestureState.vy >= 2.5) {
                    closeBottomSheet();
                }
                else {
                    if (defaultY.current == props.topHeight) {
                        middleBottomSheet();
                    }
                    else if (defaultY.current == halfHeight && moveY <= halfHeight) {
                        middleBottomSheet();
                    }
                    else if (defaultY.current == halfHeight) {
                        closeBottomSheet();
                    }
                    else {
                        closeBottomSheet();
                    }
                }
            }
            else {
                if (defaultY.current == bottomHeight) {
                    if (moveY < bottomHeight - props.boundary && moveY >= halfHeight + headerHeight) {
                        middleBottomSheet();
                    }
                    else if (moveY < halfHeight) {
                        openBottomSheet();
                    }
                    else {
                        closeBottomSheet();
                    }
                }
                else if (defaultY.current == halfHeight) {
                    if (moveY < halfHeight - props.boundary) {
                        openBottomSheet();
                    }
                    else if (moveY > halfHeight + props.barHeight / 2 + props.boundary) {
                        closeBottomSheet();
                    }
                    else {
                        middleBottomSheet();
                    }
                }
                else {
                    if ((moveY > props.topHeight + props.barHeight / 2 + props.boundary) && (moveY <= halfHeight)) {
                        middleBottomSheet();
                    }
                    else if (moveY > halfHeight) {
                        closeBottomSheet();
                    }
                    else {
                        openBottomSheet();
                    }
                }
            }
        }
    })).current;

    const openBottomSheet = () => {
        Animated.timing(panY, {
            toValue: props.topHeight,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            defaultY.current = props.topHeight;
        });
    };

    const middleBottomSheet = () => {
        Animated.timing(panY, {
            toValue: halfHeight,
            duration: 300,
            useNativeDriver: false
        }).start(() => {
            defaultY.current = halfHeight;
        });
    };

    const closeBottomSheet = () => {
        Animated.timing(panY, {
            toValue: bottomHeight,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            defaultY.current = bottomHeight;
        });
    };

    return (
        <Animated.View
            style={[styles.view, { top: panY, backgroundColor: props.backgroundColor, borderTopLeftRadius: props.topBorderRadius, borderTopRightRadius: props.topBorderRadius, }]}
        >
            <View style={{ ...styles.bottomSheetPoint, height: props.barHeight, borderTopLeftRadius: props.topBorderRadius, borderTopRightRadius: props.topBorderRadius }}
                {...panResponders.panHandlers}
            >
                <View style={{ ...styles.bar, backgroundColor: props.barLineColor, width: props.barLineWidth, height: props.barLineHeight }} />
            </View>
            <View style={{ ...styles.bottomSheetContainer }}>
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
    topBorderRadius: PropTypes.number,
    boundary: PropTypes.number,
    header: PropTypes.bool
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
    topBorderRadius: 20,
    boundary: 15,
    header: false
}

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    bar: {
        borderRadius: 30,
    },
    bottomSheetPoint: {
        borderColor: '#e4e4e4',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    bottomSheetContainer: {
        flex: 1,
    },
})

export default BottomSheet;