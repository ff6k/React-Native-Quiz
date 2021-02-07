import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const YoutubePicker = ({ val, setVal, setUrl, setYoutube, youtubeUrl }) => {
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={val}
        onValueChange={(value) => {
          setUrl(value), setYoutube(true), setVal(value);
        }}
      >
        {youtubeUrl.map(({ title, url }) => {
          return (
            <Picker.Item key={`${title}`} label={`${title}`} value={`${url}`} />
          );
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

export default YoutubePicker;
