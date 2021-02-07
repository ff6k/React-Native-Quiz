import React from 'react';
import { TextInput, View } from 'react-native';
import { Divider, Text, Title, useTheme } from 'react-native-paper';
import FractonQuiz from './FractionQuiz';
import { CustomTextInput, register } from '../../../components/MyCustomInput';
import MyKeyboard from './../../../components/MyKeyboard';

const MixedFraction = ({
  question,
  userAnswer,
  setUserAnswer,
  title,
  noDet,
  editable
}) => {
  register('my-keypad', () => MyKeyboard);

  const { dimensions, colors } = useTheme();
  //const [num, denom] = question.split('/');

  return (
    <>
      <Title>{title}</Title>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
      >
        <FractonQuiz fraction={question} />
        <Title style={{ textAlign: 'center' }}>{'\t=\t'}</Title>
        <View style={{ flexDirection: 'row' }}>
          <CustomTextInput
            placeholder="?"
            placeholderTextColor={colors.primary}
            style={{
              minWidth: dimensions.width(20),
              textAlign: 'center',
              // paddingVertical: 8,
              // borderWidth:1,
              // borderRadius:3,
              // borderColor:colors.primary,
              // marginRight:5,
            }}
            value={userAnswer[0]}
            onChangeText={(text) => setUserAnswer(0, text)}
            customKeyboardType="my-keypad"
            editable={editable}
          />
          <View>
            <CustomTextInput
              placeholder="?"
              placeholderTextColor={colors.primary}
              style={{
                minWidth: dimensions.width(20),
                textAlign: 'center',
                paddingVertical: 8,
              }}
              value={userAnswer[1]}
              onChangeText={(text) => setUserAnswer(1, text)}
              customKeyboardType="my-keypad"
              editable={editable}
            />
            <Divider style={{ backgroundColor: colors.primary }} />
            <CustomTextInput
              placeholder="?"
              placeholderTextColor={colors.primary}
              value={userAnswer[2]}
              style={{
                width: dimensions.width(20),
                textAlign: 'center',
                paddingVertical: 8,
              }}
              onChangeText={(text) => setUserAnswer(2, text)}
              customKeyboardType="my-keypad"
              editable={editable}
            />
          </View>
        </View>
      </View>
    </>
  );
};
MixedFraction.defaultProps = {
  editable: true,
};
export default MixedFraction;
