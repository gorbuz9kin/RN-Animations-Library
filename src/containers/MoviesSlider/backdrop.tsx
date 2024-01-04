import React from 'react';
import { View, Image, Dimensions, Animated, FlatList } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

type Props = {
  scrollX: Animated.Value;
  movies: { backdrop: string; id: string }[];
  slideSize: number;
};

const { width, height } = Dimensions.get('window');
const BACKDROP_HEIGHT = height * 0.6;

const Backdrop: React.FC<Props> = ({ movies, scrollX, slideSize }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
      <FlatList
        data={movies}
        keyExtractor={item => item.id + '-backdrop'}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * slideSize, (index - 1) * slideSize],
            outputRange: [-width, 0],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                width,
                height,
                overflow: 'hidden',
                transform: [
                  {
                    translateX,
                  },
                ],
              }}
            >
              <Image
                source={{ uri: item.backdrop }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};

export default Backdrop;
