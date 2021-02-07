import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import BugDialog from './popup/BugDialog';

//images
import correctImg from '../../../assets/img/good_job_champ.png';
import incorrectImg from '../../../assets/img/ehh_wrong.png';

const DialogModal = ({
  dismissable,
  visible,
  title,
  content,
  actions,
  correct,
  onPressed,
  youtubeUrl,
  onBugReport,
}) => {
  const youtube = correct ? null : (
    <TouchableOpacity
      onPress={onPressed}
      style={{
        backgroundColor: 'red',
        borderRadius: 5,
        width: 80,
        height: 50,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        HELP!
      </Text>
    </TouchableOpacity>
  );

  const Bug = correct ? null : (
    <TouchableOpacity
      onPress={onBugReport}
      style={{
        backgroundColor: 'yellow',
        borderRadius: 5,
        width: 80,
        height: 50,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Bug Report
      </Text>
    </TouchableOpacity>
  );

  return (
    <Portal>
      <Dialog visible={visible} dismissable={dismissable}>
        <Dialog.Title style={{ textAlign: 'center' }}>{title}</Dialog.Title>
        <Dialog.Content>
          {correct ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  width: 75,
                  height: 80,
                }}
                source={correctImg}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  width: 75,
                  height: 80,
                }}
                source={incorrectImg}
              />
              {youtubeUrl ? youtube : null}
              {correct ? null : Bug}
            </View>
          )}
          <Paragraph style={{ textAlign: 'center' }}>{content}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: 'space-evenly' }}>
          {actions.map((action, index) => (
            <Button
              key={Number(index)}
              onPress={action.onPress}
              labelStyle={{ textTransform: 'capitalize' }}
            >
              {action.text}
            </Button>
          ))}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

Dialog.propTypes = {
  dismissable: PropTypes.bool,
  visible: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
    }),
  ),
  correct: PropTypes.bool,
};

Dialog.defaultProps = {
  dismissable: false,
  visible: false,
  content: 'This is the content',
  title: 'This is the title',
  actions: [],
  correct: false,
};

export default DialogModal;
