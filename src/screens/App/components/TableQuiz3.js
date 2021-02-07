import React from 'react';
import {View} from 'react-native';
import { useTheme } from 'react-native-paper';
import Input from '../../../components/ShortInput';
import QuizTitle from './QuizTitle';
import Table from '../../../components/Table';

const TableQuiz3 = ({
  question,
  userAnswer,
  setUserAnswer,
  editable
}) => {
  const { dimensions, colors } = useTheme();
  let inputs = question.inputs!== undefined?question.inputs:true;
  question.leftTexts = question.leftTexts?question.leftTexts:[];
  question.rightTexts = question.rightTexts?question.rightTexts:[];
  question.rightTexts[0] = question.rightTexts[0]?question.rightTexts[0]:null;
  question.rightTexts[1] = question.rightTexts[1]?question.rightTexts[1]:null;
  question.rightTexts[2] = question.rightTexts[2]?question.rightTexts[2]:null;
  question.leftTexts[0] = question.leftTexts[0]?question.leftTexts[0]:null;
  question.leftTexts[1] = question.leftTexts[1]?question.leftTexts[1]:null;
  question.leftTexts[2] = question.leftTexts[2]?question.leftTexts[2]:null;
  return (
    <>
      
      <QuizTitle data={question.title}/>
      <Table
        headers={question.headers}
        rows={question.rows}
        containerStyles={{paddingBottom: 50,width:'100%'}}
        userAnswer = {userAnswer}
        setUserAnswer = {setUserAnswer}
        answerIndex={inputs?3:0}
      />
      {inputs?<View style={{flexDirection:'row'}}>
        <Input
          label="Provide your answer..."
          value={userAnswer[0]}
          onChangeText={text=>setUserAnswer(0,text)}
          //keyboardType="my-keypad"
          style={{ width: dimensions.width(30)}}
          //containerStyle={{flexDirection:'row'}}
          rightText={question.rightTexts[0]}
          leftText={question.leftTexts[0]}
          editable={editable}
        />
        <Input
          label="Provide your answer..."
          value={userAnswer[1]}
          onChangeText={text=>setUserAnswer(1,text)}
          //keyboardType="my-keypad"
          style={{ width: dimensions.width(30)}}
          //containerStyle={{flexDirection:'row'}}
          rightText={question.rightTexts[1]}
          leftText={question.leftTexts[1]}
          editable={editable}
        />
        <Input
          label="Provide your answer..."
          value={userAnswer[2]}
          onChangeText={text=>setUserAnswer(2,text)}
          //keyboardType="my-keypad"
          style={{ width: dimensions.width(30)}}
          //containerStyle={{flexDirection:'row'}}
          rightText={question.rightTexts[2]}
          leftText={question.leftTexts[2]}
          editable={editable}
        />
      </View>:null}
    </>
  );
};
TableQuiz3.defaultProps = {
  editable: true,
};
export default TableQuiz3;
