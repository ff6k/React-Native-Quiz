import { TabActions } from '@react-navigation/native';
import { isArray } from 'lodash';
import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Title,
  useTheme,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Contained } from '../../components/Button';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import { BATTLEQUIZ, QUESTIONANDANSWERS } from '../../constants/routeNames';
import {
  getBattlePosition,
  getBattleQns,
  joinBattle,
} from '../../containers/actions/battle';
import { imageSource } from '../../utils/imageSource';
import { getBattleParam } from '../../utils/quizgenbattle';
import InvitedBattleItem from './components/InviteBattleItem';

const BattleRequest = ({ navigation }) => {
  const theme = useTheme();
  const { dimensions } = theme;

  const { battle, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { isFetching, battleQns } = battle;

  const fetchBattle = useCallback(() => {
    getBattleQns()(dispatch, { user });
  }, [dispatch, user]);

  useEffect(() => {
    fetchBattle();
  }, [fetchBattle]);

  const [battleItem, setBattleItem] = React.useState();

  const onPress = (item) => {
    setVisible(true);
    setBattleItem(item);
  };

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  const yes = async () => {
    hideDialog();

    const item = battleItem;

    const battleParam = getBattleParam(item);

    joinBattle(battleParam)(dispatch);

    navigation.navigate(BATTLEQUIZ);
  };

  const no = () => {
    hideDialog();
  };

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
      {...{ onPress }}
      {...{ dimensions }}
    />
  );

  const onRefresh = async () => {
    await fetchBattle();
  };

  const refreshControl = (
    <RefreshControl
      title="Refreshing Request List"
      refreshing={isFetching}
      onRefresh={onRefresh}
    />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isFetching ? (
        <Loading />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{ marginTop: 10 }}
            data={battleQns}
            {...{ renderItem }}
            {...{ refreshControl }}
            keyExtractor={(_, index) => String(index)}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Empty message={'No battle request'} />}
          />
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Join battle</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Are you sure to join?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions style={{ justifyContent: 'space-around' }}>
                <Button color={theme.colors.error} onPress={no}>
                  No
                </Button>
                <Button onPress={yes}>Yes</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BattleRequest;
