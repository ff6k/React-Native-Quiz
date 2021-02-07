import React from 'react';
import {
  Button,
  Card,
  Dialog,
  Divider,
  Paragraph,
  Portal,
  Subheading,
  Title,
} from 'react-native-paper';
import moment from 'moment';
import { Badge, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { DropAlert } from '../../../components/Alert';
import { isArray } from 'lodash';
import { createStars } from '../../../utils/quizgenbattle';
import { Contained } from '../../../components/Button';
import WhiteSpace from '../components/WhiteSpace';
import { quizTypes } from '../../../constants';

const InvitedBattleItem = ({ item, onPress, onReviewBattle, user }) => {
  const { colors, dimensions, spacing } = useTheme();

  const cardStyle = {
    marginBottom: 12,
    width: dimensions.width(96),
    alignSelf: 'center',
    borderWidth: 0,
  };

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  const bgColor =
    item.enabled == 1
      ? { backgroundColor: colors.lightRed }
      : { backgroundColor: colors.lightGreen };

  const winner =
    isArray(item.scorelist) &&
    item.scorelist?.filter((a) => a.iswin === '1')[0]?.profileName;

  const _myscore =
    isArray(item.scorelist) &&
    item.scorelist?.find((a) => a.user_id === user.id)?.score;

  const startbattle = () => {
    if (_myscore) {
      DropAlert('info', 'Info', 'You have completed this battle');
      return;
    }
    if (item.enabled == 0 || _myscore) {
      DropAlert('info', 'Info', 'Battle is end');
      return;
    }

    onPress && onPress(item);
  };

  const reviewbattle = () => {
    onReviewBattle && onReviewBattle(item);
  };

  const yes = async () => {
    hideDialog();
  };

  const no = () => {
    hideDialog();
  };

  const ScoreList = (props) => {
    // console.log(props);
    return (
      isArray(props.scorelist) &&
      props.scorelist?.map((_item, index) => {
        const dr = moment.duration(_item.duration);
        return (
          <View
            key={index}
            style={{
              flex: 1,
              marginVertical: 5,
              paddingHorizontal: spacing.width(5),
            }}
          >
            <View>
              <Subheading>User: {_item?.profileName}</Subheading>
              <Subheading>
                Score: {_item?.score ? _item.score : 'Pending'}
              </Subheading>
              {_item?.iswin === '1' ? (
                <Subheading>Rewards: 200</Subheading>
              ) : null}
              <Subheading>
                Time:{' '}
                {_item?.duration
                  ? `${dr.minutes()}m:${dr.seconds()}s`
                  : 'Pending'}
              </Subheading>
            </View>
            <Divider />
          </View>
        );
      })
    );
  };

  return (
    <Card style={{ ...cardStyle }}>
      <View
        style={{
          ...bgColor,
          borderRadius: 5,
          paddingVertical: 12,
          minHeight: dimensions.height(25),
        }}
      >
        <Card.Content>
          <Title style={{ textAlignVertical: 'auto' }}>
            {item.topic} - {item.stars} {createStars(item.stars)}
          </Title>
          {item.isopen == 1 ? (
            <Badge
              style={{
                top: 0,
                right: 5,
                position: 'absolute',
                backgroundColor: colors.primary,
                fontSize: 16,
              }}
            >
              OPEN
            </Badge>
          ) : null}

          <Subheading>
            {item.qns_type == 1
              ? 'Single Question Type'
              : 'Multiple Question Type'}
          </Subheading>
          {item.single_qnstype ? (
            <Subheading>
              {
                quizTypes[item.topic].find(
                  (a) => a.value === item.single_qnstype,
                )?.label
              }
            </Subheading>
          ) : null}
          {/* {item.digits_type ? (
            <Subheading>{item.digits_type}</Subheading>
          ) : null} */}
          <Subheading>{item.number} questions</Subheading>
        </Card.Content>

        <Card.Content>
          {/* <Paragraph>
          {score || '--'} /{' '}
          {enabled == 0 ? (iswin === '1' ? 'Win' : 'Lose') : '--'}
        </Paragraph> */}
          <Paragraph>{moment(item.created).format('lll')}</Paragraph>
        </Card.Content>

        {/* <Divider /> */}
        {/* <Card.Content>
          <ScoreList {...item} />
        </Card.Content> */}
        <WhiteSpace />
        {winner ? (
          <Card.Content>
            <Title style={{ alignSelf: 'flex-start' }}>Winner:{winner}</Title>
          </Card.Content>
        ) : (
          <Card.Content>
            <Title style={{ alignSelf: 'flex-start' }}>Winner:Pending</Title>
          </Card.Content>
        )}
      </View>
      <Card.Content
        style={{
          justifyContent: 'flex-end',
          position: 'absolute',
          right: -10,
          bottom: 10,
          height: '100%',
        }}
      >
        {_myscore ? null : (
          <Contained
            title="Start Battle"
            style={{ paddingHorizontal: 0, width: dimensions.width(40) }}
            color={colors.error}
            icon={null}
            onPress={startbattle}
          />
        )}
        <Contained
          title="Invited Users"
          onPress={() => {
            setVisible(true);
          }}
          style={{ paddingHorizontal: 0, width: dimensions.width(40) }}
          color={colors.accent}
          icon={null}
        />
        {_myscore ? (
          <Contained
            title={'Questions And Answers'}
            onPress={reviewbattle}
            style={{ paddingHorizontal: 0, width: dimensions.width(40) }}
            color={colors.blue}
            icon={null}
          />
        ) : null}
      </Card.Content>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <ScrollView style={{ maxHeight: dimensions.height(60) }}>
            <ScoreList {...item} />
          </ScrollView>
          <Dialog.Actions style={{ justifyContent: 'space-around' }}>
            <Button color={colors.error} onPress={no}>
              close
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Card>
  );
};

export default InvitedBattleItem;
