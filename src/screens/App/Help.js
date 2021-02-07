import React from 'react';
import { Text, View } from 'react-native';

const Help = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>The Help Page</Text>
      <Text>Topics section 
        Coins every question correct
      </Text>
      <Text>Stars</Text>
      <Text>These give indicate level base on UK Key Stage National Curriculum levels, for example 2 stars represents Key Stage 2.</Text>
      <Text>Treasure</Text>
      <Text>Each topic has a limit, say for example its 250. Then on achieving 250 coins on that topic you will unlock the treasure chest and get bonus coins.</Text>
      <Text>Battle</Text>
      <Text>Students can add friends and invite them to join battles. Each correct question in a battle is worth 5 coins and the winner gets 200 bonus points. Winner is the highest number of correct questions. Where there is a joint winner, then the winner is determined by person who completes the battle quiz fastest.</Text>
      <Text>Teachers</Text>
      <Text>Teachers can add students and monitor students progress, setup battle quizes. And use topic question functionality for tutorials and much more.</Text>
    </View>
  );
};

export default Help;
