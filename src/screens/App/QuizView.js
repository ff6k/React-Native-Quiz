import React, { useState } from 'react';
import {
  View,
  ScrollView,
  LogBox,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useTheme, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Contained as ContainedButton } from '../../components/Button';
import { quizTypes } from '../../constants';
import { RENDERYOUTUBE } from '../../constants/routeNames';
import { imageSource } from '../../utils/imageSource';

import { getScreen } from '../Common';
import BugDialog from './components/popup/BugDialog';

const QuizView = ({ route, navigation }) => {
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
    'componentWillReceiveProps has been renamed, and is not recommended for use', // TODO: Remove when fixed
  ]);
  const {
    question,
    answer,
    correct,
    userAnswer,
    category1,
    category2,
    category3,
  } = route.params;
  const [check, setCheck] = useState(false);
  const [youtube, setYoutube] = useState(false);
  const [userAnswerSet, setUserAnswerSet] = useState(answer.answer.split('/'));
  const [visible, setVisible] = useState(false);

  const show = correct.correct;
  const userAnswered = userAnswer.useranswer;
  const questionAsked = question.question.question;

  const state = useSelector((state) => state);
  const { quiz } = state;
  const { user: { accName, email } = {} } = state;

  let Textdata = [];
  const setUserAnswers = (index, value) => {};
  //console.log('quiz');
  // const [question, setQuestion] = useState(genQuestion(quiz));
  //const [question, setQuestion] = useState(question);
  const dispatch = useDispatch();
  const { colors, spacing, dimensions } = useTheme();
  //const [answer, setAnswer] = useState();
  const containerStyles = {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    padding: spacing.width(),
    backgroundColor: colors.background,
  };
  const [verifyButton, setVerifyButton] = useState(
    question.uiComponent != 'buttonAnswer',
  );

  const Bug = (
    <View style={styles.bugBtn}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Bug Report
        </Text>
      </TouchableOpacity>
    </View>
  );
  const handleCancel = () => {
    setVisible(false);
  };
  const disabledBtn = false;

  let quizLevelTitle = '';
  try {
    quizLevelTitle = quizTypes[quiz.collection]
      .find((q) => q.value === quiz.type)
      .levels.find((r) => r.value === quiz.level).label;
  } catch (error) {}
  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.scrollViewStyle,
        backgroundColor: colors.background,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Title style={styles.levelTitle}>{quizLevelTitle}</Title>
      <BugDialog
        visible={visible}
        handleCancel={handleCancel}
        setVisible={setVisible}
        title={quizLevelTitle}
        userAnswer={userAnswered}
        quizQuestion={questionAsked}
        correctAnswer={answer.answer}
        topicName={category1.category1}
        subTopic={category2.category2}
        level={category3.category3}
        accountName={accName}
        email={email}
      />
      <View style={containerStyles}>
        {getScreen(
          { ...question.question, image: imageSource[question.question.image] },
          userAnswerSet,
          setUserAnswers,
          setCheck,
          true,
        )}

        <ContainedButton
          loading={false}
          onPress={() => navigation.goBack()}
          title="back"
          style={{ backgroundColor: colors.blue }}
          icon={null}
        />
        {show ? null : (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 100,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(RENDERYOUTUBE, {
                  type: quiz.type,
                  level: quiz.level,
                })
              }
              style={styles.helpBtn}
            >
              <Text style={styles.helpText}>HELP!</Text>
            </TouchableOpacity>
            {Bug}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  levelTitle: { alignSelf: 'center', marginTop: 20 },
  helpBtn: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: 80,
    height: 50,
    justifyContent: 'center',
    marginRight: 50,
  },
  helpText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bugBtn: {
    backgroundColor: 'yellow',
    borderRadius: 5,
    width: 80,
    height: 50,
    justifyContent: 'center',
    marginLeft: 50,
  },
});

export default QuizView;
