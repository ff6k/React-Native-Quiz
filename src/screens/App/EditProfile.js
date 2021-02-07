import React, { useEffect,useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { getSummery } from '../../containers/actions/quiz';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { useTheme } from 'react-native-paper';
import Input from '../../components/Input';
import { isValid } from '../../utils/helpers';
import { Contained as Button, HyperText } from '../../components/Button';
import { updateUser } from '../../containers/actions/user';
import { PROFILE } from '../../constants/routeNames';

const EditProfile = ({ navigation }) => {

  const dispatch = useDispatch();
  const { colors, dimensions, spacing } = useTheme();
  const state = useSelector((state) => state);
  const { quiz: { summery = {correct:0,total:0}, isFetching } = {} } = state;
  const { user } = useSelector(({ user }) => ({ user }));

  const [name,setName] = useState(user.name);
  const [email,setEmail] = useState(user.email);
  const [accName,setAccName] = useState(user.accName);
  const [username,setUsername] = useState(user.username);
  const [password,setPassword] = useState('');
  const [verify,setVerify] = useState('');

  const containerStyles = {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: spacing.width(),
    backgroundColor: colors.background,
  };

  const validName = isValid('fullname', name);
  const validAccName = isValid('profilename', accName);
  const validemail = isValid('email', email);
  const validUsername = isValid('username', username);
  const validPassword = isValid('password', password) || password.length==0;
  const validVerify = validPassword && password === verify;

  // const fetchSummery = () => {
  //   getSummery()(dispatch, state);
  // };
  // useEffect(fetchSummery, []);
//console.log(user);
  return (
    <>
    {/* <Text>{name}</Text> */}
    {isFetching ? (
        <Loading text="Fetching data" />
      ) : (
        <View style={containerStyles}>
        <ScrollView>
          
      <Input
        label="Username"
        value={username}
        onChangeText={setUsername}
        disabled={true}
      />
      <Input
          label="FullName"
          value={name}
          onChangeText={setName}
          disabled={user.isFetching}
        />
        <Input
          label="ProfileName"
          value={accName}
          onChangeText={setAccName}
          disabled={user.isFetching}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          disabled={user.isFetching}
          keyboardType="email-address"
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
        /><Button
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
          updateUser({ id:user?.id,username, fullName:name, password, accName, email })(
            dispatch,
          )
        }
        title="Update"
        icon="check-all"
      />
      <HyperText
        title="< Back"
        text=""
        onPress={() => navigation.navigate(PROFILE)}
      />
    
        </ScrollView>
        </View>
      )}
    </>
  );
};

export default EditProfile;
