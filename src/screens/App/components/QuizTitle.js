import React from 'react';
import {View} from 'react-native';
import { Divider, Text, Title, useTheme } from 'react-native-paper';
import FractionQuiz from './FractionQuiz';
import FormatedText from './../../../components/FormatedText';

const QuizTitle=(props)=>{
    //console.log(props.data);
    if(typeof(props.data) === 'string') {
      
      return (<Title
        //style={{ marginBottom: 5 }}
      ><FormatedText text={props.data}/></Title>)
       
    }
    else{
      let title = []
      props.data.map((element,index) => {
        switch(element.key){
          case 'text':{
            title.push(<Title key={index}>{element.value}</Title>)
            break
          }
          case 'factor':{
            title.push(<FractionQuiz key={index} fraction={element.value}/>)
          }
        }
      })
  
    return(<>{title}</>)
    }
  };
  export default QuizTitle;