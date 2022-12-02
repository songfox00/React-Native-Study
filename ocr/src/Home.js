import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, PermissionsAndroid, Modal, Image, Dimensions, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const Home = () => {
    const [visible, setVisible] = useState(false);
    const [asset, setAsset] = useState([{}]);

    const showPicker = async () => {
        const grantedCamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "카메라 권한",
                message: "카메라 권한이 필요합니다.",
                buttonNeutral: "나중에",
                buttonNegative: "거부",
                buttonPositive: "허용"
            }
        );

        const grantedStorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "저장소 권한",
                message: "저장소 권한이 필요합니다.",
                buttonNeutral: "나중에",
                buttonNegative: "거부",
                buttonPositive: "허용"
            }
        );

        if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED && grantedStorage === PermissionsAndroid.RESULTS.GRANTED) {
            setVisible(true);
            console.log("허용");
        }
        else {
            console.log("거부됨");
        }
    }

    const options = {
        mediaType: 'photo',
        saveToPhotos: true,
    }

    const handleCamera = async () => {
        const result = await launchCamera(options);
        if (result.assets) {
            console.log(result.assets);
            setAsset(result.assets);
            setVisible(false);
        }
        else if (result.didCancel) {
            console.log('취소');
        }
        else if (result.errorMessage) {
            console.log(errorMessage)
        }
    }

    const handleGallery = async () => {
        const result = await launchImageLibrary(options);
        if (result.assets) {
            console.log(result.assets);
            setAsset(result.assets);
            setVisible(false);
        }
        else if (result.didCancel) {
            console.log('취소');
        }
        else if (result.errorMessage) {
            console.log(errorMessage)
        }
    }

    const modal = () => {
        return (
            <Modal visible={visible} animationType="slide" transparent>
                <View style={styles.modal}>
                    <View style={{ backgroundColor: '#ffffffcc', borderRadius: 10 }}>
                        <View style={styles.modalLoad}>
                            <Text style={styles.modalTitle}>
                                사진 불러오기
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={handleCamera} style={styles.modalBtnView}>
                                <Text style={styles.modalBtnText}>
                                    카메라
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleGallery} style={styles.modalBtnView}>
                                <Text style={styles.modalBtnText}>
                                    갤러리
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => { setVisible(false) }} style={styles.modalCancel}>
                            <Text style={styles.modalBtnText}>
                                취소
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    const floatingButton = () => {
        return (
            <TouchableOpacity onPress={() => { Platform.OS === 'android' ? showPicker() : null; setVisible(true) }} style={styles.floatingBtn}>
                <Text style={styles.floatingText}>
                    +
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.view}>
            <Image
                resizeMethod='auto'
                style={styles.image}
                source={{ uri: asset[0].uri }}
            />
            {floatingButton()}
            {visible ? <View style={{ position: 'absolute', right: 0, left: 0, bottom: 0, top: 0, backgroundColor: '#d4d4d4', ...StyleSheet.absoluteFillObject }}></View> : <></>}
            {modal()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff'
    },
    floatingBtn: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#171717',
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    floatingText: {
        color: 'white',
        fontSize: 20
    },
    modal: {
        marginHorizontal: 10,
        marginBottom: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#ffffff00'
    },
    modalLoad: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBtnView: {
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#d9d9d9',
        borderTopWidth: 1,
    },
    modalCancel: {
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 14,
        color: '#333'
    },
    modalBtnText: {
        fontSize: 16,
        color: '#5F9DF7',
    },
    image: {
        marginHorizontal: 15,
        marginTop: 20,
        // width: screenWidth - 30,
        // height: screenHeight - 100,
    }
})


export default Home;