import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, View, Linking, Text, Button } from 'react-native';

const OpenURLButton = ({ url, title }) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);


        if (supported) {
            await Linking.openURL(url);
        } else {

        }
    }, [url]);

    return (
        <TouchableOpacity onPress={() => handlePress()} style={styles.button}>
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const getInitialURL = () => {
    const [url, setUrl] = useState(null);
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        const getUrlAsync = async () => {
            const initialUrl = await Linking.getInitialURL();

            setTimeout(() => {
                setUrl(initialUrl);
                setProcessing(false);
            }, 1000);
        };

        getUrlAsync();
    }, []);

    return { url, processing };
};

export const App = () => {
    const { url: initialUrl, processing } = getInitialURL();

    return (
        <SafeAreaView style={styles.view}>
            <OpenURLButton url={'mailto:test@mail.com'} title={"메일 보내기"} />
            <OpenURLButton url={'tel:01012345678'} title={"전화 열기"} />
            <OpenURLButton url={'sms:01012345678'} title={"문자 열기"} />
            <OpenURLButton url={'https://google.com'} title={"구글 열기"} />
            <Text style={[styles.text, { marginVertical: 20 }]}>
                {processing ? `Processing the initial url from a deep link`
                    : `The deep link is: ${initialUrl || "None"}`}
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    button: {
        marginVertical: 20,
    },
    text: {
        fontSize: 16,
        color: '#171717',

    }
})