import React from 'react';
import {View} from 'react-native';
import { useTheme } from 'react-native-paper';
import ShortInput from '../../../components/ShortInput';
import QuizTitle from './QuizTitle'


const DynamicInputs = ({
  question,
  userAnswers,
  setUserAnswers,
  inpuCount,
  type,
  editable
}) => {
  const { dimensions, colors } = useTheme();
  //const [num, denom] = question.split('/');

  const inputs = [];

  {
    if(type==1){
      const actCount = inpuCount*2;

      for (let i = 0; i < actCount; i+=2) {
        //console.log(i);
        inputs.push(
          <View style={{flexDirection:'row'}} key={i}>
          <ShortInput 
            label="Answer..."
            value={userAnswers[i]}
            onChangeText={text=>setUserAnswers(i, text)}
            keyboardType="decimal-pad"
            style={{ width: dimensions.width(40) }}
            containerStyle={{flexDirection: "row"}}
            rightText={' ,'}
            editable={editable}
          />
          <ShortInput
            label="Answer..."
            value={userAnswers[i+1]}
            onChangeText={text=>setUserAnswers(i+1, text)}
            keyboardType="decimal-pad"
            style={{ width: dimensions.width(40) }}
            containerStyle={{flexDirection: "row"}}
            editable={editable}
          />
          </View>
        )
        
      }
    }else{
      for (let i = 0; i < inpuCount; i++) {
        
        inputs.push(
          <View style={{flexDirection:'row'}} key={i}>
          <ShortInput 
            label="Answer..."
            value={userAnswers[i]}
            onChangeText={text=>setUserAnswers(i, text)}
            keyboardType="decimal-pad"
            style={{ width: dimensions.width(40) }}
            containerStyle={{flexDirection: "row"}}
            rightText={' X'}
            editable={editable}
          />
          </View>
        )
        
      }
    }
  }
      
  return (
    <>
              <QuizTitle data={question}/>
              {inputs}
            </>
  );
};
DynamicInputs.defaultProps = {
  inpuCount:1,
  type:1,
  editable:true
}
export default DynamicInputs;


