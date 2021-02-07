import React from 'react';
import { View } from 'react-native';
import Avatar from './components/Avatar';

const AvatarProfile = ({ children, style, ...rest }) => (
  <View style={style}>
    <Avatar />
  </View>
);

export default AvatarProfile;
