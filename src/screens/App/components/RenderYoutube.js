import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import WebView from 'react-native-webview';
import { Picker } from '@react-native-picker/picker';
import { quizTypes } from '../../../constants';
import { Contained as ContainedButton } from '../../../components/Button';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const RenderYoutube = ({ route, navigation }) => {
  const [url, setUrl] = useState('');
  const [val, setVal] = useState('');
  const { colors } = useTheme();
  const state = useSelector((state) => state);

  const { type, level } = route.params;
  const { quiz } = state;

  let youtubeUrl = [];
  try {
    youtubeUrl = quizTypes[quiz.collection]
      .find((q) => q.value === type)
      .levels.find((r) => r.value === level).youtubeUrls;
  } catch (error) {}

  let quizLevelTitle = '';
  try {
    quizLevelTitle = quizTypes[quiz.collection]
      .find((q) => q.value === quiz.type)
      .levels.find((r) => r.value === quiz.level).label;
  } catch (error) {}

  const star = require('../../../assets/img/star.png');

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
          style={{
            width: 50,
            height: 50,
            paddingRight: 1,
            alignSelf: 'center',
            marginTop: 10,
          }}
        />,
      );
    }
    return table;
  };
  let starts = [];

  try {
    starts = quizTypes[quiz.collection]
      .find((q) => q.value === quiz.type)
      .levels.find((r) => r.value === quiz.level).starts;
  } catch (error) {}

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.scrollViewStyle,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        {createStars(starts)}
        <Title style={{ alignSelf: 'center', marginBottom: 20 }}>
          {quizLevelTitle}
        </Title>
        <WebView
          style={styles.WebView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{
            uri: url,
          }}
        />
        <View style={{ width: '80%', alignSelf: 'center' }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            Choose video below
          </Text>
          <Picker
            style={styles.picker}
            selectedValue={val}
            onValueChange={(value) => {
              setUrl(value), setVal(value);
            }}
          >
            {youtubeUrl.map(({ title, url }) => {
              return (
                <Picker.Item
                  key={`${title}`}
                  label={`${title}`}
                  value={`${url}`}
                />
              );
            })}
          </Picker>
        </View>
        <ContainedButton
          loading={false}
          onPress={() => navigation.goBack()}
          title="back"
          style={{ backgroundColor: colors.blue, marginTop: 30 }}
          icon={null}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  WebView: {
    height: 400,
    marginBottom: 20,
  },
});

export default RenderYoutube;
