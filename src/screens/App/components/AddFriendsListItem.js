import React, { useState } from 'react';
import { Card } from 'react-native-paper';
import { Contained } from '../../../components/Button';

const AddFriendsListItem = ({
  item,
  friendRequestList,
  index,
  theme,
  subtitle,
  onRequest,
}) => {
  const { dimensions, spacing } = theme;
  const [invited, setInvited] = useState(false);
  const [inviting, setInviting] = useState(false);

  const cardStyle = {
    marginBottom: 12,
    width: dimensions.width(96),
    alignSelf: 'center',
  };

  const request = async () => {
    if (onRequest) {
      setInviting(true);
      const r = await onRequest(item);
      setInvited(r);
      setInviting(false);
    }
  };

  const hasInvited = () => {
    return friendRequestList?.filter((p) => p.friendId === item.id)?.length > 0;
  };

  const right = () => {
    return (
      <Contained
        loading={inviting}
        disabled={invited || hasInvited()}
        mode="outlined"
        onPress={request}
        style={{
          width: dimensions.width(45),
          paddingVertical: 5,
          paddingHorizontal: spacing.width(2),
        }}
        title={'Send Request'}
        icon={invited || hasInvited() ? 'check' : null}
      />
    );
  };

  return (
    <Card key={Number(index)} style={cardStyle}>
      <Card.Title
        title={`${item.profileName}`}
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

export default AddFriendsListItem;
