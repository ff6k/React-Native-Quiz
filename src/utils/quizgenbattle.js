import React from 'react';
import _ from 'lodash';
import { Image } from 'react-native';
import { quizTypes } from '../constants';
import { genQuestion } from './quizgen';
import { imageSource } from './imageSource';

type TopicItem = Array<{
  label: string,
  value: string,
  levels: Array<{ label: string, value: string, starts: number }>,
}>;

type Props = {
  questionType: string,
  topic: string,
  level: string,
  number: number,
  singleQuestionType: string,
};

export const generateRandomQns = (props: Props) => {
  const topicList: TopicItem = quizTypes[props.topic];

  switch (props.questionType) {
    case 1:
      const singleQuiz = singleQuestionType({
        topicList,
        topic: props.topic,
        level: props.level,
        number: props.number,
        singleQnsType: props.singleQuestionType,
        singleDigitsType: props.singleDigitsType,
      });
      //   console.log('singleQuiz', singleQuiz);
      return singleQuiz; //Single Question Type
    case 2:
      const multipleQuiz = multipleQuestionType({
        topicList,
        topic: props.topic,
        level: props.level,
        number: props.number,
      });
      return multipleQuiz; //Multiple Question Type
    default:
      return null;
  }
};

export const singleQuestionType = ({
  topicList,
  topic,
  level,
  number,
  singleQnsType,
  singleDigitsType,
}) => {
  const specficLevelQnsList = _.filter(
    topicList,
    (tp) =>
      tp.value === singleQnsType &&
      tp.levels.filter((lel) => lel.starts === level).length > 0,
  );
  //   console.log({
  //     topicList,
  //     topic,
  //     level,
  //     number,
  //     singleQnsType,
  //     singleDigitsType,
  //   });
  if (specficLevelQnsList && specficLevelQnsList.length === 0) {
    return [];
  }
  const topicItem = specficLevelQnsList[0];

  const specificStarts = topicItem.levels.filter(
    (lel) => lel.starts === level && lel.value === singleDigitsType,
  );

  //   console.log(topicItem.levels);

  const typeDesc = topicItem.value;
  let qnsListBase = [];
  for (let index = 0; index < number; index++) {
    const element = specificStarts[_.random(specificStarts.length - 1)];
    const item = {
      type: typeDesc,
      collection: topic,
      level: element.value,
    };
    const randomQns = genQuestion(item);
    qnsListBase.push(Object.assign(randomQns, { ...item }));
  }

  return qnsListBase;
};

export const multipleQuestionType = ({ topicList, topic, level, number }) => {
  const specficLevelQnsList = _.filter(
    topicList,
    (tp) => tp.levels.filter((lel) => lel.starts === level).length > 0,
  );
  if (specficLevelQnsList && specficLevelQnsList.length === 0) {
    return [];
  }
  let specificStarts = [];
  for (let index = 0; index < specficLevelQnsList.length; index++) {
    const element = specficLevelQnsList[index];
    specificStarts.push({
      value: element.value,
      levels: element.levels.filter((a) => a.starts === level),
    });
  }
  let qnsListBase = [];
  for (let index = 0; index < number; index++) {
    const element = specificStarts[_.random(specificStarts.length - 1)];
    const randomItem = element.levels[_.random(0, element.levels - 1)];
    const item = {
      type: element.value,
      collection: topic,
      level: randomItem.value,
    };
    const randomQns = genQuestion(item);
    qnsListBase.push(Object.assign(randomQns, { ...item }));
  }

  return qnsListBase;
};

const star = require('../assets/img/star.png');
export const createStars = (count) => {
  let table = [];

  // Outer loop to create parent
  for (let i = 0; i < count; i++) {
    let children = [];
    //Create the parent and add the children
    table.push(
      <Image
        key={i}
        source={star}
        style={{ width: 15, height: 15, paddingRight: 1 }}
      />,
    );
  }
  return table;
};

export function getBattleParam(item) {
  const filter = {
    level: item.stars,
    number: item.number,
    questionType: item.qns_type,
    singleQuestionType: item.single_qnstype,
    topic: item.topic,
  };

  try {
    item.question = item.question.replace(/\n/g, '\\n');
  } catch (error) {
    item.question = JSON.stringify(item.question);
    item.question = item.question.replace(/\n/g, '\\n');
  }

  const qns = JSON.parse(item.question);
  const finalQns = qns.map((p) => {
    if (p.hasOwnProperty('imageSourceType')) {
      const { imageSourceType } = p;
      if (imageSourceType) {
        p.image = imageSource[imageSourceType];
      }
    }
    return p;
  });

  const battleParam = {
    qns: finalQns,
    filter,
    battleId: item.battleId,
    position: item.position || 0,
    duration: item.duration || 0,
    result: item.result ? JSON.parse(item.result) : [],
    answers: item.answers ? JSON.parse(item.answers) : [],
  };
  console.log(battleParam);
  return battleParam;
}
