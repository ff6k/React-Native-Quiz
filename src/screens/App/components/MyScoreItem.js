import React from 'react';
import { Avatar, Card, Text, Title } from 'react-native-paper';
import { Image, View } from 'react-native';

import { quizTypes } from './../../../constants/index';
const MyScoreItem = ({
  item: { category, subCategory, level, score } = {},
  index,
  theme,
}) => {
  const { colors, dimensions } = theme;
  //const correct = Boolean(Number(status));

  const cardStyle = {
    marginBottom: 12,
    width: dimensions.width(96),
    alignSelf: 'center',
  };
  const star = require('./../../../assets/img/star.png');
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
          style={{ width: 15, height: 15, paddingRight: 1 }}
        />,
      );
    }
    return table;
  };

  let quizType = quizTypes[category]?.find((q) => q.value === subCategory);
  let levelOb = quizType?.levels?.find((q) => q.value === level);
  let title = `${quizType?.label}`;

  return (
    <Card key={Number(index)} style={cardStyle}>
      <Card.Title
        title={`${title}`}
        subtitle={`${levelOb?.label}`}
        // left={(props) => (
        //   <Avatar.Text
        //     size={50}
        //     label={score}
        //     style={{ backgroundColor: 'transparent' }}
        //     color={colors.withOpacity(1, 'primary')}
        //     {...props}
        //   />
        // )}
        right={() => (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', top: 10 }}>
              {createStars(levelOb?.starts)}
            </View>
            <Title style={{ color: colors.primary, fontSize: 20 }}>
              {score}
            </Title>
          </View>
        )}
        rightStyle={{
          paddingBottom: 20,
          paddingRight: 15,
          alignSelf: 'flex-end',
        }}
      />
    </Card>
  );
};

export default MyScoreItem;
