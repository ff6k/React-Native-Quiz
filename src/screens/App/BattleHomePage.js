import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import { DropAlert } from '../../components/Alert';
import { Contained } from '../../components/Button';
import MyDropDown from '../../components/MyDropDown';
import {
  collictions,
  QUESTIONS_TYPE,
  NUMBERS,
  starts,
  quizTypes,
} from '../../constants';
import { INVITEFRIENDS, BATTLEPAGE } from '../../constants/routeNames';
import { postBattle, startBattle } from '../../containers/actions/battle';
import { generateRandomQns } from '../../utils/quizgenbattle';
import WhiteSpace from './components/WhiteSpace';
import moment from 'moment';
import theme from '../../assets/theme';
import Loading from '../../components/Loading';

const BattleHomePage = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, battle } = useSelector((state) => state);
  const { isPosting } = battle;
  const [questionType, setQuestionType] = useState();
  const [topic, setTopic] = useState();
  const [level, setLevel] = useState();

  const [singleDigitsType, setSingleDigitsType] = useState();
  const [singleDigitsTypeList, setSingleDigitsTypeList] = useState();

  const [singleQuestionTypeList, setSingleQuestionTypeList] = useState([]);
  const [singleQuestionType, setSingleQuestionType] = useState();
  const [number, setNumber] = useState();

  const start = async (isopen) => {
    const filter = {
      questionType,
      topic,
      level,
      number,
      singleQuestionType,
      singleDigitsType,
    };
    console.log('BattleHomePage.js', filter);
    const qns = generateRandomQns(filter);
    if (qns && qns.length === 0) {
      DropAlert('info', 'No Data avaliable', 'Please change conditions');
      return;
    }
    startBattle({ qns, filter })(dispatch);

    if (isopen === 0) {
      navigation.navigate(INVITEFRIENDS);
    } else {
      const bparam = {
        qns: JSON.stringify(qns),
        filter,
        isopen,
        position: 0,
        digitsType: singleDigitsType,
        updated: moment().format('YYYY-MM-DD HH:mm:DD'),
      };
      const result = await postBattle(bparam)(dispatch, { user });
      if (result) {
        navigation.navigate(BATTLEPAGE, {
          screen: 'Open Battle',
        });
      }
    }
  };

  // fixed qns types
  const QuestionTypes = QUESTIONS_TYPE;

  // Get Topic from collictions
  const Topics = collictions.map((item) => ({
    label: item.label,
    value: item.value,
  }));

  // Get levels from starts
  const Levels = starts.map((item) => ({
    label: `${item} ${item > 1 ? 'stars' : 'star'}`,
    value: item,
  }));

  // number of qns is fixed
  const Numbers = NUMBERS;

  useEffect(() => {
    if (topic && level) {
      const list = _.filter(
        quizTypes[topic],
        (item) => item.levels.filter((l) => l.starts === level).length > 0,
      );
      const qnsType = list[0]?.value;

      setSingleQuestionType(qnsType);
      setSingleQuestionTypeList(list || []);
    }
    if (questionType === 2) {
      setSingleQuestionType(null);
    }
  }, [questionType, topic, level]);

  useEffect(() => {
    const digitsSingle = _.find(
      singleQuestionTypeList,
      (item) => item.value === singleQuestionType,
    );
    const digits = digitsSingle?.levels?.filter((a) => a.starts === level);

    setSingleDigitsType(digits && digits[0]?.value);
    setSingleDigitsTypeList(
      digits?.map((item) => ({ label: item.label, value: item.value })) || [],
    );
  }, [singleQuestionTypeList, level, singleQuestionType]);

  const isDisable =
    isPosting ||
    !questionType ||
    !topic ||
    !level ||
    !number ||
    (questionType === 1 && !singleQuestionType);

  return (
    <View style={styles.container}>
      {isPosting && <Loading />}
      <WhiteSpace />
      <>
        <MyDropDown
          label={'Question Types'}
          value={questionType}
          setValue={setQuestionType}
          list={QuestionTypes}
        />
        <WhiteSpace />
        <MyDropDown
          label={'Topics'}
          value={topic}
          setValue={setTopic}
          list={Topics}
        />
        <WhiteSpace />
        <MyDropDown
          label={'Level'}
          value={level}
          setValue={setLevel}
          list={Levels}
        />
        {questionType === 1 &&
        topic &&
        level &&
        singleQuestionTypeList.length > 0 ? (
          <>
            <WhiteSpace />
            <MyDropDown
              label={'Question Type'}
              value={singleQuestionType}
              setValue={setSingleQuestionType}
              list={singleQuestionTypeList}
            />
          </>
        ) : null}
        {questionType === 1 &&
        topic &&
        level &&
        singleQuestionTypeList.length > 0 ? (
          <>
            <WhiteSpace />
            <MyDropDown
              label={'Digits Type'}
              value={singleDigitsType}
              setValue={setSingleDigitsType}
              list={singleDigitsTypeList}
            />
          </>
        ) : null}
        <WhiteSpace />
        <MyDropDown
          label={'Number of Questions'}
          value={number}
          setValue={setNumber}
          list={Numbers}
        />
        <WhiteSpace />
        <View style={styles.buttonGroup}>
          <Contained
            title="Invite Friends"
            disabled={isDisable}
            onPress={start.bind(this, 0)}
            style={{
              ...styles.startButton,
            }}
          />
          <Contained
            style={{
              paddingHorizontal: 0,
            }}
            disabled={isDisable}
            color={theme.colors.accent}
            onPress={start.bind(this, 1)}
            title="Open Battle"
          />
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  startButton: { paddingHorizontal: 0 },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  friendsContianer: { flexGrow: 1 },
});

export default BattleHomePage;
