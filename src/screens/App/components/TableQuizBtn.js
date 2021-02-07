import React from 'react';
import {View, StyleSheet} from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import QuizTitle from './QuizTitle';
import Table from '../../../components/Table';
import { FlatGrid  } from 'react-native-super-grid';

const TableQuizBtn = ({
  question,
  setUserAnswer,
  setCheck,
  editable
}) => {
  const { dimensions, colors } = useTheme();
  //console.log(question.title);
  return (
    <>
      
      <QuizTitle data={question.title}/>
      <Table
        headers={question.headers}
        rows={question.rows}
        containerStyles={{paddingBottom: 50,width:'100%'}}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <FlatGrid
          data={question.anserSet}
          
          renderItem={({ item, index }) => (

          <Button
          onPress={()=>{
            setUserAnswer(0,item)
            setCheck(true)
          }}
          style={styles.button}
          color="white"
          uppercase={false}
          disabled={!editable}
          >{item}</Button>
          )}
        />
        </View>
    </>
  );
};

const styles = StyleSheet.create({

  button:{
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    paddingTop:7,
    paddingBottom:7,
    backgroundColor:'#841584',
    borderRadius:8,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
TableQuizBtn.defaultProps = {
  editable: true,
};
export default TableQuizBtn;
