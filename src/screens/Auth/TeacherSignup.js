import React, { useState } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import teacherImage from '../../assets/img/teacher.jpg';
import { Contained as Button, HyperText } from '../../components/Button';
import Input from '../../components/Input';
import { LOGIN } from '../../constants/routeNames';
import { registerUser } from '../../containers/actions/user';
import { isValid } from '../../utils/helpers';
import packageJson from '../../../package.json';

const TeacherSignup = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setName] = useState('');
  const [accName, setAccName] = useState('');
  const [email, setEmail] = useState('');
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
    height: dimensions.height(20),
    marginBottom: dimensions.height(5),
  };

  const teacher = teacherImage ? 1 : 0;
  const validName = isValid('fullname', fullName);
  const validAccName = isValid('profilename', accName);
  const validemail = isValid('email', email);
  const validUsername = isValid('username', username);
  const validPassword = isValid('password', password);
  const validVerify = validPassword && password === verify;

  return (
    <ScrollView>
      <View style={containerStyles}>
        <Image
          style={imageStyles}
          source={teacherImage}
          resizeMethod="scale"
          resizeMode="contain"
        />
        <Input
          label="FullName"
          value={fullName}
          onChangeText={setName}
          disabled={user?.isFetching}
        />
        <Input
          label="ProfileName"
          value={accName}
          onChangeText={setAccName}
          disabled={user?.isFetching}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          disabled={user?.isFetching}
          keyboardType="email-address"
        />
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          disabled={user?.isFetching}
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          disabled={user?.isFetching}
        />
        <Input
          label="Repeat password"
          value={verify}
          onChangeText={setVerify}
          disabled={user?.isFetching}
          validate={false}
          error={verify.length && !validVerify}
        />
        <Button
          loading={user?.isFetching}
          disabled={
            !validName ||
            !validUsername ||
            !validPassword ||
            !validVerify ||
            !validAccName ||
            !validemail ||
            user?.isFetching
          }
          onPress={() =>
            registerUser({
              username,
              fullName,
              password,
              accName,
              email,
              teacher,
            })(dispatch)
          }
          title="Submit"
        />
        <HyperText
          title="Login!"
          text="Already our member?"
          onPress={() => navigation.navigate(LOGIN)}
        />
        <Text style={{ alignSelf: 'center', fontSize: 10, color: 'gray' }}>
          {packageJson.version}
        </Text>
      </View>
    </ScrollView>
  );
};

export default TeacherSignup;
