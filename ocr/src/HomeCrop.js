import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, PermissionsAndroid, Modal, Image, Dimensions, Platform, Alert, Linking } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";
import FastImage from 'react-native-fast-image';

import callGoogleVision from './helperFunctions';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const HomeCrop = () => {
    const [visible, setVisible] = useState(false);
    const [asset, setAsset] = useState({});
    const [text, setText]=useState('');
    const [grantedCamera, setGrantedCamera] = useState("");
    const [grantedStorage, setGrantedStorage] = useState("");
    const [height, setHeight] = useState(0);
    
    useEffect(() => {
        const permission = async () => {
            var camera = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "카메라 권한",
                    message: "카메라 권한이 필요합니다.",
                    buttonNeutral: "나중에",
                    buttonNegative: "거부",
                    buttonPositive: "허용"
                }
            );
            setGrantedCamera(camera);

            var gallery = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "저장소 권한",
                    message: "저장소 권한이 필요합니다.",
                    buttonNeutral: "나중에",
                    buttonNegative: "거부",
                    buttonPositive: "허용"
                }
            );
            setGrantedStorage(gallery);
        }
        Platform.OS === 'android' ? permission() : null;
    }, [])

    const options = {
        mediaType: 'photo',
        saveToPhotos: true,
    }

    const pickerCamera = () => {
        setVisible(false);
        ImagePicker.openCamera({
            cropping: true,
            freeStyleCropEnabled: true,
            enableRotationGesture: true,
            includeBase64:true
        }).then(image => {
            console.log(image);
            setAsset(image)
        })
            .catch(err => console.log(err));
    }

    const pickerGallery = () => {
        setVisible(false);
        ImagePicker.openPicker({
            cropping: true,
            freeStyleCropEnabled: true,
            enableRotationGesture: true,
            showCropFrame: true,
            includeBase64:true
        }).then(image => {
            console.log(image);
            setAsset(image)

            setHeight(image.cropRect.height * (screenWidth / image.cropRect.width))
        })
            .catch(err => console.log(err));
    }

    const permAlert = (kind) => {
        setVisible(false);
        Alert.alert(
            "권한 요청",
            kind + "를 사용하기 위해 권한을 허용해주세요.",
            [
                {
                    text: '취소',
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "확인",
                    onPress: () => Linking.openSettings()
                }
            ]
        )
    }

    const handleCamera = async () => {

        if (Platform.OS === 'ios') {
            const result = await request(PERMISSIONS.IOS.CAMERA)
            result === RESULTS.GRANTED ?
                pickerCamera() :
                permAlert('카메라');
        }
        else {
            grantedCamera === PermissionsAndroid.RESULTS.GRANTED ?
                pickerCamera() : permAlert('카메라')
        }
    }


    const handleGallery = async () => {
        if (Platform.OS === 'ios') {
            const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
            result === RESULTS.GRANTED ?
                pickerGallery() :
                permAlert('갤러리');
        }
        else {
            grantedStorage === PermissionsAndroid.RESULTS.GRANTED ?
                pickerGallery() : permAlert('갤러리')
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
            <TouchableOpacity onPress={() => { setVisible(true) }} style={styles.floatingBtn}>
                <Text style={styles.floatingText}>
                    +
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.view}>
            <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={[styles.image, { width: '100%', height: height }]}
                source={{ uri: asset.path }}
            />
            {floatingButton()}
            {visible ? <View style={{ position: 'absolute', right: 0, left: 0, bottom: 0, top: 0, backgroundColor: '#d4d4d4aa', ...StyleSheet.absoluteFillObject }}></View> : <></>}
            {modal()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
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
        // marginHorizontal: 15,
        marginVertical: 20,
    }
})

export default HomeCrop;