import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ListDynamicScrollToIndex } from '/src/containers';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <ListDynamicScrollToIndex />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default App;
