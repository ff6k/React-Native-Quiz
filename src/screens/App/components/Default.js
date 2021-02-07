import React from 'react';
import {View} from 'react-native';
import { useTheme } from 'react-native-paper';
import Input from '../../../components/ShortInput';
import QuizTitle from './QuizTitle';

const Default = ({
  question,
  userAnswer,
  setUserAnswer,
  editable
}) => {
  const { dimensions, colors } = useTheme();

  return (
    <>
      <QuizTitle data={question}/>
      <Input
        label=""
        value={userAnswer[0]}
        onChangeText={text=>setUserAnswer(0,text)}
        //keyboardType="my-keypad"
        style={{ width: dimensions.width(90)}}
        editable={editable}
      />
    </>
  );
};

Default.defaultProps = {
  editable: true,
};

export default Default;
