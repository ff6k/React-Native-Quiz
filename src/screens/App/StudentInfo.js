import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import { List, Title, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { getStudentInfo } from '../../containers/actions/user';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from 'victory-native';
import FriendsRmListItem from './components/FriendsRmListItem';
import WhiteSpace from './components/WhiteSpace';
import { Dimensions } from 'react-native';

const StudentInfo = ({ route }) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { id, hisName } = route.params;
  const user = useSelector((state) => state.user);
  const { infoList, isFetching } = user;

  useEffect(() => {
    fetchFriendsList();
  }, [fetchFriendsList, dispatch]);

  const fetchFriendsList = useCallback(async () => {
    await getStudentInfo({ userId: id })(dispatch);
  }, [user, dispatch]);

  const renderItem = (props) => (
    <FriendsRmListItem
      {...props}
      {...{ isSuccess }}
      {...{ onDel }}
      {...{ invitedFriendList }}
      theme={theme}
    />
  );
  const NUMBER = 'Number';
  const CALCULATIONS = 'Calculations';
  const GEOMETRY = 'Geometry';
  const ALGEBRA = 'Algebra';
  const MEASURE = 'Measure';
  const STATISTICS = 'Statistics';
  const APPLYING = 'Applying Maths';

  let correctAnswers;
  try {
    correctAnswers = infoList.filter((r) => r.correct == 1).length;
  } catch (error) {}

  let wrongAnswers;
  try {
    wrongAnswers = infoList.filter((r) => r.correct == 0).length;
  } catch (error) {}

  const total = wrongAnswers + correctAnswers;

  let numberRight;
  try {
    numberRight = infoList
      .filter((r) => r.category1 == 'NUMBER')
      .filter((c) => c.correct == 1).length;
  } catch (error) {}

  let numberWrong;
  try {
    numberWrong = infoList
      .filter((r) => r.category1 == 'NUMBER')
      .filter((c) => c.correct == 0).length;
  } catch (error) {}
  const number = numberRight + numberWrong;

  let calculationsRight;
  try {
    calculationsRight = infoList
      .filter((r) => r.category1 == 'CALCULATIONS')
      .filter((c) => c.correct == 1).length;
  } catch (error) {}

  let calculationsWrong;
  try {
    calculationsWrong = infoList
      .filter((r) => r.category1 == 'CALCULATIONS')
      .filter((c) => c.correct == 0).length;
  } catch (error) {}
  const calculations = calculationsWrong + calculationsRight;

  let geometryRight;
  try {
    geometryRight = infoList
      .filter((r) => r.category1 == 'GEOMETRY')
      .filter((c) => c.correct == 1).length;
  } catch (error) {}

  let geometryWrong;
  try {
    geometryWrong = infoList
      .filter((r) => r.category1 == 'GEOMETRY')
      .filter((c) => c.correct == 0).length;
  } catch (error) {}
  const geometry = geometryWrong + geometryRight;

  let algebraRight;
  try {
    algebraRight = infoList
      .filter((r) => r.category1 == 'ALGEBRA')
      .filter((c) => c.correct == 1).length;
  } catch (error) {}

  let algebraWrong;
  try {
    algebraWrong = infoList
      .filter((r) => r.category1 == 'ALGEBRA')
      .filter((c) => c.correct == 0).length;
  } catch (error) {}
  const algebra = algebraRight + algebraWrong;

  let measureRight;
  try {
    measureRight = infoList
      .filter((r) => r.category1 == 'MEASURE')
      .filter((c) => c.correct == 1).length;
  } catch (error) {}

  let measureWrong;
  try {
    measureWrong = infoList
      .filter((r) => r.category1 == 'MEASURE')
      .filter((c) => c.correct == 0).length;
  } catch (error) {}
  const measure = measureRight + measureWrong;

  let statisticsRight;
  try {
    statisticsRight = infoList
      .filter((r) => r.category1 == 'STATISTICS')
      .filter((c) => c.correct == 1).length;
  } catch (error) {}

  let statisticsWrong;
  try {
    statisticsWrong = infoList
      .filter((r) => r.category1 == 'STATISTICS')
      .filter((c) => c.correct == 0).length;
  } catch (error) {}
  const statistics = statisticsRight + statisticsWrong;

  let applyingRight;
  try {
    applyingRight = infoList
      .filter((r) => r.category1 == 'STATISTICS')
      .filter((c) => c.correct == 1).length;
  } catch (error) {}

  let applyingWrong;
  try {
    applyingWrong = infoList
      .filter((r) => r.category1 == 'STATISTICS')
      .filter((c) => c.correct == 0).length;
  } catch (error) {}
  const applying = applyingRight + applyingWrong;

  return (
    <ScrollView>
      <View style={styles.container}>
        <WhiteSpace size="sm" />
        <List.Subheader>
          Information about {}
          <Text style={{ fontWeight: 'bold', color: 'purple' }}>{hisName}</Text>
        </List.Subheader>
        {isFetching ? (
          <Loading text="Fetching the information" />
        ) : (
          <>
            <Text
              style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}
            >
              Total quizes attempted: {total}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'green',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Number of correct answers: {correctAnswers}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'red',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Number of wrong answers: {wrongAnswers}
            </Text>
            {total > 0 ? (
              <>
                <VictoryPie
                  width={340}
                  data={[
                    { x: 'Correct', y: correctAnswers },
                    { x: 'Wrong', y: wrongAnswers },
                  ]}
                  colorScale={['green', 'red']}
                  style={{}}
                  labelRadius={({ innerRadius }) => innerRadius + 30}
                  style={{
                    labels: { fill: 'white', fontSize: 20, fontWeight: 'bold' },
                  }}
                />
              </>
            ) : null}
            {number > 0 ? (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Total quizes attempted in Numbers category: {}
                  {numberRight + numberWrong}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'green',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Number of correct answers: {numberRight}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Number of wrong answers: {numberWrong}
                </Text>
                <VictoryPie
                  width={360}
                  data={[
                    { x: `Correct`, y: numberRight },
                    { x: 'Wrong', y: numberWrong },
                  ]}
                  colorScale={['green', 'red']}
                />
              </>
            ) : null}
            {algebra > 0 ? (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    marginHorizontal: 10,
                    fontWeight: 'bold',
                  }}
                >
                  Total quizes attempted in Algebra category: {}
                  {algebraRight + algebraWrong}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'green',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Number of correct answers: {algebraRight}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Number of wrong answers: {algebraWrong}
                </Text>
                <VictoryPie
                  width={360}
                  data={[
                    { x: `Correct`, y: algebraRight },
                    { x: 'Wrong', y: algebraWrong },
                  ]}
                  colorScale={['green', 'red']}
                />
              </>
            ) : null}
            {calculations > 0 ? (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Total quizes attempted in Calculations category:
                  {calculationsRight + calculationsWrong}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'green',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Number of correct answers: {calculationsRight}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Number of wrong answers: {calculationsWrong}
                </Text>
                <VictoryPie
                  width={360}
                  data={[
                    { x: `Correct`, y: calculationsRight },
                    { x: 'Wrong', y: calculationsWrong },
                  ]}
                  colorScale={['green', 'red']}
                />
              </>
            ) : null}
            {measure > 0 ? (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Total quizes attempted in Measures category:
                  {measureRight + measureWrong}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'green',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Number of correct answers: {measureRight}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Number of wrong answers: {measureWrong}
                </Text>
                <VictoryPie
                  width={360}
                  data={[
                    { x: `Correct`, y: measureRight },
                    { x: 'Wrong', y: measureWrong },
                  ]}
                  colorScale={['green', 'red']}
                />
              </>
            ) : null}
            {geometry > 0 ? (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Total quizes attempted in Geometry category: {}
                  {geometryRight + geometryWrong}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'green',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Number of correct answers: {geometryRight}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Number of wrong answers: {geometryWrong}
                </Text>
                <VictoryPie
                  width={360}
                  data={[
                    { x: `Correct`, y: geometryRight },
                    { x: 'Wrong', y: geometryWrong },
                  ]}
                  colorScale={['green', 'red']}
                />
              </>
            ) : null}
            {applying > 0 ? (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Total quizes attempted in Applying Maths category:
                  {applyingRight + applyingWrong}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'green',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Number of correct answers: {applyingRight}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Number of wrong answers: {applyingWrong}
                </Text>
                <VictoryPie
                  width={360}
                  data={[
                    { x: `Correct`, y: applyingRight },
                    { x: 'Wrong', y: applyingWrong },
                  ]}
                  colorScale={['green', 'red']}
                />
              </>
            ) : null}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
});

export default StudentInfo;
