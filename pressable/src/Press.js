import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {useTheme} from 'react-native-paper';

export default Press = () => {
  const [timesPressed, setTimesPressed] = useState(0);
  const {colors} = useTheme();

  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }
  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <Pressable
        onPress={() => {
          setTimesPressed(current => current + 1);
        }}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : colors.primary,
          },
          styles.wrapperCustom,
        ]}>
        {({pressed}) => (
          <Text style={[styles.text, {color: colors.accent}]}>
            {pressed ? 'Pressed!' : 'Press Me'}
          </Text>
        )}
      </Pressable>
      <View style={styles.logBox}>
        <Text style={{color: colors.accent}} testID="pressable_press_console">
          {textLog}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});
