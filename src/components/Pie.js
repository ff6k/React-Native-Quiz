import PropTypes, { array } from 'prop-types';
import React,{useState} from 'react';
import theme from '../assets/theme';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryChart, VictoryPie, VictoryTheme, VictoryLabel } from "victory-native";

const Pie = ({
  data,
}) => {
  const { colors } = theme;
  
  return (
    
      <VictoryPie
        data={data}
        labels={({ datum }) => datum.x+':'+datum.y}
        labelComponent={<VictoryLabel backgroundStyle={[
          { fill: "white"}
        ]}
        backgroundPadding={5}
        />}
        
        labelPlacement={"vertical"}
        labelRadius={({ innerRadius }) => innerRadius + 50 }
      />
    
  );
};

Pie.propTypes = {
  data: PropTypes.array,
};

Pie.defaultProps = {
};

export default Pie;
