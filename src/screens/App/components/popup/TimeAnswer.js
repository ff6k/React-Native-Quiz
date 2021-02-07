import React from 'react';
import { View } from 'react-native';
import { Text, Title, useTheme } from 'react-native-paper';
import QuizTitle from '../QuizTitle'
import FormatedText from '../../../../components/FormatedText';
import Clock from '../../../../components/Clock';

const TimeAnswer = (props) => {
    const { colors } = useTheme();
    //console.log(props)
    return (
        <View>
            {<Clock 
                controllers ={false}
                setMiniute = {()=>{}}
                setHour = {()=>{}}
                miniute = {props.question.m}
                hour = {props.question.h}
            />}
            <Title>Time : {props.question.h}:{props.question.m}</Title>
        </View>  
    );
  };
  
  export default TimeAnswer;