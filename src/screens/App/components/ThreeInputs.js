import React from 'react';
import {Text, View} from 'react-native';
import { useTheme, Title } from 'react-native-paper';
import ShortInput from '../../../components/ShortInput';
import QuizTitle from './QuizTitle'

const ThreeInputs = ({
  question,
  userAnswer,
  setUserAnswer,
  editable
}) => {
  const { dimensions, colors } = useTheme();
  //const [num, denom] = question.split('/');
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
              <QuizTitle data={question.text}/>
              <View style={{flexDirection: "row" }}>
              <ShortInput
                label=""
                value={userAnswer[0]}
                onChangeText={text=>setUserAnswer(0,text)}
                keyboardType="decimal-pad"
                style={{ width: dimensions.width(20) }}
                containerStyle={{flexDirection: "row"}}
                rightText={question.rightTexts[0]}
                leftText={question.leftTexts[0]}
                editable={editable}
              />
              <ShortInput
                label=""
                value={userAnswer[1]}
                onChangeText={text=>setUserAnswer(1,text)}
                keyboardType="decimal-pad"
                style={{ width: dimensions.width(20) }}
                containerStyle={{flexDirection: "row"}}
                rightText={question.rightTexts[1]}
                leftText={question.leftTexts[1]}
                editable={editable}
              />
              <ShortInput
                label=""
                value={userAnswer[2]}
                onChangeText={text=>setUserAnswer(2,text)}
                keyboardType="decimal-pad"
                style={{ width: dimensions.width(20) }}
                containerStyle={{flexDirection: "row"}}
                rightText={question.rightTexts[2]}
                leftText={question.leftTexts[2]}
                editable={editable}
              />
              
              </View>
            </>
  );
};

ThreeInputs.defaultProps = {
  editable: true,
};
export default ThreeInputs;
