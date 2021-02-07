import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Dialog from 'react-native-dialog';
import axios from 'axios';
import Http from '../../../../services/Http';

const BugDialog = ({
  visible,
  userAnswer,
  correctAnswer,
  topicName,
  quizQuestion,
  level,
  subTopic,
  handleCancel,
  setVisible,
  setShowDialog,
  accountName,
  email,
}) => {
  const [report, setReport] = useState('');
  const [mailSent, setmailSent] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState('');

  const APP_API = 'https://www.thetutorsdirectory.com/app/api/index.php';

  useEffect(() => {
    if (correctAnswer) {
      setState(
        `Account Name: ${accountName}. \nEmail: ${email}. \nTopic's name: ${topicName}. \nSub topic: ${subTopic}. \nQuiz level: ${level}. \nQuestion: ${quizQuestion}. \nUser's answer: ${userAnswer}. \nCorrect answer: ${correctAnswer}. \nUser's report: ${report}`,
      );
    } else if (report) {
      setState(
        `Account Name: ${accountName}. \nEmail: ${email}. \nUser's report: ${report}`,
      );
    } else {
      setState('');
    }
  }, [report]);

  const handleBugSubmit = async () => {
    if (report) {
      axios({
        method: 'post',
        url: APP_API,
        headers: { 'content-type': 'application/json', action: 'BUG_REPORT' },
        data: state,
      })
        .then((result) => {
          if (result.data.sent) {
            setmailSent(result.data.sent);
            setError(false);
          } else {
            setError(true);
          }
        })
        .catch((error) => setError(error.message));
      setVisible(false);
      setReport('');
      if (correctAnswer) {
        setShowDialog(true);
      }
    } else {
      setReport('Please write a report');
    }
  };
  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Bug Report</Dialog.Title>
        <Dialog.Description>
          Please explain what problem you are facing and click on submit.
        </Dialog.Description>
        <Dialog.Input
          placeholder="Bug Report"
          style={styles.inputBar}
          onChangeText={(newValue) => setReport(newValue)}
          value={report}
        />
        <Dialog.Button label="Cancel" onPress={() => handleCancel()} />
        <Dialog.Button label="Submit" onPress={() => handleBugSubmit()} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBar: {
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});

export default BugDialog;
