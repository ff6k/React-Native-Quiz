import React, { useEffect } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { getSummery } from '../../containers/actions/quiz';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import {
  HyperText,
  Contained as ContainedButton,
} from '../../components/Button';
import { EDITPROFILE } from '../../constants/routeNames';
import Input from '../../components/Input';
import { useTheme, Title, DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Rate, { AndroidMarket } from 'react-native-rate';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    quiz: { summery = { correct: 0, total: 0 }, isFetching } = {},
  } = state;
  const { user } = useSelector(({ user }) => ({ user }));
  const { colors, dimensions, spacing } = useTheme();
  const fetchSummery = () => {
    getSummery()(dispatch, state);
  };
  useEffect(fetchSummery, []);
  const containerStyles = {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: spacing.width(),
    backgroundColor: colors.background,
  };

  const Detail = ({ label, value }) => (
    <DataTable.Row>
      <DataTable.Cell style={{ size: 20 }}>{label} : </DataTable.Cell>
      <DataTable.Cell style={{ width: 10000 }}>{value}</DataTable.Cell>
    </DataTable.Row>
  );

  const rateApp = async () => {
    const isAlreadyRate = await AsyncStorage.getItem('isAlreadyRate');
    const countStartApp = await AsyncStorage.getItem('countStartApp');
    const count = countStartApp ? parseInt(countStartApp) : 1;
    if (!isAlreadyRate && count % 3 === 0) {
      Alert.alert('App Rating', 'Please give us your opinion!', [
        {
          text: 'Later',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setTimeout(() => {
              let options = {
                AppleAppID: '***************',
                GooglePackageName: '******************',
                preferredAndroidMarket: AndroidMarket.Google,
                preferInApp: false,
                openAppStoreIfInAppFails: true,
              };
              Rate.rate(options, (success) => {
                if (success) {
                  AsyncStorage.setItem('isAlreadyRate', 'true');
                }
              });
            }, 500);
          },
        },
      ]);
    }
    await AsyncStorage.setItem('countStartApp', `${count + 1}`);
  };
  useEffect(() => {
    rateApp();
  }, []);
  console.log(state.user.friendsList);
  return isFetching ? (
    <Loading text="Fetching data" />
  ) : (
    <View style={containerStyles}>
      <View
        style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <Title>Total scores : {summery.correct}</Title>
        <DataTable>
          <Detail label="Full Name" value={user.name} />
          <Detail label={`Profile Name`} value={user.accName} />
          <Detail label="Email" value={user.email} />
        </DataTable>
        <ContainedButton
          loading={false}
          onPress={() => navigation.navigate(EDITPROFILE)}
          title="Edit"
        />
      </View>
    </View>
  );
};

export default Profile;
