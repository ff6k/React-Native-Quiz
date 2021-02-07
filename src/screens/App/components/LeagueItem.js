import React from 'react';
import { Avatar, Card, Text } from 'react-native-paper';

const LeagueItem = ({
  item: { name, mark } = {},
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

  const trophyImg = [
    require('../../../assets/img/trophy_gold.png'),
    require('../../../assets/img/trophy_silver.png'),
    require('../../../assets/img/trophy_bronze.png'),
  ];

  return (
    <Card key={Number(index)} style={cardStyle}>
      <Card.Title
        title={`${name}`}
        subtitle={`Total scores: ${mark}`}
        left={(props) => {
          if(index==0||index==1||index==2){
            return(
            <Avatar.Image
            size={40} 
            source={trophyImg[index]}
            style={{backgroundColor:'transparent'}}
            />);
          }else{
            return(
              <Avatar.Text
                size={24} 
                label={index+1}
                style={{ backgroundColor: 'transparent' }}
                color={colors.withOpacity(1, 'primary')}
                {...props}
              />
            )
          }
          }}
        right={() => (
          <Text style={{ color: colors.backdrop, fontSize: 12 }}>
            
          </Text>
        )}
        rightStyle={{
          paddingBottom: 12,
          paddingRight: 12,
          alignSelf: 'flex-end',
        }}
      />
    </Card>
  );
};

export default LeagueItem;
