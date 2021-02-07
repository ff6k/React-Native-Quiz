import PropTypes, { array } from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import { Title } from 'react-native-paper';

const FormattedText = ({
  text,
  ...props
}) => {
  
  let result,indices=[],formattedText

  var supPattern = /\^{(.*?)\}/g;
  
  if(text.match(supPattern)){
      
    while ( (result = supPattern.exec(text)) ) {
  	//console.log(result);
    //alert(search,replace);
    text = text.replace('^{'+result[1]+'}','=|=');
    indices.push(result[1]);
    }

    let textComp = []
    let textSplit = text.split('=|=');

    textSplit.map((text,index)=>{
        textComp.push(<Title key={"1"+index} style={{fontSize: 20, lineHeight: 30}}>{text}</Title>)
        if(indices[index]){
            textComp.push(<Title key={"2"+index} style={{fontSize: 15, lineHeight: 18}}>{indices[index]}</Title>)
        }
    });

    formattedText = <View key={1} style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        {textComp}
    </View>
    
}else{
    formattedText = <Title>{text}</Title>;
}
  

  return (
  <Text>{formattedText}</Text>
  );
};

FormattedText.propTypes = {
  text: PropTypes.string.isRequired
};

FormattedText.defaultProps = {
  text: '',
};


export default FormattedText;
