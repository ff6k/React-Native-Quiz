import React from 'react';
import {View} from 'react-native';
import { useTheme } from 'react-native-paper';
import Input from '../../../components/ShortInput';
import QuizTitle from './QuizTitle';
import MathJax from '../../../components/MathJax';

const MathjaxQuiz = ({
  question,
  userAnswer,
  setUserAnswer,
  editable
}) => {
  const { dimensions, colors } = useTheme();
  
  return (
    <>
      <QuizTitle data={question.title}/>
      <MathJax
        //mathjaxEquation={'$\\frac{x-2}{x+3}=\\frac{x-3}{2}$'}
        mathjaxEquation={question.equ}
      />
      {/* <MathJax
        mathjaxEquation={'Solution<br><br>($\\frac{x-2}{x+3}=\\frac{x-3}{2}$$<br>$2(x-2)=(x-3)(x+3)$<br>$$2x-4=x^2-9$<br>$x^2-2x-5=0$<br><br>$x=\\frac{-(-2)\\pm\\sqrt{(-2)^2-4(1)(-5)}}{2(1)}$<br>$x=\\frac{2\\pm\\sqrt{24}}{2}$<br>$x=1\\pm\\sqrt{6}$'}
        
      /> */}
      <Input
        label="Provide your answer..."
        value={userAnswer[0]}
        onChangeText={text=>setUserAnswer(0,text)}
        //keyboardType="my-keypad"
        style={{ width: dimensions.width(90)}}
        editable={editable}
      />
    </>
  );
};
MathjaxQuiz.defaultProps = {
  editable: true,
};
export default MathjaxQuiz;
