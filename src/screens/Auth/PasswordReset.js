import React, { useState } from 'react';
import { Image, View, Text, } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import login from '../../assets/img/fingerprint.png';
import { Contained as Button, HyperText } from '../../components/Button';
import Input from '../../components/Input';
import { requestCode, resetDetails } from '../../containers/actions/user';
import { isValid } from '../../utils/helpers';
import {DETAIL_RESET_SUCCESS} from '../../containers/types';

const PasswordResetScreen = ({ navigation }) => {
  const [resetType, setResetType] = useState('');
  const [choosed, setChoosed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
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
  const buttonStyles = {
    maxWidth: dimensions.width(90),
    width: dimensions.width(90)
  };

  const validemail = isValid('email', email);
  const validusername = isValid('username', username);
  const validpassword = isValid('password', password);
//console.log(user);
  return (
    <View style={containerStyles}>
      <Image
        style={imageStyles}
        source={login}
        resizeMethod="scale"
        resizeMode="contain"
      />
      {user?.requested_code?
      <>
      {user?.resetType=='username'?
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          disabled={user?.isFetching}
        />:<Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        disabled={user?.isFetching}
        />
      }
      <Input
        label="Code"
        value={code}
        onChangeText={setCode}
        disabled={user?.isFetching}
      />
      <Button
        loading={user?.isFetching}
        disabled={!validemail || user?.isFetching}
        onPress={() => resetDetails({ resetType, code, password, username })(dispatch)}
        title="Reset"

      />
      <HyperText
    title="Cancel"
    text=""
    onPress={() => dispatch({type: DETAIL_RESET_SUCCESS})}
    />
      </>:<>
    {choosed?
    <>
    <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        disabled={user?.isFetching}
      />
      <Button
        loading={user?.isFetching}
        disabled={!validemail || user?.isFetching}
        onPress={() => requestCode({ resetType, email })(dispatch)}
        title="Request code"

      />
      <Button
        loading={user?.isFetching}
        disabled={user?.isFetching}
        onPress={() => setChoosed(false)}
        title="back"
        style={{width:150,backgroundColor:colors.accent}}
        icon={null}
      />
      </>
    :
    <>
    <Button
        loading={user?.isFetching}
        disabled={user?.isFetching}
        onPress={() => {setResetType('password');setChoosed(true)}}
        title="Forgot password"
        style={buttonStyles}
      />
      <Button
        loading={user?.isFetching}
        disabled={user?.isFetching}
        onPress={() => {setResetType('username');setChoosed(true)}}
        title="Forgot username"
        style={buttonStyles}
      />
      <Button
        loading={user?.isFetching}
        disabled={user?.isFetching}
        onPress={() => navigation.goBack()}
        title="back"
        style={{width:150,backgroundColor:colors.accent}}
        icon={null}
      />
      </>}
    </>}
    
    </View>

  );
};

export default PasswordResetScreen;
