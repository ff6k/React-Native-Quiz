export const messages = {
  success: 'Congratulations!',
  failure: 'Please try once more.',
  empty:
    'You have no scores at this moment. Press the "Take Quiz" button to get started!',
  leaguesEmpty: 'You have no leagues at this moment!',
};

export const QUESTIONS_TYPE = [
  { label: 'Single Question Type', value: 1 },
  { label: 'Multiple Questions Type', value: 2 },
];

// number of qns is fixed
export const NUMBERS = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
];

//Collections

export const NUMBER = 'NUMBER';
export const CALCULATIONS = 'CALCULATIONS';
export const GEOMETRY = 'GEOMETRY';
export const ALGEBRA = 'ALGEBRA';
export const MEASURE = 'MEASURE';
export const STATISTICS = 'STATISTICS';
export const APPLYING = 'APPLYING';
export const EXAM = 'EXAM';

export const COUNTING = 'COUNTING';
export const ODDEVEN = 'ODDEVEN';
export const FRACTION = 'FRACTION';
export const EQUATION = 'EQUATION';
export const RANDOM = 'RANDOM';
export const MULTIPLICATION = 'MULTIPLICATION';
export const SUBTRACTION = 'SUBTRACTION';
export const ADDITION = 'ADDITION';
export const DIVISION = 'DIVISION';
export const MISSINGNUMBER = 'MISSINGNUMBER';
export const ROUNDING = 'ROUNDING';
export const DECNUMBERS = 'DECNUMBERS';
export const NEGNUMBERS = 'NEGNUMBERS';
export const ORDER = 'ORDER';
export const PERCENTAGE = 'PERCENTAGE';

export const MULTTENS = 'MULTTENS';
export const DIVTENS = 'DIVTENS';
export const ORDEROPS = 'ORDEROPS';
export const RATIOS = 'RATIOS';
export const FACTORS = 'FACTORS';
export const SQUARENUM = 'SQUARENUM';
export const CUBENUM = 'CUBENUM';
export const SEQUENCES = 'SEQUENCES';

export const NAMESHAPES = 'NAMESHAPES';
export const EQUIVSHADING = 'EQUIVSHADING';
export const SYMMETRY = 'SYMMETRY';
export const PERIMETER = 'PERIMETER';
export const AREA = 'AREA';
export const VOLUME = 'VOLUME';
export const ANGLES = 'ANGLES';
export const COORDINATES = 'COORDINATES';
export const TRANSFORMATIONS = 'TRANSFORMATIONS';
export const PYTHAGORAS = 'PYTHAGORAS';
export const SIMILARSHAPES = 'SIMILARSHAPES';

export const TIME = 'TIME';
export const MONEY = 'MONEY';
export const UNITC = 'UNITC';

export const SIMPLEFORMULA = 'SIMPLEFORMULA';
export const EVALEXPR = 'EVALEXPR';
export const EXPBRACKETS = 'EXPBRACKETS';
export const SOLVEEQNS = 'SOLVEEQNS';
export const INEQUALITIES = 'INEQUALITIES';
export const FACTORISE = 'FACTORISE';
export const SIMULTANEOUS = 'SIMULTANEOUS';
export const SIMPLIFYALGFRACS = 'SIMPLIFYALGFRACS';
export const LINEARGRAPHS = 'LINEARGRAPHS';

export const STMODE = 'STMODE';
export const STMEDIAN = 'STMEDIAN';
export const STMEAN = 'STMEAN';
export const TIMESERIES = 'TIMESERIES';
export const STRANGE = 'STRANGE';
export const TALLYTABLE = 'TALLYTABLE';
export const PROBABILITY = 'PROBABILITY';
export const DATAANALYSIS = 'DATAANALYSIS';
export const PIECHARTS = 'PIECHARTS';
export const BOXPLOTS = 'BOXPLOTS';

export const CALCULATOR = 'CALCULATOR';
export const PROBLEMSOLVE = 'PROBLEMSOLVE';
export const DRAWSOLVE = 'DRAWSOLVE';

export const KS1 = 'KS1';
export const KS2 = 'KS2';
export const KS3 = 'KS3';
export const KS4 = 'KS4';

export const LEVEL_1 = 'LEVEL_1';
export const LEVEL_2 = 'LEVEL_2';
export const LEVEL_3 = 'LEVEL_3';
export const LEVEL_4 = 'LEVEL_4';
export const LEVEL_5 = 'LEVEL_5';
export const LEVEL_6 = 'LEVEL_6';
export const LEVEL_7 = 'LEVEL_7';
export const LEVEL_8 = 'LEVEL_8';
export const LEVEL_9 = 'LEVEL_9';
export const LEVEL_10 = 'LEVEL_10';
export const LEVEL_11 = 'LEVEL_11';
export const LEVEL_12 = 'LEVEL_12';

export const collictions = [
  {
    label: 'Number',
    value: NUMBER,
    img: require('./../assets/img/number.png'),
  },
  {
    label: 'Calculations',
    value: CALCULATIONS,
    img: require('./../assets/img/calculations.png'),
  },
  {
    label: 'Geometry',
    value: GEOMETRY,
    img: require('./../assets/img/shapeAndSpace.png'),
  },
  {
    label: 'Algebra',
    value: ALGEBRA,
    img: require('./../assets/img/algebra.png'),
  },
  {
    label: 'Applying maths',
    value: APPLYING,
    img: require('./../assets/img/applying.png'),
  },
  {
    label: 'Measure',
    value: MEASURE,
    img: require('./../assets/img/measure.png'),
  },
  {
    label: 'Statistics',
    value: STATISTICS,
    img: require('./../assets/img/handlingData.png'),
  },
  {
    label: 'Exam practice',
    value: 'EXAM',
    img: require('./../assets/img/examPractice.png'),
  },
];

export const starts = [1, 2, 3, 4];
const bonusValue = 1000;
const bonusLimitValue = 250;
export const quizTypes = {
  NUMBER: [
    //{ label: 'Random Arthimetics', value: RANDOM },
    {
      label: 'Odd or even',
      value: ODDEVEN,
      levels: [
        //MY 1
        {
          label: '1 digit',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '2 digits',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Counting',
      value: COUNTING,
      levels: [
        //MY 2-9
        {
          label: 'Count forwards up to 10',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Count forwards up to 100',
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Count backwards up to 10',
          value: LEVEL_3,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Count backwards up to 10',
          value: LEVEL_4,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Count in 2s',
          value: LEVEL_5,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Count in 5s',
          value: LEVEL_6,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Count in 10s',
          value: LEVEL_7,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Numbers in word',
          value: LEVEL_8,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Addition',
      value: ADDITION,
      levels: [
        //MS 1-3
        {
          label: '1 digit',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
          youtubeUrls: [
            {
              title: 'video-1',
              url:
                'https://www.youtube.com/embed/qRBlNl3KUdo?rel=0&autoplay=0&showinfo=0&controls=0',
            },
            {
              title: 'video-2',
              url:
                'https://www.youtube.com/embed/O5FuLZNEq1E?rel=0&autoplay=0&showinfo=0&controls=0',
            },
            {
              title: 'video-3',
              url:
                'https://www.youtube.com/embed/SEAKuerLbsk?rel=0&autoplay=0&showinfo=0&controls=0',
            },
          ],
        },
        {
          label: 'How to make the total?',
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '2 digits',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '3 digits',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Subtraction',
      value: SUBTRACTION,
      levels: [
        //MS 4-6
        {
          label: '1 digit',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '2 digits',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '3 digits',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Multiplications',
      value: MULTIPLICATION,
      levels: [
        //MS 7-9
        {
          label: '1 digit',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '2 digits',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '3 digits',
          value: LEVEL_3,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Division',
      value: DIVISION,
      levels: [
        //MS 10-13
        {
          label: '1 digit',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '3 digits',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '4 digits',
          value: LEVEL_3,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Find the missing ...',
      value: MISSINGNUMBER,
      levels: [
        //MY 10
        {
          label: 'Addition',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Subtraction',
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Multiplication',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Division',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Which sign?',
          value: LEVEL_5,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Rounding',
      value: ROUNDING,
      levels: [
        //MY 10
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Negative Numbers',
      value: NEGNUMBERS,
      levels: [
        //MY 11-15
        {
          label: 'Value of number',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Addition',
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Subtraction',
          value: LEVEL_3,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Multiplication',
          value: LEVEL_4,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Division',
          value: LEVEL_5,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Decimal Numbers',
      value: DECNUMBERS,
      levels: [
        //MS14
        {
          label: 'Place value',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        //MY16-19
        {
          label: 'Addition',
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Subtraction',
          value: LEVEL_3,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Multiplication',
          value: LEVEL_4,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Division',
          value: LEVEL_5,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Order numbers',
      value: ORDER,
      levels: [
        //MS 15-18
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 2',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 3',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 4',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Percentages',
      value: PERCENTAGE,
      levels: [
        //MY 20-21
        {
          label: 'What is a percentage?',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'What is a percentage? Level 2',
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        //MS 19-20
        {
          label: 'Fraction to percentage',
          value: LEVEL_3,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Percentage to fraction',
          value: LEVEL_4,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Fractions',
      value: FRACTION,
      levels: [
        //MS 21-29
        {
          label: 'Simplify 2 digit',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Multiply by 1/2 or 1/4',
          value: LEVEL_9,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Simplify 3 digits',
          value: LEVEL_2,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Equivalent fractions',
          value: LEVEL_10,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Multiplication',
          value: LEVEL_5,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Addition',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Subtraction',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Division',
          value: LEVEL_6,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Improper to Mixed fractions',
          value: LEVEL_7,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Mixed to Improper fractions',
          value: LEVEL_8,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
  ],
  ALGEBRA: [
    //{ label: 'Equation', value: EQUATION },
    {
      label: 'Evaluate expressions',
      value: EVALEXPR,
      levels: [
        //MY 22-24
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 2',
          value: LEVEL_2,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 3',
          value: LEVEL_3,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Simple Formula',
      value: SIMPLEFORMULA,
      levels: [
        //MY25-26
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 2',
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Solve Equations',
      value: SOLVEEQNS,
      levels: [
        //MY27-32
        {
          label: "'+' operation",
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: "'-' operation",
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: "'÷' positive operation",
          value: LEVEL_3,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: "'÷' negative operation",
          value: LEVEL_4,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: "'x' positive operation",
          value: LEVEL_5,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: "'x' negative operation",
          value: LEVEL_6,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: "'+ -' operation",
          value: LEVEL_7,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: "'x' operation",
          value: LEVEL_8,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '2 step operation',
          value: LEVEL_9,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '3 step operation',
          value: LEVEL_10,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '2 step fractions operation',
          value: LEVEL_11,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '3 step fractions operation',
          value: LEVEL_12,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Expand Brackets',
      value: EXPBRACKETS,
      levels: [
        //MS30
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Inequalities',
      value: INEQUALITIES,
      levels: [
        //MY33-36
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 2',
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 3',
          value: LEVEL_3,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 4',
          value: LEVEL_4,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Factorise expressions',
      value: FACTORISE,
      levels: [
        //MY33-36
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 2',
          value: LEVEL_2,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 3',
          value: LEVEL_3,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Simultaneous equations',
      value: SIMULTANEOUS,
      levels: [
        //MY33-36
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Simplify Algebraic Fractions',
      value: SIMPLIFYALGFRACS,
      levels: [
        //MY33-36
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 2',
          value: LEVEL_2,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Linear Graphs',
      value: LINEARGRAPHS,
      levels: [
        //MY33-36
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 2',
          value: LEVEL_2,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 3',
          value: LEVEL_3,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
  ],
  CALCULATIONS: [
    {
      label: 'Multiply by 10s',
      value: MULTTENS,
      levels: [
        //MY 37-40
        {
          label: 'Integers Multiply by 10',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Integers Multiply by 100',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Integers Multiply by bonusValue',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        { label: 'Integers Random 10s', value: LEVEL_4, starts: starts[1] },
        { label: 'Decimals Multiply by 10', value: LEVEL_5, starts: starts[0] },
        {
          label: 'Decimals Multiply by 100',
          value: LEVEL_6,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Decimals Multiply by bonusValue',
          value: LEVEL_7,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Decimals Random 10s',
          value: LEVEL_8,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Divide by 10s',
      value: DIVTENS,
      levels: [
        //MY 41-44
        {
          label: 'Divide by 10',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Divide by 100',
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Divide by bonusValue',
          value: LEVEL_3,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Random 10s',
          value: LEVEL_4,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Order of operations',
      value: ORDEROPS,
      levels: [
        //MY45-46
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 2',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Ratios',
      value: RATIOS,
      levels: [
        //MS31
        {
          label: 'Simplify ratios',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        //MY47-48
        {
          label: 'Use ratios level 1',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Use ratios level 2',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Factors',
      value: FACTORS,
      levels: [
        //MS32-33
        {
          label: 'Factor pairs',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Prime factors',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Prime factor calcs',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Square Numbers',
      value: SQUARENUM,
      levels: [
        //MY49-53
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 2',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 3',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 4',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Cube Numbers',
      value: CUBENUM,
      levels: [
        //MY54-57
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 2',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 3',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 4',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Sequences',
      value: SEQUENCES,
      levels: [
        //MY54-57
        {
          label: 'Increasing',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Decreasing',
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Sequence sums',
          value: LEVEL_3,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
  ],
  GEOMETRY: [
    {
      label: 'Naming Shapes',
      value: NAMESHAPES,
      levels: [
        //MS34-35
        {
          label: '2D Shapes',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '3D Shapes',
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Understanding 2D Shapes',
          value: LEVEL_3,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Understanding 2D Shapes',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Understanding 2D Shapes more',
          value: LEVEL_5,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Understanding 3D Shapes',
          value: LEVEL_6,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Equivalent shading',
      value: EQUIVSHADING,
      levels: [
        //MS36-37
        {
          label: 'Equivalent Shading',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Lines of symmetry',
      value: SYMMETRY,
      levels: [
        //MS36-37
        {
          label: 'Lines of symmetry',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Perimeter',
      value: PERIMETER,
      levels: [
        //MS36-37
        {
          label: 'Rectangle',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Triangle',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        //MY58-59
        {
          label: 'Rectangular 1',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Rectangular 2',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Circle',
          value: LEVEL_5,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Area',
      value: AREA,
      levels: [
        //MS38-39
        {
          label: 'Rectangle',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Triangle',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        //MY40-42
        {
          label: 'Rectangular 1',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Rectangular 2',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Rectangle and Triangle',
          value: LEVEL_5,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Trapezium',
          value: LEVEL_6,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Parallelogram',
          value: LEVEL_7,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Circle',
          value: LEVEL_8,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Volume',
      value: VOLUME,
      levels: [
        {
          label: 'Cuboid',
          value: LEVEL_1,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Triangular Prism',
          value: LEVEL_2,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Cylinder',
          value: LEVEL_3,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Trapezium Prism',
          value: LEVEL_4,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Angles',
      value: ANGLES,
      levels: [
        {
          label: 'Triangles',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Around a point',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Pythagoras',
      value: PYTHAGORAS,
      levels: [
        //MY
        {
          label: 'Calculate hypotenus',
          value: LEVEL_1,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Calculate another side',
          value: LEVEL_2,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Practical 1',
          value: LEVEL_3,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Practical 2',
          value: LEVEL_4,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Practical 3',
          value: LEVEL_5,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Practical 4',
          value: LEVEL_6,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Practical 5',
          value: LEVEL_7,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Practical 6',
          value: LEVEL_8,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Practical 7',
          value: LEVEL_9,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Coordinates',
      value: COORDINATES,
      levels: [
        //MY
        {
          label: '2D Coordinates',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: '3D Coordinates',
          value: LEVEL_2,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Transformations',
      value: TRANSFORMATIONS,
      levels: [
        //MY
        {
          label: 'Basic Transformations',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Reflection Transformations',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Rotation Transformations',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Similar shapes',
      value: SIMILARSHAPES,
      levels: [
        //MY
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 2',
          value: LEVEL_2,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 3',
          value: LEVEL_3,
          starts: starts[3],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
  ],
  MEASURE: [
    {
      label: 'Time',
      value: TIME,
      levels: [
        //MS 40-41
        {
          label: 'Tell the time Level 1',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Tell the time Level 2',
          value: LEVEL_2,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Tell the time Level 3',
          value: LEVEL_3,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Money',
      value: MONEY,
      levels: [
        //MY43-44
        {
          label: 'Level 1',
          value: LEVEL_1,
          starts: starts[0],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 2',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Level 3',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Unit conversion',
      value: UNITC,
      levels: [
        //MY45-47
        {
          label: 'Length',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Weight',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Volume',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
  ],
  STATISTICS: [
    {
      label: 'Mode',
      value: STMODE,
      levels: [
        //MY48-49
        {
          label: 'Data list',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Table data',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Bar chart',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Linear graph',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Median',
      value: STMEDIAN,
      levels: [
        //MYbonusLimitValue-52
        {
          label: 'Data list',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Table data',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Bar chart',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Linear graph',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Box plot',
          value: LEVEL_5,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Mean',
      value: STMEAN,
      levels: [
        //MYbonusLimitValue-52
        {
          label: 'Data list',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Table data',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Bar chart',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Linear graph',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Range',
      value: STRANGE,
      levels: [
        //MYbonusLimitValue-52
        {
          label: 'Data list',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Table data',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Bar chart',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Linear graph',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Box plot',
          value: LEVEL_5,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Boxplots',
      value: BOXPLOTS,
      levels: [
        //MYbonusLimitValue-52
        {
          label: 'Median',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Range',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'IQR',
          value: LEVEL_3,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Median, Range, IQR',
          value: LEVEL_4,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Frequency Tables',
      value: TALLYTABLE,
      levels: [
        //MYbonusLimitValue-52
        {
          label: 'Frequency table',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Probability',
      value: PROBABILITY,
      levels: [
        //MYbonusLimitValue-52
        {
          label: 'Likelihood',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Data analysis',
      value: DATAANALYSIS,
      levels: [
        //MYbonusLimitValue-52
        {
          label: 'Bar chart',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Grouped Bar chart',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Pie Charts',
      value: PIECHARTS,
      levels: [
        //MYbonusLimitValue-52
        {
          label: 'Slice represents?',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Time Series',
      value: TIMESERIES,
      levels: [
        //MYbonusLimitValue-52
        {
          label: 'Moving average',
          value: LEVEL_1,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Read time series',
          value: LEVEL_2,
          starts: starts[2],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
  ],
  APPLYING: [
    {
      label: 'Calculator questions',
      value: CALCULATOR,
      levels: [
        //MS32-33
        {
          label: 'Division',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Multiplication',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Change',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Problem solving',
      value: PROBLEMSOLVE,
      levels: [
        //MS32-33
        {
          label: 'Pocket money',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Think of a number',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Sports cupboard',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Bus timetable',
          value: LEVEL_4,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Sweets',
          value: LEVEL_5,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Bricks',
          value: LEVEL_6,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
    {
      label: 'Draw and solve',
      value: DRAWSOLVE,
      levels: [
        //MS32-33
        {
          label: 'Coins',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Javelin',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
  ],
  EXAM: [
    {
      label: 'Key Stage 1',
      value: KS1,
      levels: [
        //only setup
        {
          label: 'Length',
          value: LEVEL_1,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Weight',
          value: LEVEL_2,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
        {
          label: 'Volume',
          value: LEVEL_3,
          starts: starts[1],
          bonusVal: bonusValue,
          bonusLimit: bonusLimitValue,
        },
      ],
    },
  ],
};
