import React from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { MoviesSlider } from '/src/containers';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <MoviesSlider />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default App;
