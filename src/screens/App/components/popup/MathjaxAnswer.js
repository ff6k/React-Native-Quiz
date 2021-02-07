import React from 'react';
import { View } from 'react-native';
import { Text, Title, useTheme } from 'react-native-paper';
import MathJax from '../../../../components/MathJax'
import FormatedText from '../../../../components/FormatedText';

const MathjaxAnswer = (props) => {
    const { colors } = useTheme();
    var question = props.question.replace(/\\/g,"\\\\");
    return (
        <View>
            <MathJax mathjaxEquation ={question}/>
            {!props.correct?<Text>Correct Answer: <FormatedText text={props.answer}/></Text>:null}
        </View>  
    );
  };
  
  export default MathjaxAnswer;