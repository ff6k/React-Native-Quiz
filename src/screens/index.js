import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { APP, AUTH } from '../constants/routeNames';
import AppStack from './App';
import AuthStack from './Auth';
import { useEffect } from 'react';
import { savePushTokens } from '../containers/actions/user';
import { rollbar } from './Common/rollbar';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const callback = useCallback(
    (tokens) => {
      savePushTokens({ tokens, user })(dispatch);
    },
    [dispatch, user],
  );

  useEffect(() => {
    // Get the device token
    (async function () {
      const authorizationStatus = await messaging().requestPermission({
        sound: false,
        announcement: true,
      });
      if (authorizationStatus) {
        console.log('Permission status:', authorizationStatus);
      }
    //   if (
    //     Platform.OS === 'ios' &&
    //     !messaging().isDeviceRegisteredForRemoteMessages
    //   ) {
    //     await messaging().registerDeviceForRemoteMessages();
    //   }

      messaging()
        .getToken()
        .then((token) => {
          return callback(token);
        });

      // Listen to whether the token changes
      return messaging().onTokenRefresh((token) => {
        callback(token);
      });
    })();
  }, [callback]);

  useEffect(() => {
    rollbar.setPerson(user.id, user.accName, user.email);
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={AUTH}>
        {user.registered ? (
          <Stack.Screen name={APP} component={AppStack} />
        ) : (
          <Stack.Screen name={AUTH} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
