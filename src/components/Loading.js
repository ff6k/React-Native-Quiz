import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import theme from '../assets/theme';

const Loading = ({ text }) => {
  const { colors } = theme;
  const style = {
    container: { backgroundColor: colors.withOpacity(0.7, 'background') },
    text: { color: colors.primary },
  };
  return (
    <View style={[styles.container, style.container]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.text, style.text]}>{text}</Text>
    </View>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
};

Loading.defaultProps = {
  text: 'Please wait...',
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { fontStyle: 'italic', paddingVertical: 5 },
});

export default Loading;
