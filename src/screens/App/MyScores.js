import React, { useEffect, useState } from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import { List, Title, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import { getMyScore } from '../../containers/actions/quiz';
import MyScoreItem from './components/MyScoreItem';
import { messages } from '../../constants';
import { collictions } from './../../constants/index';

const MyScores = ({ navigation: { navigate } }) => {
  const theme = useTheme();
  const { colors, dimensions } = theme;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { quiz: { myScore = [], isFetching } = {} } = state;

  const fetchTop = () => {
    getMyScore()(dispatch, state);
  };
  useEffect(fetchTop, []);
  // useEffect(() => {
  //   fetchTop();
  // }, [selectedValue]);
  const MyMainScoreItem = ({ item: { topic, data, total } = {} }) => {
    let mainScoreItemTitle;
    try {
      mainScoreItemTitle = collictions.find((q) => q.value === topic).label;
    } catch (error) {
      mainScoreItemTitle = topic;
    }

    return (
      <>
        <Title>
          {mainScoreItemTitle} ({total})
        </Title>
        <FlatList
          data={data}
          keyExtractor={(_, index) => String(index)}
          showsVerticalScrollIndicator={false}
          //refreshControl={Refreshing}
          renderItem={(props) => <MyScoreItem {...props} theme={theme} />}
          //ListFooterComponent={Footer}
          //ListEmptyComponent={<Empty message={messages.leaguesEmpty}/>}
        />
      </>
    );
  };

  const Refreshing = (
    <RefreshControl
      refreshing={isFetching}
      onRefresh={fetchTop}
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
    ></Title>
  );

  let topTot = 0;
  myScore.forEach((element) => {
    topTot = topTot + Number(element.total);
  });

  return (
    <>
      {isFetching ? (
        <Loading text="Fetching league list" />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <List.Subheader>
            Score list sorted by the highest scores
          </List.Subheader>
          <Title>Total : {topTot}</Title>
          <FlatList
            data={myScore}
            keyExtractor={(_, index) => String(index)}
            showsVerticalScrollIndicator={false}
            refreshControl={Refreshing}
            renderItem={(props) => <MyMainScoreItem {...props} theme={theme} />}
            ListFooterComponent={Footer}
            ListEmptyComponent={<Empty message={messages.leaguesEmpty} />}
          />
        </View>
      )}
    </>
  );
};

export default MyScores;
