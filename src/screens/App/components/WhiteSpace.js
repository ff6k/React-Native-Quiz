//@flow
import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  size: 'sm' | 'md' | 'lg',
};

const SIZEMAP = {
  sm: 10,
  md: 20,
  lg: 30,
};

const WhiteSpace = (params: Props) => {
  const size = SIZEMAP[params.size || 'sm'];
  return <View style={{ ...styles.container, height: size }} />;
};

const styles = StyleSheet.create({
  container: {
    height: 20,
  },
});

export default WhiteSpace;
