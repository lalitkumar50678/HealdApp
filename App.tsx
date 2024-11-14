/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';



function App(): React.JSX.Element {
  


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
      />
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'white'
  },
});

export default App;
