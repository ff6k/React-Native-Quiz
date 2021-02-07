import React, { useState } from 'react';
import { StyleSheet, View, NativeModules, Keyboard, Text } from 'react-native';
import { CustomTextInput, register } from '../../components/MyCustomInput';
import MyKeyboard from '../../components/MyKeyboard';

const KeyboardTest = ({ navigation }) => {
  const [password, setPassword] = useState('');

  register('price', () => MyKeyboard);

  return (
    <View style={styles.container}>
      <Text>test</Text>
      <CustomTextInput
        customKeyboardType="price"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'grey',
    width: 270,
    fontSize: 19,
  },
});

export default KeyboardTest;
