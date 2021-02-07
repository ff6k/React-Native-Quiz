import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
} from 'react-native';
import moment from 'moment';
import { Searchbar, Title, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { DropAlert } from '../../components/Alert';
import { Contained } from '../../components/Button';

import Loading from '../../components/Loading';
import { addTeacherRequest } from '../../containers/actions/battle';
import { getTeachersByName } from '../../containers/actions/user';
import AddFriendsListItem from './components/AddFriendsListItem';
import WhiteSpace from './components/WhiteSpace';

const AddTeachers = ({ navigation }) => {
  const theme = useTheme();
  const { spacing } = theme;
  const dispatch = useDispatch();
  const { user, battle } = useSelector((state) => state);
  const { isFetching, teacherList } = user;
  const { teacherRequestList } = battle;
  const [name, setName] = useState();

  useEffect(() => {
    fetchusers();
  }, [fetchusers]);

  const onSubmit = async (e) => {
    if (!name) {
      DropAlert('error', 'Error', 'Please type the firend name');
      return;
    }
    await fetchusers();
  };

  const fetchusers = useCallback(async () => {
    await getTeachersByName({ name, userId: user.id })(dispatch);
  }, [name, dispatch, user.id]);
  const onRequest = async (item) => {
    const param = {
      userId: user.id,
      user_name: user.accName,
      friendId: item.id,
      friend_name: item.profileName,
      email: item.email,
      battleId: battle.battleId,
      updated: moment().format('YYYY-MM-DD HH:mm:DD'),
    };
    const result = await addTeacherRequest(param)(dispatch);
    return result;
  };

  const renderItem = (props) => (
    <AddFriendsListItem
      {...{ teacherRequestList }}
      {...{ onRequest }}
      {...props}
      theme={theme}
    />
  );

  const onRefresh = async () => {
    await fetchusers();
  };

  const onChangeText = (text) => {
    setName(text);
  };

  const refreshControl = (
    <RefreshControl
      title={'Refreshing teachers List'}
      {...{ isFetching }}
      {...{ onRefresh }}
    />
  );

  return (
    <SafeAreaView style={styles.constainer}>
      <View style={styles.searchBar}>
        <WhiteSpace />
        <Searchbar
          placeholder={'Input ProfileName To Search'}
          value={name}
          onChangeText={onChangeText}
          style={{ marginHorizontal: spacing.width(2) }}
          onSubmitEditing={onSubmit}
        />
        <WhiteSpace />
        {isFetching ? (
          <Loading text="Fetching data" />
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              data={teacherList}
              {...{ renderItem }}
              {...{ refreshControl }}
              keyExtractor={(_, index) => String(index)}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View>
                  <Title>No teachers yet</Title>
                </View>
              }
            />
            <Contained
              title={'Go Back'}
              style={{
                backgroundColor: theme.colors.accent,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <WhiteSpace />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  constainer: { flex: 1 },
  searchBar: {
    flexGrow: 1,
    alignItems: 'center',
  },
});

export default AddTeachers;
