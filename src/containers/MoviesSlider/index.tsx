import React, { useRef } from 'react';
import { SafeAreaView, Dimensions, Animated } from 'react-native';

import useFetchingMovies from './useFetchingMovies';
import Slide from './slide';
import Backdrop from './backdrop';

import styles from './styles';

const { width } = Dimensions.get('window');
const SLIDE_WIDTH = width * 0.72;

const MoviesSlider: React.FC = () => {
  const { movies } = useFetchingMovies();
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} slideSize={SLIDE_WIDTH} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={movies}
        contentContainerStyle={styles.center}
        keyExtractor={item => item.id}
        snapToInterval={SLIDE_WIDTH}
        snapToAlignment="start"
        renderToHardwareTextureAndroid
        decelerationRate="fast"
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        renderItem={({ item, index }) => (
          <Slide
            index={index}
            item={item}
            scrollX={scrollX}
            slideSize={SLIDE_WIDTH}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default MoviesSlider;
