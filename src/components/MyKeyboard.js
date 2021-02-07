import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import {
  insertText,
  backSpace,
  hideKeyboard,
  register,
} from '../components/MyCustomInput';

class MyKeyboard extends Component {
  onPress1 = () => {
    insertText(this.props.tag, '1');
  };

  onPress2 = () => {
    insertText(this.props.tag, '2');
  };

  onPress3 = () => {
    insertText(this.props.tag, '3');
  };

  onPress4 = () => {
    insertText(this.props.tag, '4');
  };

  onPress5 = () => {
    insertText(this.props.tag, '5');
  };

  onPress6 = () => {
    insertText(this.props.tag, '6');
  };

  onPress7 = () => {
    insertText(this.props.tag, '7');
  };

  onPress8 = () => {
    insertText(this.props.tag, '8');
  };

  onPress9 = () => {
    insertText(this.props.tag, '9');
  };

  onPressBackSpace = () => {
    backSpace(this.props.tag);
  };

  onPress0 = () => {
    insertText(this.props.tag, '0');
  };
  
  onPressX = () => {
    insertText(this.props.tag, 'x');
  };

  onPressY = () => {
    insertText(this.props.tag, 'y');
  };

  onPressZ = () => {
    insertText(this.props.tag, 'z');
  };

  onPressSum = () => {
    insertText(this.props.tag, '+');
  };

  onPressSub = () => {
    insertText(this.props.tag, '-');
  };

  onPressDote = () => {
    insertText(this.props.tag, '.');
  };

  onPressHideKeyboard = () => {
    hideKeyboard(this.props.tag);
  };

  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPress1}>
              <Text style={styles.buttonLabel}>1</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPress2}>
              <Text style={styles.buttonLabel}>2</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPress3}>
              <Text style={styles.buttonLabel}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPressSum}>
              <Text style={styles.buttonLabel}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPressX}>
              <Text style={styles.buttonLabel}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPress4}>
              <Text style={styles.buttonLabel}>4</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPress5}>
              <Text style={styles.buttonLabel}>5</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPress6}>
              <Text style={styles.buttonLabel}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPressSub}>
              <Text style={styles.buttonLabel}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPressY}>
              <Text style={styles.buttonLabel}>y</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPress7}>
              <Text style={styles.buttonLabel}>7</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPress8}>
              <Text style={styles.buttonLabel}>8</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPress9}>
              <Text style={styles.buttonLabel}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPressDote}>
              <Text style={styles.buttonLabel}>.</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPressZ}>
              <Text style={styles.buttonLabel}>z</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '40%' }}>
            <TouchableOpacity onPress={this.onPress0}>
              <Text style={styles.buttonLabel}>0</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '40%' }}>
            <TouchableOpacity onPress={this.onPressBackSpace}>
              <Text style={styles.buttonLabel}>&larr;</Text>
            </TouchableOpacity>
          </View>
           <View style={styles.button}>
            <TouchableOpacity onPress={this.onPressHideKeyboard}>
              <Text style={styles.buttonLabel}>&darr;</Text>
            </TouchableOpacity>
          </View> 
        </View>
      </View>
    );
  }
}
register('my-keypad', () => MyKeyboard);
const styles = StyleSheet.create({
  buttonLabel: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    fontSize: 20,
  },
  button: {
    width: '20%',
  },
});

export default MyKeyboard;
