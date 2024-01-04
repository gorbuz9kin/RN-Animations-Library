import React, { useCallback, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

import styles from './styles';

const text =
  'React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces. You can use React Native today in your existing Android and iOS projects or you can create a whole new app from scratch.';
const animationDuration = 1000;

const TextAnimation = () => {
  const animatedValues: any = useRef([]).current;
  const textArr = text.trim().split(' ');
  textArr.forEach((_, idx) => {
    animatedValues[idx] = new Animated.Value(0);
  });

  const animateText = useCallback(
    (toValue = 1) => {
      const animations = textArr.map((_, i) => {
        return Animated.timing(animatedValues[i], {
          toValue,
          duration: animationDuration,
          useNativeDriver: true,
        });
      });

      Animated.stagger(
        animationDuration / 5,
        toValue === 0 ? animations.reverse() : animations,
      ).start(() => {
        setTimeout(() => {
          animateText(toValue === 0 ? 1 : 0);
        }, 1000);
        // Callback, ones the animation is done
        // Alert.alert('', 'Animation is completed!');
      });
    },
    [animatedValues, textArr],
  );

  useEffect(() => {
    animateText();
  }, [animateText]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {textArr.map((word, idx) => {
          return (
            <Animated.Text
              key={idx}
              style={[
                styles.text,
                {
                  opacity: animatedValues[idx],
                  transform: [
                    {
                      translateY: Animated.multiply(
                        animatedValues[idx],
                        new Animated.Value(-5),
                      ),
                    },
                  ],
                },
              ]}
            >
              {word}
              {idx < textArr.length - 1 ? ' ' : ''}
            </Animated.Text>
          );
        })}
      </View>
    </View>
  );
};

export default TextAnimation;
