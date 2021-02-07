import React from 'react';
import { useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendsRequest from './FriendsRequest';
import BattleRequest from './BattleRequest';
import StudentsRequest from './StudentsRequest';
import TeachersRequest from './TeachersRequest';
const Tab = createMaterialTopTabNavigator();
const Notification = ({ params }) => {
  const state = useSelector((state) => state);
  const { user: { teacher } = {} } = state;
  return (
    <Tab.Navigator>
      <Tab.Screen name="Battle Request" component={BattleRequest} />
      {teacher == 1 ? null : (
        <Tab.Screen name="Friend Request" component={FriendsRequest} />
      )}
      {teacher == 0 ? null : (
        <Tab.Screen name="Student Request" component={StudentsRequest} />
      )}
      {teacher == 1 ? null : (
        <Tab.Screen name="Teacher Request" component={TeachersRequest} />
      )}
    </Tab.Navigator>
  );
};

export default Notification;
