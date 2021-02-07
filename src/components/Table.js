import PropTypes, { array } from 'prop-types';
import React,{useState} from 'react';
import theme from '../assets/theme';
import { View, Text, StyleSheet } from 'react-native';
import { Table as InitTable, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import Input from './ShortInput';

const Table = ({
  headers,
  rows,
  containerStyles,
  userAnswer,
  setUserAnswer,
  answerIndex
}) => {
  const { colors, dimensions } = theme;
  const regexp = /^(<input>)(\w+)*$/g;
  answerIndex--;
  
  function input (userAnswer, setUserAnswer, answerIndex, cellData) {
    
    let label = cellData.substring(8);
    return(
    <View style={{padding:5}}>
      <Input
        label={label}
        value={userAnswer[answerIndex]}
        onChangeText={text=>setUserAnswer(answerIndex,text)}
        //keyboardType="my-keypad"
        style={{ width: dimensions.width(30),height:37}}
        leftText={label}
      />
    </View>
  )}

//console.log(userAnswer);
  return (
    <View style={styles.container,{...containerStyles}}>
        <InitTable borderStyle={styles.border}>
          <Row data={headers} style={styles.head} textStyle={styles.text}/>
          {/* <Rows data={rows} textStyle={styles.text}/> */}
          {
            rows.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  
                  rowData.map((cellData, cellIndex) => {

                    if(cellData.match(regexp)){
                      answerIndex++;
                    }
                    return(
                    <Cell 
                      key={cellIndex} 
                      data={cellData.match(regexp) ? input(userAnswer, setUserAnswer, answerIndex, cellData) : cellData} 
                      textStyle={styles.text}
                    />
                  )})
                }
              </TableWrapper>
            ))
          }
        </InitTable>
      </View>
  );
};
const { colors } = theme;
Table.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  answerIndex:PropTypes.number
};

Table.defaultProps = {
  answerIndex:0
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background,width:'100%' },
  head: { height: 40, backgroundColor: colors.lightPurple },
  text: { margin: 6, alignSelf:'center' },
  border:{borderWidth: 2, borderColor: colors.primary},
  row: { flexDirection: 'row'},
})

export default Table;
