import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import {
  Button,
  Dialog,
  List,
  Paragraph,
  Portal,
  Title,
  useTheme,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Contained } from '../../components/Button';
import Loading from '../../components/Loading';
import { ADDSTUDENTS, NOTIFICATION } from '../../constants/routeNames';
import {
  getMyTeachersList,
  removeTeacher,
} from '../../containers/actions/user';

import FriendsRmListItem from './components/FriendsRmListItem';
import WhiteSpace from './components/WhiteSpace';

const MyStudents = ({ navigation: { navigate } }) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { teachersList, isFetching, isRemoving, friendsList } = user;

  const battle = useSelector((state) => state.battle);
  const { invitedFriendList, isSuccess } = battle;
  useEffect(() => {
    fetchFriendsList();
  }, [fetchFriendsList, dispatch]);

  const fetchFriendsList = useCallback(async () => {
    await getMyTeachersList({ user })(dispatch);
  }, [user, dispatch]);

  const [visible, setVisible] = React.useState(false);
  const [friendItem, setFriendItem] = React.useState();

  const hideDialog = () => setVisible(false);
  const yes = async () => {
    hideDialog();
    await removeTeacher({ userId: user.id, friendId: friendItem.friend_id })(
      dispatch,
    );
    await fetchFriendsList();
  };

  const no = () => {
    hideDialog();
  };

  const onDel = (item) => {
    setVisible(true);
    setFriendItem(item);
  };

  const renderItem = (props) => (
    <FriendsRmListItem
      {...props}
      {...{ isSuccess }}
      {...{ onDel }}
      {...{ invitedFriendList }}
      theme={theme}
      navigation={navigate}
    />
  );

  const onRefresh = async () => {
    await fetchFriendsList();
  };

  const addFriends = () => {
    navigate(ADDSTUDENTS);
  };

  const refreshControl = (
    <RefreshControl
      title={'Refreshing Friends List'}
      {...{ isFetching }}
      {...{ onRefresh }}
    />
  );
  const requestFriends = () => {
    navigate(NOTIFICATION, {
      screen: 'Student Request',
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isRemoving ? <Loading /> : <></>}
        <WhiteSpace size="sm" />
        <Contained
          style={{ ...styles.btnStyle, width: theme.dimensions.width(50) }}
          title="Add Students"
          onPress={addFriends}
        />
        <WhiteSpace size="sm" />
        <Contained
          style={{ ...styles.btnStyle, width: theme.dimensions.width(50) }}
          title="Students Request"
          onPress={requestFriends}
        />

        <List.Subheader>
          Below is a list of your accepted students
        </List.Subheader>
        {isFetching ? (
          <Loading text="Fetching your students list" />
        ) : (
          <>
            <FlatList
              data={teachersList}
              {...{ renderItem }}
              {...{ refreshControl }}
              keyExtractor={(_, index) => String(index)}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View>
                  <Title>No students yet</Title>
                </View>
              }
            />
          </>
        )}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Are you sure to remove?</Paragraph>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  btnStyle: { paddingHorizontal: 0 },
});

export default MyStudents;
