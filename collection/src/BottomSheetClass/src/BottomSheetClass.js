import React, { PureComponent, createRef } from 'react';
import {
    View,
    Animated,
    Dimensions,
    PanResponder,
    Platform,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { Header } from 'react-navigation';

const screenHeight = Dimensions.get("window").height;

class BottomSheet extends PureComponent {
    headerHeight = this.props.header ? Header.height : 0;
    state = {
        bottomHeight: this.props.bottomHeight - this.headerHeight,
        halfHeight: this.props.halfHeight - this.headerHeight,
        topHeight: this.props.topHeight - this.headerHeight,
        panY: new Animated.Value(this.props.halfHeight - this.headerHeight),
    }
    defaultY = createRef();

    panResponders = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            this.state.panY.setValue(this.defaultY.current + gestureState.dy);
            this.state.panY._value <= this.state.topHeight ? this.state.panY.setValue(this.state.topHeight) : null;
            this.state.panY._value >= this.state.bottomHeight ? this.state.panY.setValue(this.state.bottomHeight) : null;
        },
        onPanResponderRelease: (event, gestureState) => {
            let moveY = gestureState.moveY - this.headerHeight;
            if (gestureState.vy <= -0.5) {
                if (gestureState.vy <= -2.5) {
                    this.openBottomSheet();
                }
                else {
                    if (this.defaultY.current == this.state.bottomHeight) {
                        this.middleBottomSheet();
                    }
                    else if (this.defaultY.current == this.state.halfHeight && moveY >= this.state.halfHeight) {
                        this.middleBottomSheet();
                    }
                    else if (this.defaultY.current == this.state.halfHeight) {
                        this.openBottomSheet();
                    }
                    else if (this.defaultY.current == this.state.topHeight && moveY >= this.state.halfHeight) {
                        this.middleBottomSheet();
                    }
                    else {
                        this.openBottomSheet();
                    }
                }
            }
            else if (gestureState.vy >= 0.5) {
                if (gestureState.vy >= 2.5) {
                    this.closeBottomSheet();
                }
                else {
                    if (this.defaultY.current == this.state.topHeight) {
                        this.middleBottomSheet();
                    }
                    else if (this.defaultY.current == this.state.halfHeight && moveY <= this.state.halfHeight) {
                        this.middleBottomSheet();
                    }
                    else if (this.defaultY.current == this.state.halfHeight) {
                        this.closeBottomSheet();
                    }
                    else if (this.defaultY.current == this.state.bottomHeight && moveY < this.state.halfHeight) {
                        this.middleBottomSheet();
                    }
                    else {
                        this.closeBottomSheet();
                    }
                }
            }
            else {
                if (this.defaultY.current == this.state.bottomHeight) {
                    if (moveY < this.state.bottomHeight - this.props.boundary && moveY >= this.state.halfHeight) {
                        this.middleBottomSheet();
                    }
                    else if (moveY < this.state.halfHeight) {
                        this.openBottomSheet();
                    }
                    else {
                        this.closeBottomSheet();
                    }
                }
                else if (this.defaultY.current == this.state.halfHeight) {
                    if (moveY < this.state.halfHeight - this.props.boundary) {
                        this.openBottomSheet();
                    }
                    else if (moveY > this.state.halfHeight + this.props.barHeight / 2 + this.props.boundary) {
                        this.closeBottomSheet();
                    }
                    else {
                        this.middleBottomSheet();
                    }
                }
                else {
                    if ((moveY > this.state.topHeight + this.props.barHeight / 2 + this.props.boundary) && (moveY <= this.state.halfHeight)) {
                        this.middleBottomSheet();
                    }
                    else if (moveY > this.state.halfHeight) {
                        this.closeBottomSheet();
                    }
                    else {
                        this.openBottomSheet();
                    }
                }
            }
        }
    });

    componentDidMount() {
        this.defaultY.current = this.state.halfHeight;
    }

    openBottomSheet = () => {
        Animated.timing(this.state.panY, {
            toValue: this.state.topHeight,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            this.defaultY.current = this.state.topHeight;
        });
    }

    middleBottomSheet = () => {
        Animated.timing(this.state.panY, {
            toValue: this.state.halfHeight,
            duration: 300,
            useNativeDriver: false
        }).start(() => {
            this.defaultY.current = this.state.halfHeight;
        });
    }

    closeBottomSheet = () => {
        Animated.timing(this.state.panY, {
            toValue: this.state.bottomHeight,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            this.defaultY.current = this.state.bottomHeight;
        });
    }

    render() {
        return (
            <Animated.View
                style={[styles.view, { top: this.state.panY, bottom: 0, backgroundColor: this.props.backgroundColor, borderTopLeftRadius: this.props.topBorderRadius, borderTopRightRadius: this.props.topBorderRadius, }]}
            >
                <View style={{ ...styles.bottomSheetPoint, height: this.props.barHeight, backgroundColor: this.props.backgroundColor, borderTopLeftRadius: this.props.topBorderRadius, borderTopRightRadius: this.props.topBorderRadius, }}
                    {...this.panResponders.panHandlers}
                >
                    <View style={{ ...styles.bar, backgroundColor: this.props.barLineColor, width: this.props.barLineWidth, height: this.props.barLineHeight }} />
                </View>
                <View style={{ ...styles.bottomSheetContainer }}>
                    {this.props.children}
                </View>
            </Animated.View >
        )
    }
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
    barHeight: 45,
    topHeight: Platform.OS == 'ios' ? 20 : 0,
    halfHeight: screenHeight * 0.55,
    bottomHeight: screenHeight - 45,
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
    },
    bar: {
        borderRadius: 30,
    },
    bottomSheetPoint: {
        borderColor: '#e4e4e4',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dedede'
    },
    bottomSheetContainer: {
        flex: 1,
    },
})


export default BottomSheet;