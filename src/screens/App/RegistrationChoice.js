import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { SIGNUP, TEACHERSIGNUP } from '../../constants/routeNames';
import teacherImage from '../../assets/img/teacher.jpg';
import person from '../../assets/img/person.png';
import { useTheme } from 'react-native-paper';

const RegistrationChoice = ({ navigation }) => {
  const { colors, dimensions, fonts } = useTheme();

  const imageStyles = {
    width: dimensions.width(90),
    height: dimensions.height(20),
    marginVertical: dimensions.height(5),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Please choose the type of account you want to signup for
      </Text>
      <View>
        <Image
          style={imageStyles}
          source={teacherImage}
          resizeMethod="scale"
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(TEACHERSIGNUP)}
        >
          <Text style={styles.btnText}>Teacher</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image
          style={imageStyles}
          source={person}
          resizeMethod="scale"
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SIGNUP)}
        >
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
            Student
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'purple',
    height: 50,
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  btnText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  img: {
    width: 200,
    height: 200,
  },
});

export default RegistrationChoice;
