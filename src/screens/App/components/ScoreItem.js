import moment from 'moment';
//import React from 'react';
import React, { useState } from 'react';
import {
  TextInput,
  View,
  Alert,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Card, Text, Divider, Title } from 'react-native-paper';
import BasicPopup from './popup/Basic';
import FractionAnswer from './popup/FractionAnswer';
import ClockAnswer from './popup/TimeAnswer';
import MathjaxAnswer from './popup/MathjaxAnswer';

import { QUIZVIEW } from './../../../constants/routeNames';
import FractionQuize from './FractionQuiz';

//import { TouchableOpacity } from 'react-native-gesture-handler';

const ScoreItem = ({
  item: {
    question,
    answer,
    useranswer,
    created,
    correct: status,
    category1,
    category2,
    category3,
  } = {},
  index,
  theme,
  navigation,
}) => {
  const { colors, dimensions } = theme;
  const correct = Boolean(Number(status));
  //question = JSON.stringify(question);
  //console.log(question+'///');
  try {
    question = question.replace(/\n/g, '\\n');
  } catch (error) {
    question = JSON.stringify(question);
    question = question.replace(/\n/g, '\\n');
    //console.log(question);
  }

  question = JSON.parse(question);
  //console.log(question.title)
  const cardStyle = {
    marginBottom: 12,
    width: dimensions.width(96),
    alignSelf: 'center',
  };
  //`${question} = ${answer || evalOperation(question)}`

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation(QUIZVIEW, {
            question: { question },
            answer: { answer },
            correct: { correct },
            userAnswer: { useranswer },
            category1: { category1 },
            category2: { category2 },
            category3: { category3 },
          });
        }}
      >
        <Card key={Number(index)} style={cardStyle}>
          <Card.Title
            //titleStyle={category2==FRACTION?{height:60}:{height:30}}
            title={
              <Text>
                {question.title ? question.title : 'Anser the quection...'}
              </Text>
            }
            subtitle={`You answered: ${useranswer}`}
            left={(props) => (
              <Avatar.Icon
                icon={correct ? 'check' : 'close'}
                style={{ backgroundColor: 'transparent' }}
                color={
                  correct
                    ? colors.withOpacity(1, 'primary')
                    : colors.withOpacity(1, 'error')
                }
                {...props}
              />
            )}
            right={() => (
              <Text style={{ color: colors.backdrop, fontSize: 12 }}>
                {moment(created).format('lll')}
              </Text>
            )}
            rightStyle={{
              paddingBottom: 12,
              paddingRight: 12,
              alignSelf: 'flex-end',
            }}
          />
        </Card>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    //backgroundColor:"red"
  },
  modalView: {
    flexDirection: 'row',
    marginHorizontal: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: 'red',
  },
  buttonContainer: {
    //flex:1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '80%',
  },
});

export default ScoreItem;
