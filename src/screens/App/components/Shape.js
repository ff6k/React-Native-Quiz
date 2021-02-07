import React from 'react';
import {Image} from 'react-native';
import { useTheme } from 'react-native-paper';
import Input from '../../../components/Input';
import QuizTitle from './QuizTitle'
import Default from './Default'

const Shape = ({
  question,
  userAnswer,
  setUserAnswer,
  image,
  editable
}) => {
  const { dimensions, colors } = useTheme();
  
  return (
    <>        
    <Image source={image}/>
    <Default
            question={question}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            editable={editable}
            />
              
            </>
  );
};
Shape.defaultProps = {
  editable: true,
};
export default Shape;
