import React from 'react';
import { TextInput, View } from 'react-native';
import { Divider, Text, Title, useTheme } from 'react-native-paper';
import FractonQuiz from './FractionQuiz';
import { CustomTextInput, register } from '../../../components/MyCustomInput';
import MyKeyboard from './../../../components/MyKeyboard';

const Fraction = ({ question, userAnswer, setUserAnswer, title, noDet }) => {
  register('my-keypad', () => MyKeyboard);

  const { dimensions, colors } = useTheme();
  //const [num, denom] = question.split('/');

  return (
    <>
      <Title>{title}</Title>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
      >
        <FractonQuiz
          fraction={question}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
        />
      </View>
    </>
  );
};

export default Fraction;
