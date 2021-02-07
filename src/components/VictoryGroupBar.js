import PropTypes, { array } from 'prop-types';
import React,{useState} from 'react';
import theme from '../assets/theme';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar as Victory, VictoryTheme, VictoryGroup, VictoryLabel, VictoryLegend } from "victory-native";

const VictoryGroupBar = ({
  data,
  legends
}) => {
  const { colors } = theme;
  //console.log(legends);

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
  //console.log(legends);

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={25}
    >
      <VictoryLegend x={125} y={50}
          //title="Legend"
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
          data={legends}
        />
      <VictoryGroup
      offset={12}
      colorScale={colorStack}
      
      >

      {
        data.map((rowData, index) => (
          <Victory
        key={index}
        //style={{ data: { fill: colors.lightPurple} }}
        data={rowData}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        barRatio={1}
        // labels={({ datum }) => `${datum.y}`}
        // labelComponent={
        //   <VictoryLabel style={{bottom:25}}/>
        // }
      />
          )
        )
      }
      </VictoryGroup>
      
    </VictoryChart>
    
  );
};

VictoryGroupBar.propTypes = {
  data: PropTypes.array,
  legends: PropTypes.array,
};

VictoryGroupBar.defaultProps = {
  data:[],
  legends:[]
};

const styles = StyleSheet.create({
  controllerContainer:{
    flexDirection:'column', 
    alignSelf:'center'
  }
})

export default VictoryGroupBar;
