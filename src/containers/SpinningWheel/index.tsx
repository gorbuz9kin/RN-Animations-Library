import React, { useState, useEffect, useMemo, useRef } from 'react';
import { SafeAreaView, View, Dimensions, Animated } from 'react-native';

import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { snap } from '@popmotion/popcorn';

import Pointer from './pointer';
import Wheel from './wheel';
import Winner from './winner';
import { createWheelPaths } from './utils';
import styles from './styles';

const { width } = Dimensions.get('screen');

const numberOfSegments = 10;
const wheelSize = width * 0.9;
const fontSize = 26;
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegments;
const angleOffset = angleBySegment / 2;
const outerRadius = width / 2;

function SpinningWheel(): React.JSX.Element {
  const [enabled, setEnabled] = useState(true);
  const [winner, setWinner] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const angleAnimatedValue = useRef(new Animated.Value(0)).current;
  const angle = useRef(0);
  const wheelPaths = useMemo(
    () => createWheelPaths(numberOfSegments, outerRadius),
    [],
  );

  useEffect(() => {
    angleAnimatedValue.addListener(e => {
      angle.current = e.value;
    });
  }, [angleAnimatedValue, enabled]);

  const getWinnerIndex = () => {
    const deg = Math.abs(Math.round(angle.current % oneTurn));
    if (angle.current < 0) {
      return Math.floor(deg / angleBySegment);
    }
    return (
      (numberOfSegments - Math.floor(deg / angleBySegment)) % numberOfSegments
    );
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      setEnabled(false);
      setIsFinished(false);
    })
    .onEnd(e => {
      const { velocityY } = e;
      Animated.decay(angleAnimatedValue, {
        velocity: velocityY / 500,
        deceleration: 0.999,
        useNativeDriver: true,
      }).start(() => {
        angleAnimatedValue.setValue(angle.current % oneTurn);
        const snapTo = snap(oneTurn / numberOfSegments);
        Animated.timing(angleAnimatedValue, {
          toValue: snapTo(angle.current),
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          const winnerIndex = getWinnerIndex();
          setWinner(wheelPaths[winnerIndex]?.value);
          setEnabled(true);
          setIsFinished(true);
        });
      });
    })
    .enabled(enabled);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <GestureDetector gesture={pan}>
        <View style={[styles.container, styles.center]}>
          <Pointer
            angleAnimatedValue={angleAnimatedValue}
            angleBySegment={angleBySegment}
            angleOffset={angleOffset}
            oneTurn={oneTurn}
          />
          <Wheel
            wheelPaths={wheelPaths}
            numberOfSegments={numberOfSegments}
            angleAnimatedValue={angleAnimatedValue}
            oneTurn={oneTurn}
            wheelSize={wheelSize}
            angleOffset={angleOffset}
            fontSize={fontSize}
          />
        </View>
      </GestureDetector>
      <Winner isVisible={isFinished && enabled} value={winner} />
    </SafeAreaView>
  );
}

export default SpinningWheel;
