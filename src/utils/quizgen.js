
import * as Number from './index';
import generatcalcs from './calculations';
import generategeometry from './geometry';
import generatemeasure from './measure';
import generatealgebra from './algebracalcs';
import generatestatistics from './statistics';
import generateapplyingmaths from './applyingmaths';
import {
  ODDEVEN,
  COUNTING,
  FRACTION,
  MULTIPLICATION,
  SUBTRACTION,
  ADDITION,
  DIVISION,
  MISSINGNUMBER,
  ROUNDING,
  DECNUMBERS,
  NEGNUMBERS,
  ORDER,
  PERCENTAGE,
  MULTTENS,
  DIVTENS,
  RATIOS,
  FACTORS,
  SQUARENUM,
  CUBENUM,
  SEQUENCES,
  NAMESHAPES,
  EQUIVSHADING,
  SYMMETRY,
  PERIMETER,
  AREA,
  VOLUME,
  ANGLES,
  COORDINATES,
  TRANSFORMATIONS,
  PYTHAGORAS,
  SIMILARSHAPES,
  TIME,
  MONEY,
  UNITC,
  SIMPLEFORMULA,
  EVALEXPR,
  SOLVEEQNS,
  EXPBRACKETS,
  INEQUALITIES,
  FACTORISE,
  SIMULTANEOUS,
  SIMPLIFYALGFRACS,
  LINEARGRAPHS,
  ORDEROPS,
  STMEDIAN,
  STMODE,
  STMEAN,
  STRANGE,
  BOXPLOTS,
  TALLYTABLE,
  PROBABILITY,
  DATAANALYSIS,
  PIECHARTS,
  TIMESERIES,
  CALCULATOR,
  PROBLEMSOLVE,
  DRAWSOLVE,
  quizTypes,
} from '../constants';

export const genQuestion = (quiz) => {
  var question = '';
  var levelNumber = parseInt(quiz.level.split('_')[1], 10);

  switch (quiz.type) {
    case ODDEVEN:
      question = Number.generateOddEven(levelNumber);
      break;
    case COUNTING:
      question = Number.generateCounting(levelNumber);
      break;
    case FRACTION:
      question = Number.generateFractions(levelNumber);
      break;
    case MULTIPLICATION:
      question = Number.generateMultiplications(levelNumber);
      break;
    case SUBTRACTION:
      question = Number.generateSubtractions(levelNumber);
      break;
    case ADDITION:
      question = Number.generateAdditions(levelNumber);
      break;
    case DIVISION:
      question = Number.generateDivisions(levelNumber);
      break;
    case MISSINGNUMBER:
      question = Number.generateMissingNumber(levelNumber);
      break;
    case ROUNDING:
      question = Number.generateRounding(levelNumber);
      break;
    case DECNUMBERS:
      question = Number.generateDecimals(levelNumber);
      break;
    case NEGNUMBERS:
      question = Number.generateNegNumbers(levelNumber);
      break;
    case ORDER:
      question = Number.generateOrderNumbers(levelNumber);
      break;
    case PERCENTAGE:
      question = Number.generatePercentages(levelNumber);
      break;
    case MULTTENS:
      question = generatcalcs.generateMultTens(levelNumber);
      break;
    case DIVTENS:
      question = generatcalcs.generateDivTens(levelNumber);
      break;
    case ORDEROPS:
      question = generatcalcs.generateOrderOps(levelNumber);
      break;
    case RATIOS:
      question = generatcalcs.generateRatios(levelNumber);
      break;
    case FACTORS:
      question = generatcalcs.generateFactors(levelNumber);
      break;
    case SQUARENUM:
      question = generatcalcs.generateSquarNum(levelNumber);
      break;
    case CUBENUM:
      question = generatcalcs.generateCubeNum(levelNumber);
      break;
    case SEQUENCES:
    question = generatcalcs.generateSequences(levelNumber);
      break;
    case NAMESHAPES:
      question = generategeometry.generateNameShapes(levelNumber);
      break;
    case EQUIVSHADING:
      question = generategeometry.generateEquivShading(levelNumber);
      break;
    case SYMMETRY:
      question = generategeometry.generateSymmetry(levelNumber);
      break;
    case PERIMETER:
      question = generategeometry.generatePerimeter(levelNumber);
      break;
    case AREA:
      question = generategeometry.generateArea(levelNumber);
      break;
    case VOLUME:
    question = generategeometry.generateVolume(levelNumber);
      break;
    case ANGLES:
    question = generategeometry.generateAngles(levelNumber);
      break;
    case COORDINATES:
      question = generategeometry.generateCoordinates(levelNumber);
      break;
    case TRANSFORMATIONS:
    question = generategeometry.generateTransformation(levelNumber);
    break;
    case PYTHAGORAS:
    question = generategeometry.generatePythagoras(levelNumber);
    break;
    case SIMILARSHAPES:
      question = generategeometry.generateSimilarshapes(levelNumber);
      break;
    case TIME:
      question = generatemeasure.generateTime(levelNumber);
      break;
    case MONEY:
      question = generatemeasure.generateMoney(levelNumber);
      break;
    case UNITC:
      question = generatemeasure.generateUnitConversion(levelNumber);
      break;
    case SIMPLEFORMULA:
      question = generatealgebra.generateSimpleFormulae(levelNumber);
      break;
    case EVALEXPR:
      question = generatealgebra.generateEvalExpr(levelNumber);
      break;
    case SOLVEEQNS:
      question = generatealgebra.generateSolveEqns(levelNumber);
      break;
    case EXPBRACKETS:
      question = generatealgebra.generateExpBrackets(levelNumber);
      break;
    case INEQUALITIES:
      question = generatealgebra.generateInequalities(levelNumber);
      break;
    case FACTORISE:
      question = generatealgebra.generateFactorise(levelNumber);
      break;
    case SIMULTANEOUS:
      question = generatealgebra.generateSimultaneous(levelNumber);
      break;
    case SIMPLIFYALGFRACS:
      question = generatealgebra.generateSimplifyalgfracs(levelNumber);
      break;
    case LINEARGRAPHS:
      question = generatealgebra.generateLinearGraphs(levelNumber);
    break;
    case STMODE:
      question = generatestatistics.generateMode(levelNumber);
      break;
    case STMEDIAN:
      question = generatestatistics.generateMedian(levelNumber);
      break;
    case STMEAN:
      question = generatestatistics.generateMean(levelNumber);
      break;
    case STRANGE:
      question = generatestatistics.generateStRange(levelNumber);
      break;
    case BOXPLOTS:
      question = generatestatistics.generateBoxPlots(levelNumber);
      break;
    case TALLYTABLE:
      question = generatestatistics.generateTallyTable(levelNumber);
      break;
    case TIMESERIES:
      question = generatestatistics.generateTimeSeries(levelNumber);
      break;
    case PROBABILITY:
      question = generatestatistics.generateProbability(levelNumber);
    break;
    case DATAANALYSIS:
      question = generatestatistics.generateDataAnalysis(levelNumber);
      break;
    case PIECHARTS:
      question = generatestatistics.generatePieCharts(levelNumber);
      break;
    case CALCULATOR:
      question = generateapplyingmaths.generateCalculator(levelNumber);
      break;
    case PROBLEMSOLVE:
      question = generateapplyingmaths.generateProblemSolve(levelNumber);
      break;
    case DRAWSOLVE:
      question = generateapplyingmaths.generateDrawSolve(levelNumber);
      break;
    default:
      question = this.generateOperations();
      break;
  }

  //console.log(question)

  return question;
  // quiz.type === FRACTION
  // ? generateNumbers(2).join(' / ')
  // : quiz.type === MULTIPLICATION?generateMultiplicatios() :generateOperations();
};