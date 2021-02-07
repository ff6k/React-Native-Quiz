import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useTheme } from 'react-native-paper';


const Selecter = ({
  onValueChange,
  selectedValue,
  list,
  label,
  containerStyle,
  style,
  ...props
}) => {
  const { dimensions, colors } = useTheme();
  return (
    <View style={{
      borderWidth:2,
      //borderTopWidth:0,
      borderColor:colors.primary,
      borderRadius:3,
      marginTop:5,
      marginRight:5,
      alignSelf:'center',
      ...containerStyle}}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 40, width: 100, ...style}}
        onValueChange={onValueChange}
      >
        {list.map((collectionItem,collectionIndex)=>{
          
          return(
            <Picker.Item key={collectionIndex} label={collectionItem.label} value={collectionItem.value} />
          )
        })}
        
      </Picker>
    </View>
  );
};

Selecter.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
  list: PropTypes.array,
  label: PropTypes.string,
  props: PropTypes.objectOf(PropTypes.any),
  containerStyle: PropTypes.objectOf(PropTypes.any),
};

Selecter.defaultProps = {
  selectedValue: '',
  label: '',
  list:[{label:'',value:"Please select"}],
  props: {},
  containerStyle: {},
  style: {},
};

export default Selecter;
