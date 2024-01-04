import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

type Props = {
  value: number | null;
  isVisible: boolean;
};

const Winner: React.FC<Props> = ({ value, isVisible }) =>
  isVisible ? <Text style={styles.winnerText}>Winner is {value}</Text> : null;

export default Winner;
