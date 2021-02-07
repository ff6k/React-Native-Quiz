import React from 'react';
import {View} from 'react-native';
import { useTheme } from 'react-native-paper';
import Input from '../../../components/ShortInput';
import QuizTitle from './QuizTitle';
import Table from '../../../components/Table';

const TableQuiz = ({
  question,
  userAnswer,
  setUserAnswer,
  editable
}) => {
  const { dimensions, colors } = useTheme();
  let inputs = question.inputs!== undefined?question.inputs:true;
  let label1 = question.label1!==undefined?question.label1:"Provide your answer...";
  return (
    <>
      
      <QuizTitle data={question.title}/>
      <Table
        headers={question.headers}
        rows={question.rows}
        containerStyles={{paddingBottom: 50,width:'100%'}}
        userAnswer = {userAnswer}
        setUserAnswer = {setUserAnswer}
        answerIndex={inputs?1:0}
      />
      {inputs?<Input
        label={label1}
        value={userAnswer[0]}
        onChangeText={text=>setUserAnswer(0,text)}
        //keyboardType="my-keypad"
        style={{ width: dimensions.width(90)}}
        //containerStyle={{flexDirection:'row'}}
        editable={editable}
      />:null}
      
    </>
  );
};
TableQuiz.defaultProps = {
  editable: true,
};
export default TableQuiz;
