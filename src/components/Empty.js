import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { Text, Title, useTheme } from 'react-native-paper';
import empty from '../assets/img/empty.png';
import { messages } from '../constants';

const Empty = ({title,message}) => {
  const { colors, dimensions, spacing } = useTheme();

  const containerStyles = {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: spacing.width(),
    backgroundColor: colors.background,
  };
  const imageStyles = {
    width: dimensions.width(90),
    height: dimensions.height(30),
    marginBottom: dimensions.height(5),
  };

  return (
    <View style={containerStyles}>
      <Image
        style={imageStyles}
        source={empty}
        resizeMethod="scale"
        resizeMode="contain"
      />
      <Title style={{ textAlign: 'center' }}>{title}</Title>
      <Text
        style={{ textAlign: 'center', color: colors.backdrop, marginTop: 20 }}
      >
        {message}
      </Text>
    </View>
  );
};

Empty.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

Empty.defaultProps = {
  title: 'Empty List',
  message: messages.empty
};

export default Empty;
