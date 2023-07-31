import React from 'react';
import {View, TouchableOpacity, useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DownloadArrowPlate, Home} from '../assets/SvgIcons';
import {
  BottomBarDarkModeStyles,
  BottomBarLightModeStyles,
} from '../assets/styles';

function BottomBar() {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = isDarkMode
    ? BottomBarDarkModeStyles
    : BottomBarLightModeStyles;
  // const styles = lightModeStyles;
  const navigation = useNavigation();

  const navigateToScreen = (screenName: string) => {
    // @ts-ignore
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScreen('Home')}>
        <Home height={22} color={!isDarkMode ? '#000' : '#fff'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScreen('Downloads')}>
        <DownloadArrowPlate height={22} color={!isDarkMode ? '#000' : '#fff'} />
      </TouchableOpacity>
    </View>
  );
}

export default BottomBar;
