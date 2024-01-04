import { StyleSheet, Dimensions } from 'react-native';

import Constants from './constants';
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listStyles: {
    flexGrow: 0,
  },
  listItem: {
    borderWidth: 2,
    borderRadius: 12,
    padding: Constants.spacing,
    marginRight: Constants.spacing,
    borderColor: Constants.colors.active,
  },
  listItemActive: {
    backgroundColor: Constants.colors.active,
  },
  labelListItem: {
    color: Constants.colors.textColor,
    fontWeight: '500',
    fontSize: 16,
  },
  controlsWrapper: {
    marginVertical: 50,
    flexDirection: 'row',
  },
  controls: {
    width: width / 2,
  },
  title: {
    color: Constants.colors.textColor,
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Constants.spacing,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 2,
    borderRadius: 12,
    padding: Constants.spacing,
    // borderColor: Constants.colors.active,
  },
  btnActive: {
    // borderColor: Constants.colors.activeBtn,
  },
  btnNav: {
    borderColor: Constants.colors.active,
    backgroundColor: Constants.colors.active,
  },
});

export default styles;
