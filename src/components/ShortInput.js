import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, useTheme, Title } from 'react-native-paper';
import inputProps from '../constants/inputProps';
import { isValid } from './../utils/helpers';
import FormattedText from './../components/FormatedText';

import MyKeyboard from './MyKeyboard';
import { CustomTextInput, register } from './MyCustomInput';

const ShortInput = ({
  onChangeText,
  containerStyle,
  style,
  value,
  label,
  mode,
  validate,
  rightText,
  leftText,
  ...props
}) => {
  register('my-keypad', () => MyKeyboard);
  const { dimensions, colors } = useTheme();
  const inputProperties = inputProps.find((i) =>
    label.toLowerCase().includes(i.label.toLowerCase()),
  );
  const valid = isValid(inputProperties?.label.toLowerCase(), value);

  return (
    <View style={{ marginLeft: 10 }}>
      <View style={containerStyle}>
        {leftText ? (
          <Title style={styles.title}>
            <FormattedText text={leftText} />
          </Title>
        ) : null}
        <CustomTextInput
          customKeyboardType="my-keypad"
          //keyboardType="numaric"
          onChangeText={onChangeText}
          mode={mode}
          style={{
            marginBottom: validate ? 0 : 15,
            //minWidth: '35%',
            borderColor: colors.primary,
            borderWidth: 1,
            borderRadius: 3,
            marginBottom: 5,
            ...style,
          }}
          error={validate && value.length && !valid}
          {...inputProperties}
          {...props}
          label={label}
          value={value}
          keyboardType="default"
        />
        {rightText ? (
          <Title style={styles.title}>
            <FormattedText text={rightText} />
          </Title>
        ) : null}
      </View>
    </View>
  );
};

ShortInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  props: PropTypes.objectOf(PropTypes.any),
  mode: PropTypes.string,
  validate: PropTypes.bool,
  containerStyle: PropTypes.objectOf(PropTypes.any),
};

ShortInput.defaultProps = {
  value: '',
  label: '',
  props: {},
  containerStyle: {},
  style: {},
  mode: 'outlined',
  validate: true,
};

const styles = StyleSheet.create({
  title: {
    bottom: -6,
    marginLeft: 2,
    height: 31,
    textAlignVertical: 'bottom',
  },
});

export default ShortInput;
