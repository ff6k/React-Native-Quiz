import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { HelperText, TextInput, useTheme } from 'react-native-paper';
import inputProps from '../constants/inputProps';
import validators from '../constants/validators';
import { isValid } from './../utils/helpers';

const Input = ({
  onChangeText,
  containerStyle,
  style,
  value,
  label,
  mode,
  validate,
  ...props
}) => {
  const { dimensions, colors } = useTheme();
  const inputProperties = inputProps.find((i) =>
    label.toLowerCase().includes(i.label.toLowerCase()),
  );
  const valid = isValid(inputProperties?.label.toLowerCase(), value);
  return (
    <View style={containerStyle}>
      <TextInput
        onChangeText={onChangeText}
        mode={mode}
        style={{
          textTransform: 'capitalize',
          marginBottom: validate ? 0 : 15,
          minWidth: '35%',
          ...style,
        }}
        error={validate && value.length && !valid}
        {...inputProperties}
        {...props}
        label={label}
        value={value}
      />
      {validate && (
        <HelperText
          type={value.length ? 'error' : 'info'}
          visible={!valid}
          style={{ marginBottom: valid ? 0 : 5 }}
        >
          {validators[inputProperties.label?.toLowerCase()]?.text}
        </HelperText>
      )}
    </View>
  );
};

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  props: PropTypes.objectOf(PropTypes.any),
  mode: PropTypes.string,
  validate: PropTypes.bool,
  containerStyle: PropTypes.objectOf(PropTypes.any),
};

Input.defaultProps = {
  value: '',
  label: '',
  props: {},
  containerStyle: {},
  style: {},
  mode: 'outlined',
  validate: true,
};

export default Input;
