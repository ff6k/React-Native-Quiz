import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import {
  CATEGORY,
  PROFILE,
  QUIZ,
  QUIZ_STACK,
  SCORE,
  LEAGUE,
  AWARD,
  HELP,
  MYSCORE,
  BATTLE,
  BATTLEQUIZ,
  INVITEFRIENDS,
  ADDFRIENDS,
  INVITEDBATTLE,
  FRIENDSREQUESTLIST,
  NOTIFICATION,
  EDITPROFILE,
  BATTLEHOMEPAGE,
  FRIENDS,
  BATTLERESULT,
  BATTLEPAGE,
  BATTLEHISTORY,
  QUESTIONANDANSWERS,
  QUIZVIEW,
  AVATARPROFILE,
  RENDERYOUTUBE,
  MYSTUDENTS,
  MYTEACHERS,
  ADDSTUDENTS,
  ADDTEACHERS,
  STUDENTSREQUESTS,
  TEACHERSREQUEST,
  STUDENTINFO,
} from '../../constants/routeNames';
import CategoryScreen from './Category';
import DrawerScreen from './Drawer';
import ProfileScreen from './Profile';
import EditProfileScreen from './EditProfile';
import QuizScreen from './Quiz';
import ScoreScreen from './Scores';
import LeagueScreen from './League';
import AwardScreen from './Award';
import HelpScreen from './Help';
import MyScoresScreen from './MyScores';
import BattleScreen from './Battle';

import { quizTypes } from '../../constants';
import BattleQuizScreen from './BattleQuiz';
import InviteFriends from './InviteFriends';
import AddFriends from './AddFriends';
import InvitedBattle from './InvitedBattle';
import FriendsRequest from './FriendsRequest';
import Notification from './Notification';
import BattleHomeScreen from './BattleHomePage';
import BattleEndScreen from './BattleEnd';
import BattlePageScreen from './BattlePage';
import Friends from './Friends';
import Battlehistory from './Battlehistory';
import BattleQuizReviewScreen from './BattleQuizReview';
import QuizView from './QuizView';
import RenderYoutube from './components/RenderYoutube';
import MyStudents from './MyStudents';
import AddTeachers from './AddTeachers';
import MyTeachers from './MyTeachers';
import AddStudents from './AddStudents';
import StudentsRequest from './StudentsRequest';
import TeachersRequest from './TeachersRequest';
import StudentInfo from './StudentInfo';
import AvatarProfile from "./AvatarProfile";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const QuizStack = () => {
  const { colors } = useTheme();
  const { toggleDrawer, navigate } = useNavigation();
  const state = useSelector((state) => state);
  const { quiz } = state;
  let quizScreenTitle = 'Quiz';
  try {
    quizScreenTitle = quizTypes[quiz.collection].find(
      (q) => q.value === quiz.type,
    ).label;
  } catch (error) {}

  const onBellPress = () => {
    navigate(NOTIFICATION);
  };
  window.teacher = state.user.teacher;

  return (
    <Stack.Navigator
      initialRouteName={PROFILE}
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: ({ tintColor }) => (
          <IconButton icon="bell" color={tintColor} onPress={onBellPress} />
        ),
        headerLeft: ({ tintColor }) => (
          <IconButton icon="menu" color={tintColor} onPress={toggleDrawer} />
        ),
        headerTintColor: colors.background,
        headerStyle: { backgroundColor: colors.primary },
      }}
    >
      {/* <Stack.Screen
        name={SCORE}
        component={ScoreScreen}
        options={{
          headerLeft: ({ tintColor }) => (
            <IconButton icon="menu" color={tintColor} onPress={toggleDrawer} />
          ),
        }}
      /> */}
      <Stack.Screen
        name={QUIZ}
        component={QuizScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            quizScreenTitle,
          ],
        }}
      />
      <Stack.Screen
        name={SCORE}
        component={ScoreScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            SCORE,
          ],
        }}
      />
      <Stack.Screen
        name={PROFILE}
        component={ProfileScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            PROFILE,
          ],
        }}
      />
      <Stack.Screen
        name={CATEGORY}
        component={CategoryScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            CATEGORY,
          ],
        }}
      />
      <Stack.Screen
        name={LEAGUE}
        component={LeagueScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            LEAGUE,
          ],
        }}
      />
      <Stack.Screen
        name={AWARD}
        component={AwardScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            AWARD,
          ],
        }}
      />
      <Stack.Screen
        name={HELP}
        component={HelpScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            HELP,
          ],
        }}
      />
      <Stack.Screen
        name={MYSCORE}
        component={MyScoresScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            MYSCORE,
          ],
        }}
      />
      <Stack.Screen
        name={BATTLE}
        component={BattleScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            BATTLE,
          ],
        }}
      />
      <Stack.Screen
        name={INVITEFRIENDS}
        component={InviteFriends}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            INVITEFRIENDS,
          ],
        }}
      />
      <Stack.Screen
        name={BATTLEQUIZ}
        component={BattleQuizScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            BATTLE,
          ],
        }}
      />
      <Stack.Screen
        name={ADDFRIENDS}
        component={AddFriends}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            ADDFRIENDS,
          ],
        }}
      />
      <Stack.Screen
        name={INVITEDBATTLE}
        component={InvitedBattle}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            INVITEDBATTLE,
          ],
        }}
      />
      <Stack.Screen
        name={FRIENDSREQUESTLIST}
        component={FriendsRequest}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            FRIENDSREQUESTLIST,
          ],
        }}
      />
      <Stack.Screen
        name={NOTIFICATION}
        component={Notification}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            NOTIFICATION,
          ],
        }}
      />
      <Stack.Screen
        name={EDITPROFILE}
        component={EditProfileScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            EDITPROFILE,
          ],
        }}
      />
      <Stack.Screen
        name={BATTLEHOMEPAGE}
        component={BattleHomeScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            BATTLE,
          ],
        }}
      />
      <Stack.Screen
        name={FRIENDS}
        component={Friends}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            FRIENDS,
          ],
        }}
      />
      <Stack.Screen
        name={BATTLERESULT}
        component={BattleEndScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            BATTLERESULT,
          ],
        }}
      />
      <Stack.Screen
        name={BATTLEPAGE}
        component={BattlePageScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            BATTLEPAGE,
          ],
        }}
      />
      <Stack.Screen
        name={BATTLEHISTORY}
        component={Battlehistory}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            BATTLEHISTORY,
          ],
        }}
      />
      <Stack.Screen
        name={QUESTIONANDANSWERS}
        component={BattleQuizReviewScreen}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            QUESTIONANDANSWERS,
          ],
        }}
      />
      <Stack.Screen
        name={QUIZVIEW}
        component={QuizView}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            QUIZVIEW,
          ],
        }}
      />
      <Stack.Screen
        name={AVATARPROFILE}
        component={AvatarProfile}
        options={{
          title: [
            <Image
              key={Math.random()}
              source={require('../../assets/img/title.png')}
              style={{ width: 30, height: 30 }}
            />,
            AVATARPROFILE,
          ],
        }}
      />
      <Stack.Screen name={RENDERYOUTUBE} component={RenderYoutube} />
      <Stack.Screen name={MYSTUDENTS} component={MyStudents} />
      <Stack.Screen name={MYTEACHERS} component={MyTeachers} />
      <Stack.Screen name={ADDTEACHERS} component={AddTeachers} />
      <Stack.Screen name={ADDSTUDENTS} component={AddStudents} />
      <Stack.Screen name={STUDENTSREQUESTS} component={StudentsRequest} />
      <Stack.Screen name={TEACHERSREQUEST} component={TeachersRequest} />
      <Stack.Screen name={STUDENTINFO} component={StudentInfo} />
    </Stack.Navigator>
  );
};

export default () => (
  <Drawer.Navigator
    initialRouteName={QUIZ_STACK}
    drawerContent={(props) => <DrawerScreen {...props} />}
  >
    {window.teacher == 1 ? null : (
      <Drawer.Screen name={MYSCORE} component={MyScoresScreen} />
    )}
    <Drawer.Screen name={CATEGORY} component={CategoryScreen} />
    <Drawer.Screen name={LEAGUE} component={LeagueScreen} />
    <Drawer.Screen name={AWARD} component={AwardScreen} />
    <Drawer.Screen name={BATTLE} component={BattleScreen} />
    <Drawer.Screen name={HELP} component={HelpScreen} />
    {window.teacher == 1 ? (
      <Drawer.Screen name={MYSTUDENTS} component={MyStudents} />
    ) : (
      <Drawer.Screen name={MYTEACHERS} component={MyTeachers} />
    )}
    <Drawer.Screen name={QUIZ_STACK} component={QuizStack} />
  </Drawer.Navigator>
);
