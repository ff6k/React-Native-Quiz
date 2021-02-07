import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Divider, RadioButton, useTheme, Title } from 'react-native-paper';
import { IconButton, useDispatch, useSelector } from 'react-redux';
import { FlatGrid } from 'react-native-super-grid';
import { Contained as Button } from '../../components/Button';
import { quizTypes, collictions } from '../../constants';
import {
  setQuizType,
  setQuizCollection,
  setQuizLevel,
} from '../../containers/actions/quiz';
import { QUIZ } from '../../constants/routeNames';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';

const Category = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const { quiz } = useSelector(({ quiz }) => ({ quiz }));
  const state = useSelector((state) => state);
  const [value, setValue] = useState(quiz.type);
  const [collection, setCollection] = useState(quiz.collection);
  const { colors, fonts } = useTheme();
  const [shouldShow, setShouldShow] = useState(true);
  const [levelValue, setLevelValue] = useState();
  const [quizeLevel, setQuizeLevel] = useState(quiz.level);
  const [showConfirm, setShowConfirm] = useState(false);

  const { quiz: { myScore = [] } = {} } = state;

  useEffect(() => {
    setQuizType(value)(dispatch);
  }, [value]);

  useEffect(() => {
    setQuizCollection(collection)(dispatch);
  }, [collection]);

  useEffect(() => {
    setQuizLevel(quizeLevel)(dispatch);
  }, [quizeLevel]);

  const selectCollection = (selctCollection) => {
    //console.log(selctCollection)
    setQuizCollection(selctCollection)(dispatch);
    setCollection(selctCollection);
    setShouldShow(false);
  };
  const { quiz: { summery = { correct: 0, total: 0 } } = {} } = state;

  const setValues = (values) => {
    setLevelValue(values);

    var values_arr = values.split('-');

    setValue(values_arr[0]);
    setQuizLevel(values_arr[1])(dispatch);
    setShowConfirm(true);
  };

  const star = require('../../assets/img/star.png');
  const treasureOpened = require('../../assets/img/treasure_open.png');
  const treasureClosed = require('../../assets/img/treasure_closed.png');

  const createStars = (count) => {
    let table = [];

    // Outer loop to create parent
    for (let i = 0; i < count; i++) {
      let children = [];
      //Create the parent and add the children
      table.push(
        <Image
          key={i}
          source={star}
          style={{ width: 20, height: 20, paddingRight: 1 }}
        />,
      );
    }
    return table;
  };

  let scored;
  let levelScore;

  try {
    scored = myScore
      .filter((q) => q.topic == quiz.collection)[0]
      .data.filter((c) => c.subCategory == quiz.type)
      .filter((r) => r.level == quiz.level)[0].score;
  } catch (error) {}

  levelScore = scored ? scored : 0;
  let bonusLimit;
  try {
    bonusLimit = quizTypes[quiz.collection]
      .find((q) => q.value === quiz.type)
      .levels.find((r) => r.value === quiz.level).bonusLimit;
  } catch (error) {}

  const y = levelScore;
  const x = bonusLimit - y;

  return shouldShow ? (
    <SafeAreaView>
      <FlatGrid
        itemDimension={130}
        data={collictions}
        //style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({ item, index }) => (
          <TouchableNativeFeedback
            onPress={() => selectCollection(item.value)}
            background={
              Platform.OS === 'android'
                ? TouchableNativeFeedback.SelectableBackground()
                : ''
            }
          >
            <View style={[styles.itemContainer]}>
              <Image style={[styles.icon]} source={item.img} />
              <Text style={styles.itemName}>{item.label}</Text>
            </View>
          </TouchableNativeFeedback>
        )}
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 12, justifyContent: 'center', flex: 1 }}>
          <RadioButton.Group onValueChange={setValues} value={levelValue}>
            {quizTypes[quiz.collection].map((item, index) => {
              return (
                <View key={Number(index)}>
                  <Collapse>
                    <CollapseHeader>
                      <Title
                        style={{
                          borderWidth: 1,
                          borderColor: colors.primary,
                          padding: 5,
                          paddingLeft: 10,
                          backgroundColor: colors.background,
                          borderRadius: 5,
                          fontFamily: fonts.regular.fontFamily,
                          color: '#841584',
                        }}
                      >
                        {item.label}
                      </Title>
                    </CollapseHeader>
                    <CollapseBody style={styles.collapseBody}>
                      {item.levels.map((levelItem, levelIndex) => {
                        levelItem.starts = levelItem.starts
                          ? levelItem.starts
                          : levelIndex + 1;

                        return (
                          <View
                            key={Number(index + levelIndex)}
                            style={{
                              marginLeft: 10,
                              flex: 1,
                              justifyContent: 'center',
                            }}
                          >
                            <RadioButton.Item
                              label={
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    zIndex: 50,
                                  }}
                                >
                                  {createStars(levelItem.starts)}
                                  <TouchableOpacity
                                    style={{ marginLeft: 10 }}
                                    onPress={() =>
                                      console.log('treasure pressed')
                                    }
                                  >
                                    <Image
                                      style={{
                                        width: 30,
                                        height: 30,
                                      }}
                                      source={
                                        x > 0 ? treasureClosed : treasureOpened
                                      }
                                    />
                                  </TouchableOpacity>
                                  <Text
                                    style={{
                                      color: colors.primary,
                                      paddingLeft: 5,
                                    }}
                                  >
                                    {levelItem.label}
                                  </Text>
                                </View>
                              }
                              value={item.value + '-' + levelItem.value}
                              style={{ paddingHorizontal: 0 }}
                              color={colors.primary}
                            />
                          </View>
                        );
                      })}
                    </CollapseBody>
                  </Collapse>
                </View>
              );
            })}
          </RadioButton.Group>
          {showConfirm ? (
            <Button
              onPress={() => navigate(QUIZ)}
              title="Confirm"
              icon="check"
              style={{
                alignSelf: 'flex-end',
                marginTop: 15,
                paddingHorizontal: 0,
              }}
            />
          ) : null}
          <Button
            onPress={() => setShouldShow(true)}
            title="Go Back"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  header: {
    height: 75,
    //borderBottomColor: '#800080',
    //borderWidth: 2,
    padding: 5,
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(22, 186, 95, 1)',
    backgroundColor: '#ffffff',
  },
  itemName: {
    fontSize: 16,
    color: '#6d7a83',
    fontWeight: '600',
    alignSelf: 'center',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#6d7a83',
  },
  icon: {
    width: 185,
    height: 114,
    resizeMode: 'stretch',
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center',
  },
  logo: {
    width: 75,
    height: 50,
    resizeMode: 'stretch',
    borderWidth: 2,
    borderRadius: 10,
  },
  menu: {
    color: '#800080',
    alignSelf: 'center',
    fontSize: 20,
  },
  mainCategory: {
    borderWidth: 1,
    padding: 3,
  },
  collapseBody: {
    backgroundColor: 'white',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 10,
  },
});
