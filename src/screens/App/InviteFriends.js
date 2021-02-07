import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import { List, Title, useTheme } from 'react-native-paper';
import moment from 'moment';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { DropAlert } from '../../components/Alert';
import { Contained } from '../../components/Button';
import Loading from '../../components/Loading';
import {
  ADDFRIENDS,
  BATTLEPAGE,
  //   BATTLEQUIZ,
  NOTIFICATION,
} from '../../constants/routeNames';
import { inviteFriend, postBattle } from '../../containers/actions/battle';
import { getMyFriendsList } from '../../containers/actions/user';
import FriendsListItem from './components/FriendsListItem';
import WhiteSpace from './components/WhiteSpace';

const InviteFriends = ({ navigation }) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const user = useSelector((state) => state.user);
  const { friendsList, isFetching, teachersList } = user;
  const [invitedFriendList, setInvitedFriendList] = useState([]);
  const { user: { teacher } = {} } = state;
  const battle = useSelector((state) => state.battle);
  const { isInviting, isSuccess, isPosting, battleId, qns, filter } = battle;
  useEffect(() => {
    fetchFriendsList();
  }, [fetchFriendsList, dispatch]);

  const fetchFriendsList = useCallback(async () => {
    await getMyFriendsList({ user })(dispatch);
  }, [user, dispatch]);

  const onInvite = (item) => {
    const param = {
      friend_id: item.friend_id,
      battle_id: battleId,
      friend_name: item.friendName,
      user_name: user.accName,
      email: item.email,
      battle_name: battle?.filter.topic,
      updated: moment().format('YYYY-MM-DD HH:mm:DD'),
      pushid: item.pushid,
    };

    if (invitedFriendList.find((a) => a.friend_id === item.friend_id)) {
      _.remove(invitedFriendList, (a) => a.friend_id === item.friend_id);
      setInvitedFriendList([...invitedFriendList]);
    } else {
      setInvitedFriendList([...invitedFriendList, param]);
    }
  };

  const startBattle = async (isopen) => {
    if (isopen === 0 && invitedFriendList.length === 0) {
      DropAlert(
        'error',
        'Error',
        'At least invite 1 friends required for battle',
      );
      return;
    }

    const param = {
      qns: JSON.stringify(qns),
      filter,
      isopen,
      position: 0,
      updated: moment().format('YYYY-MM-DD HH:mm:DD'),
      digitsType: filter.singleDigitsType,
      invitedFriendList,
    };

    console.log(JSON.stringify(param));
    const result = await postBattle(param)(dispatch, {
      user,
    });

    if (result) {
      if (isopen === 1) {
        navigation.navigate(BATTLEPAGE, {
          screen: 'Open Battle',
        });
      } else {
        navigation.navigate(BATTLEPAGE, {
          screen: 'Friends battle',
        });
      }
    }
  };

  const renderItem = (props) => (
    <FriendsListItem
      {...props}
      {...{ isInviting }}
      {...{ isSuccess }}
      {...{ onInvite }}
      {...{ invitedFriendList }}
      theme={theme}
    />
  );

  const onRefresh = async () => {
    await fetchFriendsList();
  };

  const addFriends = () => {
    navigation.navigate(ADDFRIENDS);
  };
  let Lists;
  if (teacher == 1) {
    Lists = teachersList;
  } else {
    Lists = friendsList;
  }
  let named;
  if (teacher == 1) {
    named = 'Students';
  } else {
    named = 'Friends';
  }
  const refreshControl = (
    <RefreshControl
      title={'Refreshing Friends List'}
      {...{ isFetching }}
      {...{ onRefresh }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {isPosting ? <Loading /> : <></>}
        <WhiteSpace size="sm" />
        <Contained title="Add Friends" onPress={addFriends} />
        <WhiteSpace size="sm" />
        <Contained
          title={'Open Battle'}
          style={{
            backgroundColor: theme.colors.accent,
          }}
          onPress={startBattle.bind(this, 1)}
        />
        <List.Subheader>
          Invite {named} to join battle from bellow list
        </List.Subheader>
        {isFetching ? (
          <Loading text="Fetching your friends list" />
        ) : (
          <>
            <FlatList
              data={Lists}
              {...{ renderItem }}
              {...{ refreshControl }}
              keyExtractor={(_, index) => String(index)}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View>
                  <Title>No {named} yet</Title>
                </View>
              }
            />
            <View style={{ flexDirection: 'row' }}>
              <Contained
                title={'Start Battle'}
                disabled={Lists?.length === 0}
                style={{
                  backgroundColor: theme.colors.accent,
                }}
                onPress={startBattle.bind(this, 0)}
              />
            </View>

            <WhiteSpace size="sm" />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default InviteFriends;
