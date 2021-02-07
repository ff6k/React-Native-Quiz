import PropTypes from 'prop-types';
import React from 'react';
import { Platform, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

export const Contained = ({ title, icon, mode, onPress, ...props }) => {
  const { style = {}, contentStyle = {}, ...rest } = props;
  const { dimensions, spacing } = useTheme();
  return (
    <Button
      icon={icon}
      mode={mode}
      onPress={onPress}
      contentStyle={contentStyle}
      style={{
        maxWidth: dimensions.width(50),
        alignSelf: 'center',
        marginTop: Platform.select({ android: 10, ios: 10 }),
        paddingVertical: 5,
        paddingHorizontal: spacing.width(8),
        ...style,
      }}
      labelStyle={{ textTransform: 'capitalize', fontWeight: 'bold' }}
      {...rest}
    >
      {title}
    </Button>
  );
};

Contained.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  props: PropTypes.objectOf(PropTypes.any),
  mode: PropTypes.string,
};

Contained.defaultProps = {
  icon: 'location-enter',
  props: {},
  mode: 'contained',
};

export const HyperText = ({ onPress, text, title, ...props }) => {
  const containerStyles = {
    marginTop: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  };
  return (
    <View style={containerStyles}>
      <Text>{text}</Text>
      <Button
        compact
        labelStyle={{ textTransform: 'capitalize' }}
        onPress={onPress}
        {...props}
      >
        {title}
      </Button>
    </View>
  );
};

HyperText.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  props: PropTypes.objectOf(PropTypes.any),
};

HyperText.defaultProps = { props: {} };
