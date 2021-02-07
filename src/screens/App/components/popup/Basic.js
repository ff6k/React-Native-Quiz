import React from 'react';
import { View } from 'react-native';
import { Text, Title, useTheme } from 'react-native-paper';
import QuizTitle from '../QuizTitle'
import FormatedText from './../../../../components/FormatedText';

const Basic = (props) => {
    const { colors } = useTheme();
    //console.log(props)
    return (
        <View>
            {<QuizTitle data ={props.question}/>}
            {!props.correct?<Text>Correct Answer: <FormatedText text={props.answer}/></Text>:null}
        </View>  
    );
  };
  
  export default Basic;