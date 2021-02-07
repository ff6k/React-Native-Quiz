import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import login from '../../assets/img/fingerprint.png';
import { Contained as Button, HyperText } from '../../components/Button';
import Input from '../../components/Input';
import {
  SIGNUP,
  PW_RESET,
  REGISTRATIONCHOICE,
} from '../../constants/routeNames';
import { checkUser } from '../../containers/actions/user';
import packageJson from '../../../package.json';

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { colors, dimensions, spacing } = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user }));

  const containerStyles = {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: spacing.width(),
    backgroundColor: colors.background,
  };
  const imageStyles = {
    width: dimensions.width(90),
    height: dimensions.height(30),
    marginBottom: dimensions.height(5),
  };

  return (
    <View style={containerStyles}>
      <Image
        style={imageStyles}
        source={login}
        resizeMethod="scale"
        resizeMode="contain"
      />
      <Input
        label="Username"
        value={username}
        onChangeText={setUsername}
        disabled={user?.isFetching}
        validate={false}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        disabled={user?.isFetching}
        validate={false}
      />
      <Button
        loading={user?.isFetching}
        disabled={!password.length || !username.length || user?.isFetching}
        onPress={() => checkUser({ username, password })(dispatch)}
        title="Login"
      />
      <HyperText
        title="Create one!"
        text="Don't have an account?"
        onPress={() => navigation.navigate(REGISTRATIONCHOICE)}
      />
      <HyperText
        title="Reset now!"
        text="Forget login details?"
        onPress={() => navigation.navigate(PW_RESET)}
      />
      <Text style={{ alignSelf: 'center', fontSize: 10, color: 'gray' }}>
        {packageJson.version}
      </Text>
    </View>
  );
};

export default LoginScreen;
