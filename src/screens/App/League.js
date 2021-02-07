import React, { useEffect, useState } from 'react';
import { FlatList, View, RefreshControl, StyleSheet } from 'react-native';
import { List, Title, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import {Contained} from '../../components/Button';
//import Selecter from '../../components/Selecter';
import MyDropDown from '../../components/MyDropDown';
import { getTop } from '../../containers/actions/quiz';
import LeagueItem from './components/LeagueItem';
import {collictions} from './../../constants/index';
import { messages } from '../../constants';
import WhiteSpace from './components/WhiteSpace';


const League = ({ navigation: { navigate } }) => {

  const theme = useTheme();
  const { colors, dimensions } = theme;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { quiz: { top = [], isFetching } = {} } = state;
  const [selectedValue, setSelectedValue] = useState("ALL");
  const [showSelecter,setShowSelecter]=useState(false);

  let topics = [...collictions];
  //set all value to selecter
  let tmp = topics.find(q => q.value === "ALL");
  if(tmp==null){
    topics.unshift({label:"All",value:"ALL"});
  }

  const fetchTop = () => {
    getTop(selectedValue)(dispatch, state);
  };
  useEffect(fetchTop, []);

  useEffect(() => {
    fetchTop();
  }, [selectedValue]);

  const Refreshing = (
    <RefreshControl
      refreshing={isFetching}
      onRefresh={fetchTop}
      title={'Refreshing quizes list'}
      tintColor={colors.primary}
      titleColor={colors.primary}
    />
  );

  const Footer = (
    <Title
      style={{
        alignSelf: 'center',
        marginBottom: dimensions.height(10),
        color: colors.backdrop,
        fontStyle: 'italic',
      }}
    >
      
    </Title>
  );

  return (
    <>
      <Contained 
        title="Other Leagues"
        onPress={()=>setShowSelecter(!showSelecter)}
        icon={null}
        style={{paddingHorizontal: 0,backgroundColor:colors.accent}}
      />
      {showSelecter?
      <View style={styles.container}>
      <MyDropDown
          label={'Question Types'}
          value={selectedValue}
          setValue={itemValue => setSelectedValue(itemValue)}
          list={topics}
        />
        </View>
      :null}
      {isFetching ? (
        <Loading text="Fetching league list" />
      ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <List.Subheader>
            League list sorted by the most scores
          </List.Subheader>
          <FlatList
            data={top}
            keyExtractor={(_, index) => String(index)}
            showsVerticalScrollIndicator={false}
            refreshControl={Refreshing}
            renderItem={(props) => <LeagueItem {...props} theme={theme} />}
            ListFooterComponent={Footer}
            ListEmptyComponent={<Empty message={messages.leaguesEmpty}/>}
          />
    </View>
      )}
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
    // height:10,
    // borderWidth:1
  },
});

export default League;
