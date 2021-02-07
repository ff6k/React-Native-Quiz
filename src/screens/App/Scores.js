import React, { useEffect } from 'react';
import { FlatList, Platform, RefreshControl, View, Image } from 'react-native';
import { FAB, List, Title, useTheme, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import { QUIZ } from '../../constants/routeNames';
import { quizTypes } from '../../constants/index';
import { getQuizes } from '../../containers/actions/quiz';
import ScoreItem from './components/ScoreItem';

const ScoreScreen = ({ navigation: { navigate } }) => {
  const theme = useTheme();
  const { colors, dimensions } = theme;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { quiz: { questions = [], isFetching } = {} } = state;
  const { quiz } = state;

  const fetchQuizes = () => {
    getQuizes(quiz.type, quiz.level)(dispatch, state);
  };
  useEffect(fetchQuizes, []);

  const Refreshing = (
    <RefreshControl
      refreshing={isFetching}
      onRefresh={fetchQuizes}
      title={'Refreshing quizes list'}
      tintColor={colors.primary}
      titleColor={colors.primary}
    />
  );
  const Footer = (
    <Title
      style={{
        alignSelf: 'center',
        marginBottom: dimensions.height(10),
        color: colors.backdrop,
        fontStyle: 'italic',
      }}
    >
      No more data to show !
    </Title>
  );

  const fabStyle = {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: Platform.select({ android: 0, ios: 15 }),
    backgroundColor: colors.primary,
  };

  const summery = () => {
    let total = 0;
    let correct = 0;
    if (!isFetching && questions.length) {
      questions.forEach((element) => {
        //total++
        //if(element['correct']=='1')
        correct = element.score;
        return;
      });
    }

    let score_title1;
    let score_title2;
    try {
      score_title1 = quizTypes[quiz.collection].find(
        (q) => q.value === quiz.type,
      ).label;
      score_title2 = quizTypes[quiz.collection]
        .find((q) => q.value === quiz.type)
        .levels.find((r) => r.value === quiz.level).label;
    } catch (error) {}

    return (
      <Title
        style={{
          alignSelf: 'center',
          marginBottom: dimensions.height(2),
          color: colors.backdrop,
          fontStyle: 'italic',
        }}
      >
        <Text>
          {score_title1}
          {'\n'}
          {score_title2}
        </Text>
        {'\n'}
        <Image
          source={require('../../assets/img/gold.png')}
          style={{ width: 15, height: 15, paddingRight: 1 }}
        />{' '}
        {correct}
      </Title>
    );
  };
  return (
    <>
      {isFetching && !questions.length ? (
        <Loading text="Fetching your quizes list" />
      ) : (
        <View style={{ backgroundColor: 'rgb(251, 255, 252)', flex: 1 }}>
          <List.Subheader>
            Your quiz scores sorted by the most recent
          </List.Subheader>
          {summery()}
          <FlatList
            data={questions}
            keyExtractor={(_, index) => String(index)}
            showsVerticalScrollIndicator={false}
            refreshControl={Refreshing}
            renderItem={(props) => (
              <ScoreItem {...props} theme={theme} navigation={navigate} />
            )}
            ListFooterComponent={Footer}
            ListEmptyComponent={<Empty />}
          />
        </View>
      )}
      <FAB
        style={fabStyle}
        label="Take a quiz"
        onPress={() => navigate(QUIZ)}
      />
    </>
  );
};

export default ScoreScreen;
