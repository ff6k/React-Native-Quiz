import React from 'react';
import { Button, Card, Paragraph, Title, useTheme } from 'react-native-paper';
import moment from 'moment';

const RequestFirendsListItem = ({
  user,
  item,
  dimensions,
  onAccept,
  onReject,
}) => {
  const theme = useTheme();
  const cardStyle = {
    marginBottom: 12,
    width: dimensions.width(96),
    alignSelf: 'center',
  };
  //   const singleQuestionType = QUESTIONS_TYPE.find(
  //     (a) => a.value === questionType,
  //   )?.label;

  const getRender = () => {
    switch (item.isaccept) {
      case '0':
        return (
          <Card.Content>
            <Paragraph style={{ color: theme.colors.error }}>Failed</Paragraph>
          </Card.Content>
        );
      case '1':
        return (
          <Card.Content>
            <Paragraph style={{ color: theme.colors.primary }}>
              Accepted
            </Paragraph>
          </Card.Content>
        );
      default:
        if (user.id === item.invite_userid) {
          return (
            <Card.Content>
              <Paragraph style={{ color: theme.colors.accent }}>
                Pending
              </Paragraph>
            </Card.Content>
          );
        } else {
          return (
            <Card.Actions>
              <Button
                onPress={() => {
                  onAccept && onAccept(item);
                }}
                color={theme.colors.primary}
              >
                Accept
              </Button>
              <Button
                onPress={() => {
                  onReject && onReject(item);
                }}
                color={theme.colors.error}
              >
                Reject
              </Button>
            </Card.Actions>
          );
        }
    }
  };

  return (
    <Card style={cardStyle}>
      <Card.Title
        title={
          user.id === item.invite_userid
            ? `Your friends request To ${item.invited_username}`
            : `${item.invite_username} wants to be friends`
        }
        subtitle={moment(item.created).add(-1, 'M').format('lll')}
      />
      {getRender()}
    </Card>
  );
};

export default RequestFirendsListItem;
