import React, { useMemo, useState, useRef, useEffect } from 'react';
import { SafeAreaView, FlatList, Pressable, Text, View } from 'react-native';

import { MotiView } from 'moti';
import { faker } from '@faker-js/faker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Constants from './constants';

import styles from './styles';

const ListDynamicScrollToIndex = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewPosition, setViewPosition] = useState<number>(0);
  const data = useMemo(
    () =>
      [...Array(20).keys()].map(() => ({
        id: faker.string.uuid(),
        label: faker.animal.bear(),
      })),
    [],
  );
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: activeIndex,
      viewPosition,
      viewOffset:
        viewPosition === 0.5 || viewPosition === 1 ? 0 : Constants.spacing,
      animated: true,
    });
  }, [activeIndex, viewPosition]);

  const onPressBack = () => {
    if (activeIndex === 0) return;
    setActiveIndex(prev => prev - 1);
  };

  const onPressForward = () => {
    if (activeIndex === data.length - 1) return;
    setActiveIndex(prev => prev + 1);
  };

  const scrollPositionControls = [
    {
      name: 'align-horizontal-left',
      value: 0,
    },
    {
      name: 'align-horizontal-center',
      value: 0.5,
    },
    {
      name: 'align-horizontal-right',
      value: 1,
    },
  ];
  const navControls = [
    {
      name: 'arrow-back',
      cb: onPressBack,
    },
    {
      name: 'arrow-forward',
      cb: onPressForward,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        initialScrollIndex={activeIndex}
        style={styles.listStyles}
        data={data}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const isActive = index === activeIndex;
          return (
            <Pressable key={item.id} onPress={() => setActiveIndex(index)}>
              <MotiView
                style={
                  isActive
                    ? [styles.listItem, styles.listItemActive]
                    : styles.listItem
                }
                animate={{
                  opacity: isActive ? 1 : 0.6,
                  backgroundColor: isActive
                    ? Constants.colors.active
                    : Constants.colors.inactive,
                }}
                transition={{
                  duration: 500,
                }}
              >
                <Text style={styles.labelListItem}>{item.label}</Text>
              </MotiView>
            </Pressable>
          );
        }}
      />
      <View style={styles.controlsWrapper}>
        <View style={styles.controls}>
          <Text style={styles.title}>View position</Text>
          <View style={styles.wrapper}>
            {scrollPositionControls.map(btn => {
              const isActive = btn.value === viewPosition;
              return (
                <Pressable
                  key={btn.name}
                  onPress={() => setViewPosition(btn.value)}
                >
                  <MotiView
                    style={styles.btn}
                    animate={{
                      opacity: isActive ? 1 : 0.9,
                      backgroundColor: isActive
                        ? Constants.colors.activeBtn
                        : Constants.colors.active,
                      borderColor: isActive
                        ? Constants.colors.activeBtn
                        : Constants.colors.active,
                    }}
                    transition={{
                      duration: 500,
                    }}
                  >
                    <Icon
                      name={btn.name}
                      size={30}
                      color={Constants.colors.black}
                    />
                  </MotiView>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View style={styles.controls}>
          <Text style={styles.title}>Navigation</Text>
          <View style={styles.wrapper}>
            {navControls.map(btn => (
              <Pressable
                key={btn.name}
                style={[styles.btn, styles.btnNav]}
                onPress={btn.cb}
              >
                <Icon
                  name={btn.name}
                  size={30}
                  color={Constants.colors.black}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ListDynamicScrollToIndex;
