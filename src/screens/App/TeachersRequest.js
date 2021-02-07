import React, { useEffect, useCallback } from 'react';
import { FlatList, SafeAreaView, View, RefreshControl } from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  useTheme,
} from 'react-native-paper';
import moment from 'moment';
import Loading from '../../components/Loading';
import RequestFirendsListItem from './components/RequestFirendsListItem';
import WhiteSpace from './components/WhiteSpace';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTeachersRequestList,
  updateTeacherRequest,
} from '../../containers/actions/battle';
import Empty from '../../components/Empty';

const StudentsRequest = ({ navigation }) => {
  const theme = useTheme();
  const { dimensions } = theme;
  const dispatch = useDispatch();
  const { user, battle } = useSelector((state) => state);
  const { isFetching, teacherRequestList } = battle;

  const fetchFriendRequest = useCallback(() => {
    getTeachersRequestList()(dispatch, { user });
  }, [dispatch, user]);

  useEffect(() => {
    fetchFriendRequest();
  }, [fetchFriendRequest]);

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const onAccept = async (item) => {
    await requestGo(item, 1);
  };

  const onReject = async (item) => {
    await requestGo(item, 0);
  };

  const requestGo = async (item, isaccept) => {
    const param = {
      id: item.id,
      isaccept: isaccept,
      userId: item.invite_userid,
      friendId: item.invited_userid,
      battleId: item.battleid,
      updated: moment().format('YYYY-MM-DD HH:mm:DD'),
      emailOfUser: item.email,
      inviteUserName: item.invite_username,
      invitedUserName: item.invited_username,
    };
    console.log(JSON.stringify(param));
    await updateTeacherRequest(param)(dispatch);
    await fetchFriendRequest();
  };

  const renderItem = (props) => (
    <RequestFirendsListItem
      {...props}
      {...{ onAccept }}
      {...{ onReject }}
      {...{ dimensions }}
      {...{ user }}
    />
  );

  const onRefresh = async () => {
    await fetchFriendRequest();
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
      <WhiteSpace />
      {isFetching ? (
        <Loading />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={teacherRequestList}
            {...{ renderItem }}
            {...{ refreshControl }}
            keyExtractor={(_, index) => String(index)}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Empty message={'No friends request'} />}
          />
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Are you sure to accpet?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions style={{ justifyContent: 'space-around' }}>
                <Button color={theme.colors.error} onPress={onReject}>
                  No
                </Button>
                <Button onPress={onAccept}>Yes</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StudentsRequest;
