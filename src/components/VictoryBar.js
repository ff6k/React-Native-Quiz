import PropTypes, { array } from 'prop-types';
import React,{useState} from 'react';
import theme from '../assets/theme';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar as Victory, VictoryTheme, VictoryLabel } from "victory-native";

const VictoryBar = ({
  controllers,
  data,
}) => {
  const { colors } = theme;
  
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={25}
    >
      <Victory
        style={{ data: { fill: colors.lightPurple} }}
        data={data}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        barRatio={1}
      />
    </VictoryChart>
    
  );
};

VictoryBar.propTypes = {
  controllers: PropTypes.bool,
  data: PropTypes.array,
};

VictoryBar.defaultProps = {
  controllers: true,
  data:[]
};

const styles = StyleSheet.create({
  controllerContainer:{
    flexDirection:'column', 
    alignSelf:'center'
  }
})

export default VictoryBar;
