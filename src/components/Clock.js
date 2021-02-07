import PropTypes, { array } from 'prop-types';
import React,{useState} from 'react';
import theme from '../assets/theme';
// import { View, Text, StyleSheet } from 'react-native';
// import { Title } from 'react-native-paper';
import AnalogClock from 'react-native-clock-analog';


const Clock = ({
  miniute,
  hour,
}) => {
  const { colors } = theme;

  // const [miniutes,setMimiutes] = useState(miniute);
  // const [hours,setHours] = useState(hour);
  const[change,setChange] = useState(true);
  


  return (
    
      
      
      <AnalogClock
        colorClock={colors.background}
        colorNumber={colors.accent}
        colorCenter={colors.primary}
        colorHour={colors.backdrop}
        colorMinutes={colors.lightGray}
        hour={hour}
        minutes={Number(miniute)}
        key={1}
      />
      
  );
};

Clock.propTypes = {
  hour: PropTypes.number,
  miniute: PropTypes.number
};

Clock.defaultProps = {
  hour:12,
  miniute:60,
};

export default Clock;
