/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './screens/HomeScreen';
import DownloadsScreen from './screens/DownloadsScreen';
import BottomBar from './components/BottomBar';

const Stack = createStackNavigator();

const lightModeStyles = {
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
};

const darkModeStyles = {
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
};

function AppNavigator() {
  const isDarkMode = useColorScheme() === 'dark';

  // const styles = isDarkMode ? darkModeStyles : lightModeStyles;
  const styles = lightModeStyles;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={isDarkMode ? '#03001C' : '#fff'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Downloads"
            component={DownloadsScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>

        <BottomBar />
      </NavigationContainer>
    </SafeAreaView>
  );
}

function App(): JSX.Element {
  return <AppNavigator />;
}

export default App;
