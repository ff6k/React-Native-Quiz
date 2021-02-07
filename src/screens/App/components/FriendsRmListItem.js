import React from 'react';
import { Card } from 'react-native-paper';
import { Contained } from '../../../components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { STUDENTINFO } from '../../../constants/routeNames';

const FriendsRmListItem = ({
  navigation,
  item,
  invitedFriendList,
  index,
  theme,
  subtitle,
  onDel,
}) => {
  const { dimensions, spacing } = theme;
  const navigator = () => {
    navigation(STUDENTINFO, { id: item.friend_id, hisName: item.friendName });
  };
  const cardStyle = {
    marginBottom: 12,
    width: dimensions.width(96),
    alignSelf: 'center',
  };

  const ondel = () => {
    onDel && onDel(item);
  };

  const right = () => {
    return (
      <Contained
        onPress={ondel}
        mode="outlined"
        icon={null}
        style={{
          width: dimensions.width(30),
          paddingVertical: 5,
          paddingHorizontal: 0,
        }}
        title={'Remove'}
      />
    );
  };

  return (
    <TouchableOpacity onPress={navigator}>
      <Card key={Number(index)} style={cardStyle}>
        <Card.Title
          title={`${item.friendName || '--'}`}
          subtitle={`${subtitle || ''}`}
          right={right}
          rightStyle={{
            paddingBottom: 12,
            paddingRight: 12,
            alignSelf: 'flex-end',
          }}
        />
      </Card>
    </TouchableOpacity>
  );
};

export default FriendsRmListItem;
