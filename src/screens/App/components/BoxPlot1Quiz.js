import React from 'react';
import {View} from 'react-native';
import { useTheme } from 'react-native-paper';
import ShortInput from '../../../components/ShortInput';
import QuizTitle from './QuizTitle';
import VictoryBoxPlot from '../../../components/VictoryBoxPlot';

const BoxPlot1Quiz = ({
  question,
  userAnswer,
  setUserAnswer,
  editable
}) => {
  const { dimensions, colors } = useTheme();
  
  console.log(question);
  question.leftTexts = question.leftTexts?question.leftTexts:[];
  question.rightTexts = question.rightTexts?question.rightTexts:[];
  question.rightTexts[0] = question.rightTexts[0]?question.rightTexts[0]:null;
  question.rightTexts[1] = question.rightTexts[1]?question.rightTexts[1]:null;
  question.leftTexts[0] = question.leftTexts[0]?question.leftTexts[0]:null;
  question.leftTexts[1] = question.leftTexts[1]?question.leftTexts[1]:null;

  return (
    <>
      <QuizTitle data={question.title}/>
      <VictoryBoxPlot
        coordinates={question.rows}
        legends={question.labels?question.labels:[]}
        xLabel={question.xLabel}
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
BoxPlot1Quiz.defaultProps = {
  editable: true,
};
export default BoxPlot1Quiz;
