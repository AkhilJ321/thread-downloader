import React from 'react';
import {View, TouchableOpacity, useColorScheme, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DownloadArrowPlate, Home} from '../assets/SvgIcons';

function BottomBar() {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = isDarkMode ? darkModeStyles : lightModeStyles;
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

const lightModeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#fff',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
});

const darkModeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#03001C',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    // backgroundColor: '#060404f0f',
  },
});

export default BottomBar;
