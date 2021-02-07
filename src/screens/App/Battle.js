import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import theme from '../../assets/theme';
import { Contained } from '../../components/Button';
import {
  BATTLEHOMEPAGE,
  FRIENDS,
  BATTLEPAGE,
  BATTLEHISTORY,
  MYSTUDENTS,
} from '../../constants/routeNames';
import WhiteSpace from './components/WhiteSpace';
import { useSelector } from 'react-redux';
const BattleHomePage = ({ navigation }) => {
  const state = useSelector((state) => state);
  const { user: { teacher } = {} } = state;

  const start = () => {
    navigation.navigate(BATTLEHOMEPAGE);
  };
  const { dimensions } = useTheme();

  const join = () => {
    navigation.navigate(BATTLEPAGE, {
      screen: 'Friends battle',
    });
  };
  const friends = () => {
    navigation.navigate(FRIENDS);
  };

  const students = () => {
    navigation.navigate(MYSTUDENTS);
  };
  const battleHis = () => {
    navigation.navigate(BATTLEHISTORY);
  };

  return (
    <View style={styles.container}>
      <Contained
        color={theme.colors.accent}
        onPress={start}
        style={{ ...styles.btnStyle, width: dimensions.width(50) }}
        title="Start Battle"
      />
      <WhiteSpace size="lg" />
      <Contained
        style={{ ...styles.btnStyle, width: dimensions.width(50) }}
        color={theme.colors.blue}
        onPress={join}
        title="Join Battle"
      />
      <WhiteSpace size="lg" />
      {teacher == 1 ? (
        <Contained
          style={{ ...styles.btnStyle, width: dimensions.width(50) }}
          color={theme.colors.notification}
          onPress={students}
          title="Students"
        />
      ) : (
        <Contained
          style={{ ...styles.btnStyle, width: dimensions.width(50) }}
          color={theme.colors.notification}
          onPress={friends}
          title="Friends"
        />
      )}
      <WhiteSpace size="lg" />
      <Contained
        style={{ ...styles.btnStyle, width: dimensions.width(50) }}
        color={theme.colors.lightGray}
        onPress={battleHis}
        title="Battle history"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  btnStyle: { paddingHorizontal: 0 },
});

export default BattleHomePage;
