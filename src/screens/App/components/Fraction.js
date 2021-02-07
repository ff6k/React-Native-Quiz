import React from 'react';
import { TextInput, View } from 'react-native';
import { Divider, Text, Title, useTheme } from 'react-native-paper';
import FractonQuiz from './FractionQuiz';
import { CustomTextInput, register } from '../../../components/MyCustomInput';
import MyKeyboard from './../../../components/MyKeyboard';

const Fraction = ({ question, userAnswer, setUserAnswer, title, noDet, editable }) => {
  register('my-keypad', () => MyKeyboard);

  const { dimensions, colors } = useTheme();
  //const [num, denom] = question.split('/');

  return (
    <>
      <Title>{title}</Title>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
      >
        <FractonQuiz fraction={question} />
        <Title style={{ textAlign: 'center' }}>{'\t=\t'}</Title>
        <View>
          <CustomTextInput
            placeholder="?"
            placeholderTextColor={colors.primary}
            style={{
              minWidth: dimensions.width(20),
              textAlign: 'center',
              paddingVertical: 8,
            }}
            value={userAnswer[0]}
            onChangeText={(text) => setUserAnswer(0, text)}
            customKeyboardType="my-keypad"
            editable={editable}
          />
          {!noDet ? (
            <Divider style={{ backgroundColor: colors.primary }} />
          ) : null}
          {!noDet ? (
            <CustomTextInput
              placeholder="?"
              placeholderTextColor={colors.primary}
              value={userAnswer[1]}
              style={{
                width: dimensions.width(20),
                textAlign: 'center',
                paddingVertical: 8,
              }}
              onChangeText={(text) => setUserAnswer(1, text)}
              customKeyboardType="my-keypad"
              editable={editable}
            />
          ) : null}
        </View>
      </View>
    </>
  );
};

Fraction.defaultProps = {
  editable: true,
};

export default Fraction;
