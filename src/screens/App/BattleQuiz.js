import React, { useEffect, useState } from 'react';
import { View, ScrollView, LogBox, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import { Timer, FlipNumber } from 'react-native-flip-timer';
import { useTheme, Title, Headline } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Contained as ContainedButton } from '../../components/Button';
import { quizTypes } from '../../constants';
import { BATTLE, BATTLERESULT, NOTIFICATION } from '../../constants/routeNames';
import { saveQuiz } from '../../containers/actions/quiz';
import { getScreen } from '../Common';
import BattleResult from './components/BattleResult';

import WhiteSpace from './components/WhiteSpace';
import {
  clearFriendRequestList,
  saveBattleScoreSummary,
  updateBattleResult,
  updatePosition,
} from '../../containers/actions/battle';
import Loading from '../../components/Loading';
import theme from '../../assets/theme';
import { isArray } from 'lodash';

const BattleQuizScreen = ({ navigation }) => {
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
    'componentWillReceiveProps has been renamed, and is not recommended for use', // TODO: Remove when fixed
  ]);

  const state = useSelector((state) => state);
  const { battle, user } = state;
  const {
    qns,
    battleId,
    answers,
    position,
    duration,
    result,
    isFetching,
  } = battle;
  const [index, setIndex] = useState(parseInt(position, 10));
  const [check, setCheck] = useState(false);
  const [userFullAnswer, setUserFullAnswer] = useState('');
  const [userAnswerSet, setUserAnswerSet] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [resultList, setResultList] = useState(result);
  const [answerList, setAnswerList] = useState(answers);

  const [startTime, setStartTime] = useState(moment());
  const [tempDuration, setTempDuration] = useState(moment());

  //   console.log(qns);
  let Textdata = [];
  const setUserAnswers = (index, value) => {
    //console.log(index+":" + value);
    Textdata = [...userAnswerSet];
    Textdata[index] = value;
    //console.log('from Q '+Textdata);

    setUserAnswerSet(Textdata);
  };
  //console.log(quiz);

  const [question, setQuestion] = useState(qns[0]);
  const dispatch = useDispatch();
  const { dimensions, colors, spacing } = useTheme();
  const [answer, setAnswer] = useState();
  const containerStyles = {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: spacing.width(),
    backgroundColor: colors.background,
  };

  const checkAnswer = () => {
    if (battle.filter.number < index + 1) {
      return;
    }

    const tDuration = moment().diff(tempDuration, 'ms');

    let newCorrect, newAnswer, newUserAnswer, storeQuestion, sortAnswer;

    sortAnswer = question.sortAnswer ? true : false;
    newCorrect = true;
    const answerStack = [...userAnswerSet];
    if (sortAnswer) {
      answerStack.sort(function (a, b) {
        return a - b;
      });
      question.answer.sort(function (a, b) {
        return a - b;
      });
    }
    question.answer.forEach((element, key) => {
      if (!(element == answerStack[key])) {
        newCorrect = false;
        return;
      }
    });

    //newUserAnswer = [userAnswerA,userAnswerB,userAnswerC].join('/');
    newUserAnswer = userAnswerSet.join('/');
    newUserAnswer = newUserAnswer.replace(/^\/|\/*$/g, '');

    setUserFullAnswer(newUserAnswer);

    newAnswer = question.storeAnswer
      ? question.storeAnswer
      : question.answer.join('/');
    setAnswer(newAnswer);
    // storeQuestion = question.storeQuiz;

    setAnswer(newAnswer);
    setUserFullAnswer(newUserAnswer);
    setCorrect(newCorrect);
    const __result = [...resultList, newCorrect];
    setResultList(__result);

    const __answers = answerList.concat(newUserAnswer);
    setAnswerList(__answers);

    const param = {
      category: question.collection,
      subCategory: question.type,
      level: question.level,
      totalScore: newCorrect ? 5 : 0,
      duration: tDuration,
      battleCount: index + 1,
      battleId: battle.battleId,
      position: index + 1,
      resultList: JSON.stringify(__result),
      answerList: JSON.stringify(__answers),
    };

    //console.log('summary', param);

    (async () => {
      await saveBattleScoreSummary(param)(dispatch, state);
    })();

    updatePosition({
      battleId,
      index: index + 1,
      duration: parseInt(duration, 10) + parseInt(tDuration, 10),
      result: JSON.stringify(__result),
    })(dispatch);

    hideDialog();
    setTempDuration(moment());
  };

  const hideDialog = () => {
    setCheck(false);
    setUserAnswerSet([]);
    setIndex(index + 1);
  };

  const disabledBtn = false;

  useEffect(() => {
    setQuestion(battle?.qns[index]);
  }, [index]);

  useEffect(() => {
    if (check) {
      (async function () {
        await checkAnswer();
      })();
    }
  }, [check, userAnswerSet]);

  useEffect(() => {
    if (battle.filter.number <= index) {
      //   const dr = moment().diff(moment(startTime), 'ms');
      (async () => {
        const p = {
          userId: user.id,
          battleId,
          score: totalScore(),
          updated: moment().format('YYYY-MM-DD hh:mm:DD'),
        };
        console.log(JSON.stringify(p));
        await updateBattleResult(p)(dispatch);
      })();
    }
  }, [index, battle.filter.number, startTime]);

  let quizLevelTitle = '';
  try {
    quizLevelTitle = quizTypes[question.collection]
      .find((q) => q.value === question.type)
      .levels.find((r) => r.value === question.level).label;
  } catch (error) {}

  const totalScore = () => {
    const correctCount = resultList.filter((a) => a).length;
    return 5 * correctCount;
  };

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.scrollViewStyle,
        backgroundColor: colors.background,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <WhiteSpace />
      {isFetching ? <Loading text="Submiting Battle Result" /> : <></>}
      {battle.filter.number > index ? (
        <>
          <View style={{ alignItems: 'center' }}>
            <Timer
              wrapperStyle={{ backgroundColor: 'transparent' }}
              flipNumberProps={{
                size: dimensions.width(8),
              }}
              time={Math.ceil(duration / 1000) || 1}
              play={true}
            />
          </View>
          <Title style={styles.levelTitle}>{quizLevelTitle}</Title>
          <BattleResult resultList={resultList} total={battle.filter.number} />
          <View style={containerStyles}>
            {getScreen(question, userAnswerSet, setUserAnswers, setCheck)}
            {question.uiComponent != 'buttonAnswer' ? (
              <ContainedButton
                loading={false}
                onPress={checkAnswer}
                title="Check answer"
                icon="check-all"
                disabled={disabledBtn}
              />
            ) : null}
          </View>
        </>
      ) : (
        <View style={styles.result}>
          <Headline style={styles.headline}>
            Total score in this battle is: {totalScore()}
          </Headline>
          <WhiteSpace />
          <BattleResult {...{ resultList }} total={battle.filter.number} />
          <WhiteSpace size="lg" />
          <ContainedButton
            title="Go battle"
            onPress={() => {
              //   await updateBattleResult({
              //     userId: user.id,
              //     battleId,
              //     score: totalScore(),
              //     updated: moment().format('YYYY-MM-DD hh:mm:DD'),
              //     duration: duration,
              //   })(dispatch);

              clearFriendRequestList()(dispatch);

              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: BATTLERESULT }],
                }),
              );
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  levelTitle: { alignSelf: 'center', marginTop: 20 },
  result: {
    paddingHorizontal: 12,
    alignItems: 'stretch',
  },
  headline: {
    alignSelf: 'center',
  },
  loading: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  indictor: {
    alignSelf: 'flex-start',
    marginRight: 10,
  },
});

export default BattleQuizScreen;
