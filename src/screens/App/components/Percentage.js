import React from 'react';
import Input from '../../../components/Input';
import { Divider, Text, Title, useTheme } from 'react-native-paper';

const Percentage = ({
  question,
  userAnswer,
  setUserAnswer,
  editable
}) => {
  const { dimensions, colors } = useTheme();
  //const [num, denom] = question.split('/');

  let quize='';
  let finder;
  question.set.forEach((element,index) => {
    quize+=' '+element[0]+' '+element[1]+' '+question.object+','
    if(index==Number(question.find)){
      finder=element[1]+' '+question.object
    }
  });

  quize = quize.replace(/,\s*$/, "");
  question.quize = `There are${quize}. What percentage is ${finder}?`
  return (
    <>
          <Title
            style={{ marginBottom: 5 }}
          >{question.quize}</Title>
          <Input
            label="Provide your answer..."
            value={userAnswer}
            onChangeText={setUserAnswer}
            keyboardType="decimal-pad"
            style={{ width: dimensions.width(90) }}
            editable={editable}
          />
        </>
  );
};
Percentage.defaultProps = {
  editable: true,
};
export default Percentage;
