import React, { useEffect } from 'react';
import { useCallback } from 'react';
import moment from 'moment';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  useTheme,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import { BATTLEQUIZ, QUESTIONANDANSWERS } from '../../constants/routeNames';
import {
  getOpenBattleQns,
  joinBattle,
  prepareOpenBattle,
} from '../../containers/actions/battle';
import { imageSource } from '../../utils/imageSource';
import InvitedBattleItem from './components/InviteBattleItem';
import { isArray } from 'lodash';
import { getBattleParam } from '../../utils/quizgenbattle';

const OpenBattle = ({ navigation }) => {
  const theme = useTheme();
  const { dimensions } = theme;

  const { battle, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { isFetching, openBattleQns } = battle;

  const fetchBattle = useCallback(() => {
    getOpenBattleQns()(dispatch, { user });
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
    try {
      hideDialog();
      const item = battleItem;
      console.log('OpenBattle.js', item);
      const p = await prepareOpenBattle({
        battleId: item.id,
        updated: moment().format('YYYY-MM-DD HH:mm:DD'),
      })(dispatch, { user });

      const result = p && isArray(p) && p[0];

      var openbat = {
        battleId: item.id,
        position: result?.position || 0,
        result: result?.result,
        answers: result?.answers,
        duration: result?.duration || 0,
      };

      const battleParam = getBattleParam(Object.assign({}, item, openbat));

      joinBattle(battleParam)(dispatch);

      navigation.navigate(BATTLEQUIZ);
    } catch (err) {
      console.log(err);
    }
  };

  const no = () => {
    hideDialog();
  };

  const onReviewBattle = async (item) => {
    console.log(item);
    item.position = 0;
    // item.result = null;
    const p = await prepareOpenBattle({
      battleId: item.id,
      updated: moment().format('YYYY-MM-DD HH:mm:DD'),
    })(dispatch, { user });
    const result = p && isArray(p) && p[0];
    item.answers = result.answers;
    item.result = result.result;

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
            data={openBattleQns}
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

export default OpenBattle;
