import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

const Reward = ({ show, hideRewardDialog }) => {
  const treasureOpened = require('../../../../assets/img/treasure_open.png');
  return (
    <Portal>
      <Dialog visible={show} dismissable={true}>
        <Dialog.Title style={{ alignSelf: 'center', fontSize: 26 }}>
          Congratulations
        </Dialog.Title>
        <Dialog.Content>
          <Image
            style={{
              alignSelf: 'center',
              width: 120,
              height: 120,
              marginBottom: 15,
            }}
            source={treasureOpened}
          />
          <Paragraph
            style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}
          >
            You have been rewarded 1000 bonus points
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: 'space-evenly' }}>
          <Button
            onPress={() => hideRewardDialog()}
            key={1}
            labelStyle={{ textTransform: 'capitalize' }}
          >
            Close
          </Button>
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
const styles = StyleSheet.create({});

export default Reward;
