import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, useTheme, Title } from 'react-native-paper';
import MathJax from 'react-native-mathjax';

const Mathjax = ({
  containerStyle,
  mathjaxEquation,
  ...props
}) => {
  
  const { dimensions, colors } = useTheme();
  
  return (
    <View style={styles.container}>
      
      <MathJax
        html={mathjaxEquation}
        style={styles.mathJax}
      />
    </View>
  );
};

Mathjax.propTypes = {
  containerStyle: PropTypes.objectOf(PropTypes.any),
  mathjaxEquation:PropTypes.string.isRequired,
};

Mathjax.defaultProps = {
  containerStyle: {},
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    fontSize:40
  },
  mathJax:{
    width:'100%',
    //borderWidth:1,
    fontSize:40,
    alignSelf:'center'
  }
})

export default Mathjax;
