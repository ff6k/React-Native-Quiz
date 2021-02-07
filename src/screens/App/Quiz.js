import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  LogBox,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import { useTheme, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  Contained as ContainedButton,
  HyperText,
} from "../../components/Button";
import { quizTypes, messages } from "../../constants";
import { SCORE, RENDERYOUTUBE } from "../../constants/routeNames";
import { saveQuiz } from "../../containers/actions/quiz";

import { genQuestion } from "../../utils/quizgen";
import { getScreen } from "../Common";
import Dialog from "./components/Dialog";
import BugDialog from "./components/popup/BugDialog";
import { getMyScore } from "../../containers/actions/quiz";
import { getUsersById } from "../../containers/actions/user";
import Reward from "./components/popup/Reward";
import SoundPlayer from "react-native-sound-player";

import {SketchCanvas} from "@terrylinla/react-native-sketch-canvas";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

const QuizScreen = ({ navigation }) => {
  LogBox.ignoreLogs([
    "VirtualizedLists should never be nested", // TODO: Remove when fixed
    "componentWillReceiveProps has been renamed, and is not recommended for use", // TODO: Remove when fixed
  ]);
  const [check, setCheck] = useState(false);
  const [userFullAnswer, setUserFullAnswer] = useState("");
  const [userAnswerSet, setUserAnswerSet] = useState([]);
  const [show, setShow] = useState(false);
  const [sketchModal, setSketchModal] = useState(false);

  const canvasRef = React.createRef()

  // const [userAnswerA, setUserAnswerA] = useState('');
  // const [userAnswerB, setUserAnswerB] = useState('');
  // const [userAnswerC, setUserAnswerC] = useState('');
  // const [numerator, setNumerator] = useState('');
  // const [denominator, setDenominator] = useState('');
  const [correct, setCorrect] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [visible, setVisible] = useState(false);

  const state = useSelector((state) => state);
  const { quiz } = state;
  let Textdata = [];

  const setUserAnswers = (index, value) => {
    console.log(index + ":" + value);
    Textdata = [...userAnswerSet];
    Textdata[index] = value;
    //console.log('from Q '+Textdata);

    setUserAnswerSet(Textdata);
  };

  const { user: { accName, email } = {} } = state;
  const { quiz: { myScore = [] } = {} } = state;

  //console.log('quiz');
  const [question, setQuestion] = useState(genQuestion(quiz));
  const dispatch = useDispatch();
  const { colors, spacing, dimensions } = useTheme();
  const [answer, setAnswer] = useState();
  const containerStyles = {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.width(),
    backgroundColor: colors.background,
  };

  let scored;
  let levelScore;
  try {
    scored = myScore
      .filter((q) => q.topic == quiz.collection)[0]
      .data.filter((c) => c.subCategory == quiz.type)
      .filter((r) => r.level == quiz.level)[0].score;
  } catch (error) {}

  levelScore = scored ? scored : 0;

  let bonusReward;
  let bonus;
  try {
    bonus = myScore
      .filter((q) => q.topic == quiz.collection)[0]
      .data.filter((c) => c.subCategory == quiz.type)
      .filter((r) => r.level == quiz.level)[0].bonus;
  } catch (error) {}

  bonusReward = bonus ? bonus : 0;

  let bonuspoints;
  const [verifyButton, setVerifyButton] = useState(
    question.uiComponent != "buttonAnswer"
  );
  let bonusVal;
  try {
    bonusVal = quizTypes[quiz.collection]
      .find((q) => q.value === quiz.type)
      .levels.find((r) => r.value === quiz.level).bonusVal;
  } catch (error) {}

  let bonusLimit;
  try {
    bonusLimit = quizTypes[quiz.collection]
      .find((q) => q.value === quiz.type)
      .levels.find((r) => r.value === quiz.level).bonusLimit;
  } catch (error) {}

  const [x, setX] = useState(bonusLimit);
  const [y, setY] = useState(levelScore);
  useEffect(() => {}, []);
  useEffect(() => {
    getMyScore()(dispatch, state);
    setX(bonusLimit);
    setY(levelScore);
  }, [show, showDialog]);
  if (bonusLimit - 1 == levelScore) {
    bonuspoints = bonusVal;
  } else {
    bonuspoints = 0;
  }

  const checkAnswer = () => {
    let newCorrect, newAnswer, newUserAnswer, storeQuestion, sortAnswer;

    sortAnswer = question.sortAnswer ? true : false;
    newCorrect = true;
    const answerStack = [...userAnswerSet];
    if (sortAnswer) {
      answerStack.sort(function (a, b) {
        return a - b;
      });
      question.answer.sort(function (a, b) {
        return a - b;
      });
    }
    question.answer.forEach((element, key) => {
      if (!(element == answerStack[key])) {
        newCorrect = false;
        return;
      }
    });

    //newUserAnswer = [userAnswerA,userAnswerB,userAnswerC].join('/');
    newUserAnswer = userAnswerSet.join("/");
    newUserAnswer = newUserAnswer.replace(/^\/|\/*$/g, "");

    setUserFullAnswer(newUserAnswer);

    newAnswer = question.storeAnswer
      ? question.storeAnswer
      : question.answer.join("/");
    setAnswer(newAnswer);
    storeQuestion = question.storeQuiz;

    saveQuiz({
      userAnswer: newUserAnswer,
      answer: question.answer.join("/"),
      correct: newCorrect,
      question: {
        question: question.question,
        image: question.hasOwnProperty("imageSourceType")
          ? question.imageSourceType
          : "",
        uiComponent: question.uiComponent,
      },
      collection: quiz.collection,
      type: quiz.type,
      level: quiz.level,
      bonuspoints: bonuspoints,
    })(dispatch, state);
    getUsersById("53")(dispatch, state);
    setAnswer(newAnswer);
    setUserFullAnswer(newUserAnswer);
    setCorrect(newCorrect);

    if (levelScore == bonusLimit - 1 && bonusReward == 0 && newCorrect) {
      setShow(true);
      try {
        // play the file tone.mp3
        SoundPlayer.playSoundFile("congratulations", "mp3");
      } catch (e) {
        console.log(`cannot play the sound file`, e);
      }
    } else if (newCorrect) {
      setShowDialog(true);
      try {
        // play the file tone.mp3
        SoundPlayer.playSoundFile("correct", "mp3");
      } catch (e) {
        console.log(`cannot play the sound file`, e);
      }
    } else {
      setShowDialog(true);
      try {
        // play the file tone.mp3
        SoundPlayer.playSoundFile("wrong", "mp3");
      } catch (e) {
        console.log(`cannot play the sound file`, e);
      }
    }
  };
  let starts = [];
  try {
    starts = quizTypes[quiz.collection]
      .find((q) => q.value === quiz.type)
      .levels.find((r) => r.value === quiz.level).starts;
  } catch (error) {}

  const topicName = quiz.collection;
  const subTopic = quiz.type;
  const level = quizLevelTitle;
  const quizQuestion = question.question;

  const hideDialog = () => {
    setShowDialog(false);
    setCheck(false);
    // setDenominator('');
    // setUserAnswerA('');
    // setUserAnswerB('');
    // setUserAnswerC('');
    setUserAnswerSet([]);
    setQuestion(genQuestion(quiz));
  };

  const hideRewardDialog = () => {
    setShow(false);
    setCheck(false);
    // setDenominator('');
    // setUserAnswerA('');
    // setUserAnswerB('');
    // setUserAnswerC('');
    setUserAnswerSet([]);
    setQuestion(genQuestion(quiz));
  };
  const gotoScores = () => {
    hideDialog();
    navigation.navigate(SCORE);
  };
  const handleCancel = () => {
    setVisible(false);
    setShowDialog(true);
  };

  const createStars = (count) => {
    let table = [];
    // Outer loop to create parent
    for (let i = 0; i < count; i++) {
      let children = [];
      //Create the parent and add the children
      table.push(
        <Image
          key={i}
          source={star}
          style={{ width: 50, height: 50, paddingRight: 1 }}
        />
      );
    }
    return table;
  };

  const disabledBtn = false;
  // const disabledBtn =
  //   quiz.type === FRACTION
  //     ? !helpersFn.isValid(undefined, userAnswerA) || !helpersFn.isValid(undefined, userAnswerB)
  //     : !helpersFn.isValid('answer', userAnswerA);

  // useEffect(() => {
  //   setQuestion(genQuestion(quiz));
  // }, [quiz.type]);

  // useEffect(() => {
  //   setQuestion(genQuestion(quiz));
  // }, [quiz.level]);
  useEffect(() => {
    if (check) {
      checkAnswer();
    }
  }, [check, userAnswerSet]);

  let quizLevelTitle = "";
  try {
    quizLevelTitle = quizTypes[quiz.collection]
      .find((q) => q.value === quiz.type)
      .levels.find((r) => r.value === quiz.level).label;
  } catch (error) {}

  let youtubeUrl = [];
  try {
    youtubeUrl = quizTypes[quiz.collection]
      .find((q) => q.value === quiz.type)
      .levels.find((r) => r.value === quiz.level).youtubeUrls;
  } catch (error) {}

  const treasureOpened = require("../../assets/img/treasure_open.png");
  const treasureClosed = require("../../assets/img/treasure_closed.png");
  const gold = require("../../assets/img/gold.png");
  const star = require("../../assets/img/star.png");

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.scrollViewStyle,
        backgroundColor: colors.background,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{flex:1}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "space-between",
          justifyContent: "space-between",
          marginTop: 20,
          width: "80%",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            bonusLimit <= levelScore
              ? Alert.alert(
                  "",
                  `${bonusVal} bonus points already obtained.`,
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                  { cancelable: true }
                )
              : Alert.alert(
                  "",
                  `To get ${bonusVal} bonus coins, you need to get another ${
                    bonusLimit - levelScore
                  } coins from this question type. Currently you have ${levelScore} coins. `,
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                  { cancelable: true }
                )
          }
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={bonusLimit <= levelScore ? treasureOpened : treasureClosed}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image style={styles.img} source={gold} />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{levelScore}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ alignSelf: "center", flexDirection: "row", marginTop: 15 }}
      >
        {createStars(starts)}
      </View>
      <Title style={{ alignSelf: "center" }}>{quizLevelTitle}</Title>
      <TouchableOpacity
        onPress={() => setSketchModal(!sketchModal)}
        style={{
          marginLeft: 30,
          backgroundColor:"rgba(255, 220, 123, 0.4)",
          borderColor: "rgba(255, 205, 66, 0.4)",
          borderRadius: 20,
          borderWidth: 2,
          width: 35,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="edit" size={23} color="#fbbd0f" />
      </TouchableOpacity>
      <View style={containerStyles}>
        {getScreen(question, userAnswerSet, setUserAnswers, setCheck)}
        {verifyButton ? (
          <ContainedButton
            loading={false}
            onPress={checkAnswer}
            title="Submit"
            icon="check-all"
            disabled={disabledBtn}
          />
        ) : null}
        <HyperText
          title="Go to scores!"
          text="Want to check your scores?"
          onPress={() => navigation.navigate(SCORE)}
        />
        <ContainedButton
          loading={false}
          onPress={() => navigation.goBack()}
          title="back"
          style={{ backgroundColor: colors.blue }}
          icon={null}
        />
        <BugDialog
          visible={visible}
          handleCancel={handleCancel}
          setVisible={setVisible}
          userAnswer={`${userFullAnswer}`}
          correctAnswer={`${answer}`}
          topicName={topicName}
          level={quizLevelTitle}
          quizQuestion={quizQuestion}
          subTopic={subTopic}
          setShowDialog={setShowDialog}
          accountName={accName}
          email={email}
        />
        <Dialog
          title={correct ? "Correct answer" : "Incorrect answer"}
          content={
            correct
              ? messages.success
              : `Sorry!\n\nThe correct answer is: ${answer}, yours was: ${userFullAnswer} ${messages.failure}`
          }
          onPressed={() => {
            setShowDialog(false),
              navigation.navigate(RENDERYOUTUBE, {
                type: quiz.type,
                level: quiz.level,
              });
          }}
          onBugReport={() => {
            setVisible(true), setShowDialog(false);
          }}
          actions={[
            { text: "Try again!", onPress: hideDialog },
            { text: "Go to scores!", onPress: gotoScores },
          ]}
          visible={showDialog}
          correct={correct}
          youtubeUrl={youtubeUrl}
        />
        <Reward show={show} hideRewardDialog={hideRewardDialog} />
      </View>
      <View 
        style={{
          width:"100%", 
          height:"100%", justifyContent: "flex-end", padding:5, position:'absolute', bottom:sketchModal?0:-5000}}
        >
          <View style={{ 
            flex:0.65,
            borderWidth: 3, 
            borderColor: 'rgb(160,32,240)', 
            backgroundColor: "rgba(240, 248, 255, 0.7)",
            borderRadius:10,
            }}>
            <TouchableOpacity
              onPress={() => setSketchModal(false)}
              style={{
                backgroundColor:"rgb(160,32,240)",
                width:30,
                height:30,
                position:'absolute',
                top:0,
                right:0,
                zIndex:1,
                borderBottomLeftRadius:10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesignIcon name={'close'} size={23} color="#fff"/>
            </TouchableOpacity>
            <SketchCanvas
              style={{
                flex:1,
              }}
              strokeColor={"black"}
              strokeWidth={2}
              ref={canvasRef}
            />
            <TouchableOpacity
              style={{
                backgroundColor:"rgb(160,32,240)",
                width:30,
                height:30,
                position:'absolute',
                right:0,
                bottom:0,
                borderTopLeftRadius:10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={()=> canvasRef.current.clear()}
            >
                <MaterialCommunityIcon name={'delete'} size={23} color="#fff"/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    flexGrow: 1,
    justifyContent: "center",
  },
  levelTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
});

export default QuizScreen;
