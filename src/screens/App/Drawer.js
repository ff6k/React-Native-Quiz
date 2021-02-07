import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  PROFILE,
  QUIZ_STACK,
  SCORE,
  AVATARPROFILE,
} from '../../constants/routeNames';
import { logoutUser } from '../../containers/actions/user';
import packageJson from '../../../package.json';
import Rate, { AndroidMarket } from 'react-native-rate';
import BugDialog from './components/popup/BugDialog';

const DrawerScreen = (props) => {
  const { navigation, state } = props;
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { user: { name, accName, email } = {} } = useSelector(({ user }) => ({
    user,
  }));
  const [visible, setVisible] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const rateApp = () => {
    const options = {
      AppleAppID: '**********',
      GooglePackageName: '************',
      AmazonPackageName: '*************',
      OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: false,
      openAppStoreIfInAppFails: true,
    };
    Rate.rate(options);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <BugDialog
          visible={visible}
          handleCancel={handleCancel}
          setVisible={setVisible}
          accountName={accName}
          email={email}
        />
        <DrawerItem
          label={name || 'Profile'}
          labelStyle={{ textTransform: 'capitalize' }}
          onPress={() =>
            navigation.navigate(AVATARPROFILE, { screen: PROFILE })
          }
          icon={(props) => (
            <Avatar.Icon
              {...props}
              icon="account"
              color={colors.primary}
              size={50}
              style={{ backgroundColor: colors.withOpacity(0.2, 'primary') }}
            />
          )}
        />
        {state.routes.map((route, i) => (
          <DrawerItem
            key={route.key}
            label={route.name == QUIZ_STACK ? '' : route.name}
            focused={i === state.index}
            onPress={() =>
              navigation.navigate(QUIZ_STACK, { screen: route.name })
            }
            activeBackgroundColor={'transparent'}
            activeTintColor={colors.primary}
          />
        ))}
      </DrawerContentScrollView>
      <DrawerItem label="Report a problem" onPress={() => setVisible(true)} />
      <DrawerItem label="Rate Our App" onPress={rateApp} />
      <DrawerItem label={packageJson.version} onPress={null} />
      <DrawerItem
        label="Logout"
        onPress={() => logoutUser()(dispatch)}
        icon={(props) => (
          <Avatar.Icon
            {...props}
            icon="logout"
            color={colors.primary}
            size={30}
            style={{ backgroundColor: colors.withOpacity(0.2, 'primary') }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default DrawerScreen;
