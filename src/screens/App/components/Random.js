import React, { useState } from 'react';
import { Title } from 'react-native-paper';
import Input from '../../../components/Input';
import { generateOperations } from '../../../utils';

const Random = ({ onChangeText, value }) => {
  const [question, setQuestion] = useState(generateOperations());
  // setQuestion(generateOperations(2));

  return (
    <>
      <Title style={{ marginBottom: 5 }}>{`${question} = ?`}</Title>
      <Input
        label="Provide your answer..."
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
      />
    </>
  );
};

export default Random;
