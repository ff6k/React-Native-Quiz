import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  LogBox,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useTheme, Title, Headline, Caption } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Contained as ContainedButton } from '../../components/Button';
import { quizTypes } from '../../constants';
import correctImg from '../../assets/img/good_job_champ.png';
import incorrectImg from '../../assets/img/ehh_wrong.png';
import { getScreen } from '../Common';

import WhiteSpace from './components/WhiteSpace';

const BattleQuizScreen = ({ navigation }) => {
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
    'componentWillReceiveProps has been renamed, and is not recommended for use', // TODO: Remove when fixed
  ]);

  const state = useSelector((state) => state);
  const { battle } = state;
  const { qns, position, result, answers } = battle;

  const [index, setIndex] = useState(parseInt(position, 10));

  const [question, setQuestion] = useState(qns[0]);

  const { colors, spacing } = useTheme();
  const [answer, setAnswer] = useState(answers || []);
  const containerStyles = {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: spacing.width(),
    backgroundColor: colors.background,
  };

  const checkAnswer = (next) => {
    if (next) {
      setIndex(index + 1);
    } else {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    setQuestion(battle?.qns[index]);
    setAnswer(answers[index]);
  }, [index]);

  let quizLevelTitle = '';
  try {
    quizLevelTitle = quizTypes[question.collection]
      .find((q) => q.value === question.type)
      .levels.find((r) => r.value === question.level).label;
  } catch (error) {}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          ...styles.scrollViewStyle,
          backgroundColor: colors.background,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <WhiteSpace />
        {/* {isFetching ? <Loading text="Submiting Battle Result" /> : <></>} */}
        {battle.filter.number > index ? (
          <>
            <Title style={styles.levelTitle}>{quizLevelTitle}</Title>
            <Caption style={styles.headline}>{`${index + 1}/${
              battle.filter.number
            }`}</Caption>
            {/* <BattleResult resultList={resultList} total={battle.filter.number} /> */}
            <View style={containerStyles}>
              {getScreen(
                question,
                () => {},
                () => {},
                () => {},
              )}
              <WhiteSpace />
              <Headline
                style={{ alignSelf: 'center' }}
              >{`Answer is: ${question.answer}`}</Headline>
              <Headline
                style={{ alignSelf: 'center' }}
              >{`Your Answer is: ${answer}`}</Headline>
              {result && result[index] ? (
                <Image style={styles.icon} source={correctImg} />
              ) : (
                <Image style={styles.icon} source={incorrectImg} />
              )}
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <ContainedButton
                disabled={index + 1 === 1}
                title="Prev"
                onPress={checkAnswer.bind(this, false)}
              />
              <ContainedButton
                disabled={index + 1 === parseInt(battle.filter.number, 10)}
                title="Next"
                onPress={checkAnswer.bind(this, true)}
              />
            </View>
            <ContainedButton
              title="Go back"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </>
        ) : (
          <View style={styles.result}>
            <WhiteSpace />
            <WhiteSpace size="lg" />
            <ContainedButton
              title="Go battle"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
  icon: {
    width: 35,
    height: 40,
  },
});

export default BattleQuizScreen;
