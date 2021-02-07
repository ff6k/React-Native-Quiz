import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InvitedBattle from './InvitedBattle';
import OpenBattle from './OpenBattle';
const Tab = createMaterialTopTabNavigator();

const BattlePage = ({ params }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Friends battle" component={InvitedBattle} />
      <Tab.Screen name="Open Battle" component={OpenBattle} />
    </Tab.Navigator>
  );
};

export default BattlePage;
