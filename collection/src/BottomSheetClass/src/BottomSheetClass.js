import React, { createRef, PureComponent } from 'react';
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

class BottomSheetClass extends PureComponent {
    state = {
        panY: new Animated.Value(this.props.bottomHeight),
        defaultY: this.props.bottomHeight,
        panResponders: PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                this.state.panY.setValue(this.state.defaultY + gestureState.dy);
                this.state.panY._value <= this.props.topHeight ? this.state.panY.setValue(this.props.topHeight) : null;
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dy > 0) {  //아래로 드래그
                    if (gestureState.moveY <= screenHeight - this.props.halfHeight) {
                        this.middleBottomSheet();
                        this.setState({
                            defaultY: this.props.halfHeight
                        })
                    }
                    else {
                        this.closeBottomSheet();
                        this.setState({
                            defaultY: this.props.bottomHeight
                        })
                    }
                }
                else if (gestureState.dy < 0) { //위로 드래그
                    if (gestureState.moveY <= screenHeight * 0.5) {
                        this.openBottomSheet();
                        this.setState({
                            defaultY: this.props.topHeight
                        })
                    }
                    else {
                        this.middleBottomSheet();
                        this.setState({
                            defaultY: this.props.halfHeight
                        })
                    }
                }
            }
        })
    }
    // translateY = panY.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, 1],
    // });

    componentDidMount() {
        this.closeBottomSheet();
    }

    openBottomSheet = () => {
        Animated.timing(this.state.panY, {
            toValue: this.props.topHeight,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    middleBottomSheet = () => {
        Animated.timing(this.state.panY, {
            toValue: this.props.halfHeight,
            duration: 300,
            useNativeDriver: false
        }).start();
    }

    closeBottomSheet = () => {
        Animated.timing(this.state.panY, {
            toValue: this.props.bottomHeight,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    render() {
        return (
            <Animated.View
                style={[styles.view, { top: this.state.panY, bottom: 0, backgroundColor: this.props.backgroundColor, borderTopLeftRadius: this.props.topBorderRadius, borderTopRightRadius: this.props.topBorderRadius, }]}
            >
                <View style={{ ...styles.bottomSheetPoint, height: this.props.barHeight }}
                    {...this.state.panResponders.panHandlers}
                >
                    <View style={{ ...styles.bar, backgroundColor: this.props.barLineColor, width: this.props.barLineWidth, height: this.props.barLineHeight }} />
                </View>
                <View style={{ ...styles.bottomSheetContainer, height: this.props.barHeight, }}>
                    {this.props.children}
                </View>
            </Animated.View >
        )
    }
}

BottomSheetClass.propTypes = {
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

BottomSheetClass.defaultProps = {
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

export default BottomSheetClass;