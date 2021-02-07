import React from 'react';
import { View } from 'react-native';
import { Divider, Text, Title, useTheme } from 'react-native-paper';
import { CustomTextInput, register } from '../../../components/MyCustomInput';
import MyKeyboard from './../../../components/MyKeyboard';

const FractionQuize = (props) => {
  register('my-keypad', () => MyKeyboard);

  const { dimensions, colors } = useTheme();
  //const [num, denom] = question.split('/');

  const getElement = (value) => {
    if (value == '<input>') {
      return (
        <CustomTextInput
          placeholder="?"
          placeholderTextColor={colors.primary}
          style={{
            minWidth: dimensions.width(10),
            textAlign: 'center',
            paddingVertical: 3,
          }}
          value={props.userAnswer[0]}
          onChangeText={(text) => props.setUserAnswer(0, text)}
          customKeyboardType="my-keypad"
          editable={props.editable}
        />
      );
    } else {
      return (
        <Text style={{ textAlign: 'center', paddingVertical: 8 }}>{value}</Text>
      );
    }
  };

  return props.fraction.map((element, index) => {
    //console.log(index);
    if (typeof element === 'object' && element !== null) {
      try {
        return (
          <View key={index} style={props.style}>
            {getElement(element.num)}

            {element.det ? (
              <Divider
                style={{
                  backgroundColor: colors.backdrop,
                  width: 22,
                  alignSelf: 'center',
                }}
              />
            ) : null}
            {element.det ? getElement(element.det) : null}
          </View>
        );
      } catch (error) {
        return null;
      }
    } else {
      return (
        <Text
          key={index}
          style={{
            textAlign: 'center',
            paddingBottom: 5,
            paddingHorizontal: 5,
          }}
        >
          {element}
        </Text>
      );
    }
  });
};
FractionQuize.defaultProps = {
  editable: true,
};
export default FractionQuize;
