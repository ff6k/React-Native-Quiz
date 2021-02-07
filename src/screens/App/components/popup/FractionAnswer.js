import React from 'react';
import { View } from 'react-native';
import { Text, Title, useTheme } from 'react-native-paper';
import QuizTitle from '../QuizTitle'
import FractionQuize from '../FractionQuiz'

const FractionAnswer = (props) => {
    const { colors } = useTheme();
    const answer_split = props.answer.split('/')
    const fraction = [{"num": answer_split[0], "det": answer_split[1]}]
    return (
        <View>
            {<QuizTitle data ={props.question}/>}
            {!props.correct?<View style={{flexDirection: "row", }}><Text style={{top:4}}>{"\n"} Correct Answer : </Text><FractionQuize  fraction={fraction}/></View>:null}
        </View>  
    );
  };
  
  export default FractionAnswer;