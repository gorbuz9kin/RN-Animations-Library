import React from 'react';
import { Animated } from 'react-native';

import Svg, { Path } from 'react-native-svg';
import color from 'randomcolor';

import styles from './styles';

type Props = {
  angleAnimatedValue: Animated.Value;
  angleBySegment: number;
  angleOffset: number;
  oneTurn: number;
};

const knobSize = 30;
const knobFill = color({ hue: 'purple' });

const Pointer: React.FC<Props> = ({
  angleAnimatedValue,
  angleBySegment,
  angleOffset,
  oneTurn,
}) => {
  const shakeAnimation = Animated.modulo(
    Animated.divide(
      Animated.modulo(
        Animated.subtract(angleAnimatedValue, angleOffset),
        oneTurn,
      ),
      new Animated.Value(angleBySegment),
    ),
    1,
  );

  return (
    <Animated.View
      style={[
        styles.knobWrapper,
        {
          width: knobSize,
          height: knobSize * 2,
          transform: [
            {
              rotate: shakeAnimation.interpolate({
                inputRange: [-1, -0.45, -0.001, 0.001, 0.45, 1],
                outputRange: [
                  '0deg',
                  '0deg',
                  '35deg',
                  '-35deg',
                  '0deg',
                  '0deg',
                ],
              }),
            },
          ],
        },
      ]}
    >
      <Svg
        width={knobSize}
        height={(knobSize * 100) / 57}
        viewBox={`0 0 57 100`}
        style={styles.knob}
      >
        <Path
          d="M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0zM28.034,40.477c-6.871,0-12.442-5.572-12.442-12.442c0-6.872,5.571-12.442,12.442-12.442c6.872,0,12.442,5.57,12.442,12.442  C40.477,34.905,34.906,40.477,28.034,40.477z"
          fill={knobFill}
        />
      </Svg>
    </Animated.View>
  );
};

export default Pointer;
