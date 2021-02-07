import React from 'react';
import {View} from 'react-native';
import { useTheme } from 'react-native-paper';
import ShortInput from '../../../components/ShortInput';
import QuizTitle from './QuizTitle';
import Pie from '../../../components/Pie';

const PieInput1 = ({
  question,
  userAnswer,
  setUserAnswer,
  editable
}) => {
  const { dimensions, colors } = useTheme();
  
  //console.log(question.rows);
  question.leftTexts = question.leftTexts?question.leftTexts:[];
  question.rightTexts = question.rightTexts?question.rightTexts:[];
  question.rightTexts[0] = question.rightTexts[0]?question.rightTexts[0]:null;
  question.rightTexts[1] = question.rightTexts[1]?question.rightTexts[1]:null;
  question.leftTexts[0] = question.leftTexts[0]?question.leftTexts[0]:null;
  question.leftTexts[1] = question.leftTexts[1]?question.leftTexts[1]:null;

  return (
    <>
      <QuizTitle data={question.title}/>
      <Pie
        data={question.data}
      />
      <View style={{flexDirection:'row'}}>
              <ShortInput
                label=""
                value={userAnswer[0]}
                onChangeText={text => setUserAnswer(0,text)}
                keyboardType="decimal-pad"
                style={{ width: dimensions.width(20) }}
                containerStyle={{flexDirection: "row"}}
                rightText={question.rightTexts[0]}
                leftText={question.leftTexts[0]}
                editable={editable}
              />
              </View>
    </>
  );
};

PieInput1.defaultProps = {
  editable: true,
};
export default PieInput1;
