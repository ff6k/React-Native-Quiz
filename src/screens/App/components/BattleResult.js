import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Caption, Title } from 'react-native-paper';
//images
import correctImg from '../../../assets/img/good_job_champ.png';
import incorrectImg from '../../../assets/img/ehh_wrong.png';
import WhiteSpace from './WhiteSpace';

const BattleResult = ({ resultList, total }) => (
  <View style={{ ...styles.container }}>
    {resultList && total && resultList.length < total ? (
      <Caption
        style={styles.headline}
      >{`${resultList.length}/${total}`}</Caption>
    ) : null}
    <WhiteSpace size="lg" />
    <View style={styles.result}>
      <View style={styles.resultItem}>
        <Image style={styles.icon} source={correctImg} />
        <WhiteSpace size="md" />
        <Title>{resultList.filter((a) => a).length}</Title>
      </View>
      <View style={styles.resultItem}>
        <Image style={styles.icon} source={incorrectImg} />
        <WhiteSpace size="md" />
        <Title>{resultList.filter((a) => !a).length}</Title>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  headline: {
    alignSelf: 'center',
  },
  result: {
    // flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 40,
  },
  resultItem: {
    alignItems: 'center',
  },
});

export default BattleResult;
