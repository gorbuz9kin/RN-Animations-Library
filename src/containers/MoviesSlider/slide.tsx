import React from 'react';
import { View, Animated, Image, Text, Dimensions } from 'react-native';

import Rating from './rating';
import Genres from './genres';

import styles from './styles';

type Props = {
  scrollX: Animated.Value;
  slideSize: number;
  index: number;
  item: {
    title: string;
    poster: string;
    rating: number;
    genres: string[];
    description: string;
  };
};

const Slide: React.FC<Props> = ({ item, slideSize, index, scrollX }) => {
  const { width } = Dimensions.get('window');
  const SPACING = 10;
  const SPACER_slideSize = (width - slideSize) / 2;
  if (!item.title) {
    return (
      <View
        style={{
          width: SPACER_slideSize,
        }}
      />
    );
  }
  const inputRange = [
    (index - 2) * slideSize,
    (index - 1) * slideSize,
    index * slideSize,
  ];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [130, 80, 130],
    extrapolate: 'clamp',
  });
  return (
    <View style={{ width: slideSize }}>
      <Animated.View
        style={[
          styles.slide,
          {
            marginHorizontal: SPACING,
            padding: SPACING * 2,
            transform: [
              {
                translateY,
              },
            ],
          },
        ]}
      >
        <Image
          source={{ uri: item.poster }}
          style={[
            styles.posterImage,
            {
              height: slideSize * 1.2,
            },
          ]}
        />
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Rating rating={item.rating} />
        <Genres genres={item.genres} />
        <Text numberOfLines={4} style={styles.description}>
          {item.description}
        </Text>
      </Animated.View>
    </View>
  );
};

export default Slide;
