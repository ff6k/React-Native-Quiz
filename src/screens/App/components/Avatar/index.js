import React from 'react';
import { useState } from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import ImageButton from '../../../../components/ImageButton';
import WhiteSpace from '../WhiteSpace';

const BODY = [
  require('./assets/head.gif'),
  require('./assets/arm.gif'),
  require('./assets/leg.gif'),
];

const Index = ({ params }) => {
  const [body, setBody] = useState(BODY);

  return (
    <View>
      <View style={styles.contianer}>
        {body.map((item, index) => {
          return (
            <Image
              key={index}
              width={140}
              height={226}
              style={{ ...styles.head, zIndex: index + 1 }}
              source={item}
            />
          );
        })}
      </View>
      <WhiteSpace size="lg" />
      <View style={styles.partialContainer}>
        <ImageButton
          imgProps={{
            source: require('./assets/partial/pants1.gif'),
          }}
          btnProps={{
            onPress: () => {
              setBody([
                require('./assets/head.gif'),
                require('./assets/arm.gif'),
                require('./assets/leg.gif'),
                require('./assets/preview/pants1.gif'),
              ]);
            },
          }}
        />
        <ImageButton
          imgProps={{
            source: require('./assets/partial/clothe1.gif'),
          }}
          btnProps={{
            onPress: () => {
              setBody([
                require('./assets/head.gif'),
                require('./assets/arm.gif'),
                require('./assets/leg.gif'),
                require('./assets/preview/clothe1.gif'),
              ]);
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    position: 'relative',
    height: 226,
    width: 140,
    top: 0,
    left: 0,
    padding: 0,
    borderWidth: 1,
    borderColor: 'gray',
  },
  head: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  partialContainer: {},
});

export default Index;
