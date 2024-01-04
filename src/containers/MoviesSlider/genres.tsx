import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

type Props = {
  genres: string[];
};

const Genres: React.FC<Props> = ({ genres }) => {
  return (
    <View style={styles.genresWrapper}>
      {genres?.slice(0, 3).map(genre => (
        <Text key={genre} style={styles.genre}>
          {genre}
        </Text>
      ))}
    </View>
  );
};

export default Genres;
