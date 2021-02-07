import React from 'react';
import { Image, View } from 'react-native';
import ButtonAnswer from '../App/components/ButtonAnswer';
import Fraction from '../App/components/Fraction';
import Default from '../App/components/Default';
import Shape from '../App/components/Shape';
import Shape2inputs from '../App/components/Shape2inputs';
import Shape3inputs from '../App/components/Shape3inputs';
import TwoInputs from '../App/components/TwoInputs';
import ThreeInputs from '../App/components/ThreeInputs';
import DynamicInputs from '../App/components/DynamicInputs';
import MixedFraction from '../App/components/MixedFraction';
import EquivFraction from '../App/components/EquivFraction';
import ClockQuiz from '../App/components/ClockQuiz';
import MathjaxQuiz from '../App/components/MathjaxQuiz';
import MathjaxQuiz2 from '../App/components/MathjaxQuiz2';
import MathjaxQuiz3 from '../App/components/MathjaxQuiz3';
import VictoryQuiz from '../App/components/VictoryQuiz';
import VictoryQuiz3 from '../App/components/VictoryQuiz3';
import VictoryQuizBtn from '../App/components/VictoryQuizBtn';
import TableQuiz from '../App/components/TableQuiz';
import TableQuiz2 from '../App/components/TableQuiz2';
import TableQuiz3 from '../App/components/TableQuiz3';
import TableQuizBtn from '../App/components/TableQuizBtn';
import VictoryBarQuiz from '../App/components/VictoryBarQuiz';
import VictoryBar1Quiz from '../App/components/VictoryBar1Quiz';
import VictoryBar3Quiz from '../App/components/VictoryBar3Quiz';
import BoxPlot1Quiz from '../App/components/BoxPlot1Quiz';
import BoxPlot3Quiz from '../App/components/BoxPlot3Quiz';
import InlineInput from '../App/components/InlineInput';
import PieInput1 from '../App/components/PieInput1';

//console.log(this.state)
export const getScreen = (
  questionOb,
  userAnswerSet,
  setUserAnswers,
  setCheck,
  isReview = false,
) => {
  let noDet = false,
    uiComp,
    question = questionOb.question;

  const image = questionOb.image ? questionOb.image : null;

  switch (questionOb.uiComponent) {
    case 'fraction': {
      noDet = questionOb.answer.length < 2;
      uiComp = (
        <Fraction
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          title={questionOb.title}
          noDet={noDet}
          editable={!isReview}
        />
      );
      break;
    }
    case 'buttonAnswer': {
      uiComp = (
        <ButtonAnswer
          question={question}
          setCheck={setCheck}
          setAnswer={setUserAnswers}
          image={image}
          editable={!isReview}
        />
      );
      break;
    }
    case 'shape': {
      uiComp = (
        <Shape
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          image={image}
          editable={!isReview}
        />
      );
      break;
    }
    case 'shape2inputs': {
      uiComp = (
        <Shape2inputs
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          image={image}
          editable={!isReview}
        />
      );
      break;
    }
    case 'shape3inputs': {
      uiComp = (
        <Shape3inputs
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          image={image}
          editable={!isReview}
        />
      );
      break;
    }
    case 'two_inputs': {
      uiComp = (
        <TwoInputs
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          editable={!isReview}
        />
      );
      break;
    }
    case 'three_inputs': {
      uiComp = (
        <ThreeInputs
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          editable={!isReview}
        />
      );
      break;
    }
    case 'dynamic_inputs': {
      uiComp = (
        <DynamicInputs
          question={question}
          userAnswers={userAnswerSet}
          setUserAnswers={setUserAnswers}
          inpuCount={questionOb.inpuCount}
          type={questionOb.type}
          editable={!isReview}
        />
      );
      break;
    }
    case 'mixed-fraction': {
      uiComp = (
        <MixedFraction
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          title={questionOb.title}
          editable={!isReview}
        />
      );
      break;
    }
    case 'equivfraction': {
      uiComp = (
        <EquivFraction
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          title={questionOb.title}
          editable={!isReview}
        />
      );
      break;
    }
    case 'clock': {
      uiComp = (
        <ClockQuiz
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          editable={!isReview}
        />
      );
      break;
    }
    case 'mathjax': {
      uiComp = (
        <MathjaxQuiz
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          editable={!isReview}
        />
      );
      break;
    }
    case 'mathjax2inputs': {
      uiComp = (
        <MathjaxQuiz2
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          editable={!isReview}
        />
      );
      break;
    }
    case 'mathjax3inputs': {
      uiComp = (
        <MathjaxQuiz3
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          editable={!isReview}
        />
      );
      break;
    }
    case 'victory': {
      uiComp = (
        <VictoryQuiz
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          editable={!isReview}
        />
      );
      break;
    }
    case 'victorybtn': {
      uiComp = (
        <VictoryQuizBtn
          question={question}
          userAnswer={userAnswerSet}
          setAnswer={setUserAnswers}
          setCheck={setCheck}
          editable={!isReview}
        />
      );
      break;
    }
    case 'victory3': {
      uiComp = (
        <VictoryQuiz3
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          editable={!isReview}
        />
      );
      break;
    }
    case 'table': {
      uiComp = (
        <TableQuiz
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          editable={!isReview}
        />
      );
      break;
    }
    case 'table2': {
      uiComp = (
        <TableQuiz2
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          editable={!isReview}
        />
      );
      break;
    }
    case 'table3': {
      uiComp = (
        <TableQuiz3
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          editable={!isReview}
        />
      );
      break;
    }
    case 'tablebtn': {
      uiComp = (
        <TableQuizBtn
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          setCheck={setCheck}
          editable={!isReview}
        />
      );
      break;
    }
    case 'victory-bar': {
      uiComp = (
        <VictoryBarQuiz
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          setCheck={setCheck}
          editable={!isReview}
        />
      );
      break;
    }
    case 'victory-bar3': {
      uiComp = (
        <VictoryBar3Quiz
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          setCheck={setCheck}
          editable={!isReview}
        />
      );
      break;
    }
    case 'victory-bar-one': {
      uiComp = (
        <VictoryBar1Quiz
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          setCheck={setCheck}
          editable={!isReview}
        />
      );
      break;
    }
    case 'inlineinput': {
      uiComp = (
        <InlineInput
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          setCheck={setCheck}
          editable={!isReview}
        />
      );
      break;
    }
    case 'boxplot-one': {
      uiComp = (
        <BoxPlot1Quiz
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          setCheck={setCheck}
          editable={!isReview}
        />
      );
      break;
    }
    case 'boxplot-three': {
      uiComp = (
        <BoxPlot3Quiz
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          setCheck={setCheck}
          editable={!isReview}
        />
      );
      break;
    }
    case 'PieInput1': {
      uiComp = (
        <PieInput1
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          setCheck={setCheck}
          editable={!isReview}
        />
      );
      break;
    }
    default: {
      uiComp = (
        <Default
          question={question}
          userAnswer={userAnswerSet}
          setUserAnswer={setUserAnswers}
          editable={!isReview}
        />
      );
      break;
    }
  }

  return uiComp;
};

export const createStars = (count) => {
  let table = [];
  const star = require('../../assets/img/star.png');
  // Outer loop to create parent
  for (let i = 0; i < count; i++) {
    //Create the parent and add the children
    table.push(
      <Image
        key={i}
        source={star}
        style={{ width: 15, height: 15, paddingRight: 1 }}
      />,
    );
  }
  return <View style={{ flexDirection: 'row', top: 10 }}>{table}</View>;
};
