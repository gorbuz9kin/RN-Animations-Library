import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

type Props = {
  rating: number;
};

const Rating: React.FC<Props> = ({ rating }) => {
  const filledStars = Math.floor(rating / 2);
  const maxStars = new Array(5 - filledStars).fill('staro');
  const stars = [...Array(filledStars).fill('star'), ...maxStars];

  return (
    <View style={styles.ratingWrapper}>
      {stars.map((rate, idx) => (
        <Icon key={`${rating}-${idx}`} name={rate} size={24} color="#000" />
      ))}
    </View>
  );
};

export default Rating;
