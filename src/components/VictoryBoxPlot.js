import PropTypes, { array } from 'prop-types';
import React,{useState} from 'react';
import theme from '../assets/theme';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBoxPlot as Victory, VictoryTheme, VictoryLabel, VictoryLegend, VictoryAxis } from "victory-native";

const VictoryBoxPlot = ({
  xLabel,
  coordinates,
  legends
}) => {
  const { colors } = theme;

  const colorStack = [
    colors.lightPurple,
    colors.primary,
    colors.text,
    colors.lightRed
  ];

  legends.forEach((element,key) => {
    //symbol: { fill: "orange" }
    //element['symbol'] = {fill: colorStack[key]}
    legends[key]['symbol']={fill: colorStack[key]};
  });

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={10}
    >
      <VictoryLegend x={125} y={50}
  	//title="Legend"
    centerTitle
    orientation="horizontal"
    gutter={20}
    style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
    data={legends}
  />
  <VictoryAxis 
  crossAxis
  label={xLabel}
  axisLabelComponent={<VictoryLabel dy={20}/>}
  />
  <VictoryAxis 
  dependentAxis crossAxisn
  //label="Time (ms)"
  />
    {coordinates.map((rowData, index) => (
      <Victory
      key={index}
      data={rowData}
      labels={true}
      labelComponent={<VictoryLabel backgroundStyle={{ fill: colorStack[index] }}
      backgroundPadding={3} dy={-20}/>}
      style={{
        data: { stroke: colorStack[index] },
        parent: { border: "1px solid #ccc"},
      }}
    />
    ))}
    </VictoryChart>
    
  );
};

VictoryBoxPlot.propTypes = {
  xLabel: PropTypes.string,
  coordinates: PropTypes.array,
  legends:PropTypes.array
};

VictoryBoxPlot.defaultProps = {
  xLabel: "",
  coordinates:[{x:0,y:0}],
  legends:[],
};

const styles = StyleSheet.create({
  controllerContainer:{
    flexDirection:'column', 
    alignSelf:'center'
  }
})

export default VictoryBoxPlot;
