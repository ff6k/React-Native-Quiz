import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import { BATTLEQUIZ, QUESTIONANDANSWERS } from '../../constants/routeNames';
import {
  getBattleEndResult,
  getBattleQns,
  joinBattle,
} from '../../containers/actions/battle';
import { getBattleParam } from '../../utils/quizgenbattle';

import InvitedBattleItem from './components/InviteBattleItem';

const BattleEnd = ({ navigation }) => {
  const theme = useTheme();
  const { dimensions } = theme;

  const { battle, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { isFetching, battleQnsEnd } = battle;

  const fetchBattle = useCallback(() => {
    getBattleEndResult(battle.battleId)(dispatch, { user });
  }, [dispatch, user, battle.battleId]);

  useEffect(() => {
    fetchBattle();
  }, [fetchBattle]);

  const onReviewBattle = (item) => {
    item.position = 0;
    joinBattle(getBattleParam(item))(dispatch);
    navigation.navigate(QUESTIONANDANSWERS);
  };

  const renderItem = (props) => (
    <InvitedBattleItem
      {...{ onReviewBattle }}
      {...{ user }}
      {...props}
      {...{ dimensions }}
    />
  );

  const onRefresh = async () => {
    await fetchBattle();
  };

  const refreshControl = (
    <RefreshControl
      title="Refreshing List"
      refreshing={isFetching}
      onRefresh={onRefresh}
    />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isFetching ? (
        <Loading text="Fetching list" />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{ marginTop: 10 }}
            data={battleQnsEnd}
            {...{ renderItem }}
            {...{ refreshControl }}
            keyExtractor={(_, index) => String(index)}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Empty message={'No battle request'} />}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default BattleEnd;
