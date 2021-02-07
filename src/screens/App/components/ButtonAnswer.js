import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback, Image } from 'react-native';
import { Button, Title, useTheme } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { FlatGrid  } from 'react-native-super-grid';


const ButtonAnswer = ({
  question,
  setCheck,
  setAnswer,
  image,
  editable
}) => {
  const { dimensions, colors } = useTheme();
  let answers = [];
  question.from.map((element, index) => {
    answers.push({key:index,value:element});
  });
  
  return (
    <View
      style={{width:'90%'}}
    >
      <Image source={image}/>
      <Title>{question.title}</Title>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <FlatGrid
          data={answers}
          renderItem={({ item, index }) => (
          <Button
          onPress={()=>{
            setAnswer(0,item.value)
            setCheck(true)
          }}
          style={styles.button}
          color="white"
          uppercase={false}
          disabled={!editable}
          >{item.value}</Button>
          )}
        />
      
      </View>
    </View>
  );
};

ButtonAnswer.propTypes = {
  setCheck: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  setAnswer: PropTypes.func.isRequired,
};

ButtonAnswer.defaultProps = {
  editable: true,
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    direction: 'rtl',
    flexWrap: 'wrap'
  },
  image: {
    width: "100%", 
    height: 70, 
    borderRadius: 70/ 2,
    alignItems: 'center',
  },
  button:{
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    paddingTop:7,
    paddingBottom:7,
    backgroundColor:'#841584',
    borderRadius:8,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default ButtonAnswer;


