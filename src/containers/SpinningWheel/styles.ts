import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {},
  winnerText: {
    fontSize: 32,
    position: 'absolute',
    bottom: 50,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  knobWrapper: {
    zIndex: 1,
    justifyContent: 'flex-end',
    transform: [{ rotate: '0deg' }],
  },
  knob: {
    transform: [{ translateY: 10 }],
  },
});

export default styles;
