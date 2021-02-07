import React, { useState } from 'react';
import { Card } from 'react-native-paper';
import { Contained } from '../../../components/Button';

const FriendsListItem = ({
  item,
  invitedFriendList,
  index,
  theme,
  subtitle,
  onInvite,
}) => {
  const { dimensions, spacing } = theme;
  const [invited, setInvited] = useState(false);

  const cardStyle = {
    marginBottom: 12,
    width: dimensions.width(96),
    alignSelf: 'center',
  };

  const invite = () => {
    if (onInvite) {
      onInvite(item);
      setInvited(!invited);
    }
  };

  const hasInvited = () => {
    return (
      invitedFriendList.filter((p) => p.friend_id === item.friend_id)?.length >
      0
    );
  };

  const right = () => {
    return (
      <Contained
        // loading={inviting}
        // disabled={invited}
        onPress={invite}
        mode="outlined"
        style={{
          width: dimensions.width(30),
          paddingVertical: 5,
          paddingHorizontal: spacing.width(4),
        }}
        icon={invited ? 'check' : null}
        title={'Invite'}
      />
    );
  };

  return (
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
  );
};

export default FriendsListItem;
