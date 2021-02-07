import React from 'react';
import { View } from 'react-native';
import { Divider, Text, Title, useTheme } from 'react-native-paper';
import { CustomTextInput, register } from '../../../components/MyCustomInput';
import MyKeyboard from './../../../components/MyKeyboard';
import {getArrayDepth} from '../../../utils/helpers';

const InlineInput = (props) => {
  register('my-keypad', () => MyKeyboard);

  const { dimensions, colors } = useTheme();
  //const [num, denom] = question.split('/');
  let txtCount=0;

let flexDirection = getArrayDepth(props.question)>1?'column':'row';
  return (
    <View style={{flexDirection:flexDirection}}>
      {props.question.map((element, index) => {
        if(Array.isArray(element)){
          return <View key={index} style={{flexDirection:'column'}}>
            <InlineInput            
            question={element}
            userAnswer={props.userAnswer}
            setUserAnswer={props.setUserAnswer}
            setCheck={props.setCheck}
            editable={props.editable}
          /></View>
        }else{
          let num;
          if(element != '<input>'){
            txtCount++;
          }else{
            num = index-txtCount
          }
          try {
            return (
              <View key={index} style={props.style}>
                {element == '<input>'? 
                  (
                    <CustomTextInput
                      placeholder="?"
                      placeholderTextColor={colors.primary}
                      style={{
                        minWidth: dimensions.width(10),
                        textAlign: 'center',
                        paddingVertical: 3,
                      }}
                      value={props.userAnswer[num]}
                      onChangeText={(text) => props.setUserAnswer(num, text)}
                      customKeyboardType="my-keypad"
                      editable={props.editable}
                    />
                  ):(
                    <Text style={{ textAlign: 'center', paddingVertical: 8 }}>{element}</Text>
                  )
                }
              </View>
            );
          } catch (error) {
            console.log(error);
          }
        }    
      })}
  </View>
  )

};
InlineInput.defaultProps = {
  editable: true,
};
export default InlineInput;
