import React from 'react';
import { Animated, Dimensions } from 'react-native';

import Svg, { Path, G, Text, TSpan } from 'react-native-svg';

import styles from './styles';

const { width } = Dimensions.get('screen');

type Props = {
  numberOfSegments: number;
  angleAnimatedValue: Animated.Value;
  oneTurn: number;
  wheelSize: number;
  angleOffset: number;
  fontSize: number;
  wheelPaths: {}[];
};

const Wheel: React.FC<Props> = ({
  numberOfSegments,
  angleAnimatedValue,
  oneTurn,
  wheelSize,
  angleOffset,
  fontSize,
  wheelPaths,
}) => {
  return (
    <Animated.View
      style={[
        styles.center,
        {
          transform: [
            {
              rotate: angleAnimatedValue.interpolate({
                inputRange: [-oneTurn, 0, oneTurn],
                outputRange: [`-${oneTurn}deg`, '0deg', `${oneTurn}deg`],
              }),
            },
          ],
        },
      ]}
    >
      <Svg
        width={wheelSize}
        height={wheelSize}
        viewBox={`0 0 ${width} ${width}`}
        style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}
      >
        <G x={width / 2} y={width / 2}>
          {wheelPaths.map((arc: any, idx: number) => {
            const [x, y] = arc.centroid;
            const number = arc.value.toString();
            return (
              <G key={`arc-${idx}`}>
                <Path d={arc.path} fill={arc.color} />
                <G
                  rotation={(idx * oneTurn) / numberOfSegments + angleOffset}
                  origin={`${x}, ${y}`}
                >
                  <Text
                    fontSize={fontSize}
                    x={x}
                    y={y - 70}
                    fill="white"
                    textAnchor="middle"
                  >
                    {Array.from({ length: number.length }).map((_, index) => {
                      return (
                        <TSpan
                          key={`arc-${idx}-slice-${index}`}
                          x={x}
                          dy={fontSize}
                        >
                          {number.charAt(index)}
                        </TSpan>
                      );
                    })}
                  </Text>
                </G>
              </G>
            );
          })}
        </G>
      </Svg>
    </Animated.View>
  );
};

export default Wheel;
