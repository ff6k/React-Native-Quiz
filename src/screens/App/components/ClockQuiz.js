import React,{useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import { useTheme } from 'react-native-paper';
import Input from '../../../components/ShortInput';
import QuizTitle from './QuizTitle';
import Clock from './../../../components/Clock';
import {HyperText} from './../../../components/Button';

const ClockQuiz = ({
  question,
  userAnswer,
  setUserAnswer,
}) => {
  const { dimensions, colors } = useTheme();
  const [miniutes,setMimiutes] = useState(!question.moveHands?question.time[1]:60);
  const [hours,setHours] = useState(!question.moveHands?question.time[0]:12);

  const setMiniute = (value)=>{
    setUserAnswer(1,value);
  }
  const setHour = (value)=>{
    setUserAnswer(0,value);
  }


  useEffect(() => {
    // Update the document title using the browser API
    console.log(question.time);
  });
  console.log(question.time);
  //let miniute,hour;
  const addMiniuts = ()=>{
    if(miniutes==60){
      setMimiutes(5);
      //console.log(miniutes);
      setMiniute(String(5));
    }else{
      setMimiutes(miniutes+5);
      //console.log(miniutes);
      setMiniute(String(miniutes+5));
    }
    //console.log(miniutes);
  }
  const subMiniuts = ()=>{
    if(miniutes==5){
      setMimiutes(60);
      //miniute = 60;
      setMiniute(String(60));
    }else{
      setMimiutes(miniutes-5);
      //miniute-=5;
      setMiniute(String(miniutes-5));
    }
  }
  const addHours = ()=>{
    if(hours==12){
      setHours(1);
      //hour = 1;
      setHour(String(1));
    }else{
      setHours(hours+1);
      //hour+=1;
      setHour(String(hours+1));
    }
  }
  const subHours = ()=>{
    if(hours==1){
      setHours(12);
      //hour = 12;
      setHour(String(12));
    }else{
      setHours(hours-1);
      //hour-=1;
      setHour(String(hours-1));
    }
  }
  //console.log(question);
  return (
    <>
      
      <QuizTitle data={question.title}/>
      <View style={{flexDirection:'row'}}>
      {question.moveHands?<View style={styles.controllerContainer}>
        <HyperText 
          onPress={()=>subMiniuts()}
          text=''
          title="- m"
        />
        <HyperText 
          onPress={()=>subHours()}
          text=''
          title="- H"
        />
        </View>:null}
        <Clock
          hour={hours}
          miniute={miniutes}
        />
        {question.moveHands?<View style={styles.controllerContainer}>
        <HyperText 
          onPress={()=>addMiniuts()}
          text=''
          title="+ m"
        />
        <HyperText 
          onPress={()=>addHours()}
          text=''
          title="+ H"
        />
        </View>:null}
      </View>
      {!question.moveHands?<View style={{ marginTop: 15, flexDirection:'row' }} >
      <Input
        label="Provide your answer..."
        value={userAnswer[0]}
        onChangeText={text=>setUserAnswer(0,text)}
        //keyboardType="my-keypad"
        style={{ width: dimensions.width(30)}}
        rightText="H"
        containerStyle={{flexDirection:'row'}}
      />
      <Input
        label="Provide your answer..."
        value={userAnswer[1]}
        onChangeText={text=>setUserAnswer(1,text)}
        //keyboardType="my-keypad"
        style={{ width: dimensions.width(30)}}
        rightText="M"
        leftText=": "
        containerStyle={{flexDirection:'row'}}
      />
      </View>:null}
    </>
  );
};

const styles = StyleSheet.create({
  controllerContainer:{
    flexDirection:'column', 
    alignSelf:'center'
  }
})

export default ClockQuiz;
