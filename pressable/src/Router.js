import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  useColorScheme,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {
  useTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Router = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Press');
        }}>
        <Text style={{color: colors.accent}}>Pressable</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Router;
