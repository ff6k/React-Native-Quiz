import helpers from './helpers';
import { imageSource } from './imageSource';

export const generateCounting = (level = 1) => {
  let returnObject = { question: [], answer: [], uiComponent: 'default' };
  const numbersCount = 1;

  let numberLength = 1;
  let countstep = 1;

  let finds = ['after', 'before'];
  let rand = helpers.oneOrZero();
  let qntype = finds[rand];

  switch (level) {
    case 1:
      qntype = 'after';
      break;
    case 2:
      qntype = 'after';
      numberLength = 2;
      break;
    case 3:
      qntype = 'before';
      break;
    case 4:
      qntype = 'before';
      numberLength = 2;
      break;
    case 5:
      countstep = 2;
      numberLength = 2;
      break;
    case 6:
      countstep = 5;
      numberLength = 2;
      break;
    case 7:
      countstep = 10;
      numberLength = 2;
      break;
    case 8:
      numberLength = 2;
      break;
  }

  const numbers = helpers.generateNumbers(numbersCount, numberLength);
  numbers[0] = Math.max(1 + countstep, numbers[0]);
  if (level < 5) {
    returnObject.question = `What number is ${qntype} ${numbers[0]}?`;
  } else if (level == 8) {
    let wordnum = helpers.toword(numbers[0]);
    returnObject.question = `Type the number ${wordnum}?`;
  } else {
    returnObject.question = `Count in ${countstep}s. What number is ${qntype} ${numbers[0]}?`;
  }
  if (level == 8) {
    returnObject.answer = [numbers[0]];
  } else {
    if (qntype == 'after') {
      returnObject.answer = [numbers[0] + countstep];
    } else {
      returnObject.answer = [numbers[0] - countstep];
    }
  }
  returnObject.storeQuiz = {
    title: returnObject.question,
    content: returnObject.question,
    ui: 'basic',
  };
  return returnObject;
};

export const generateOddEven = (level = 1) => {
  let returnObject = { question: [], answer: [], uiComponent: 'default' };
  let int;
  switch (level) {
    case 1:
       int = helpers.generateNumbers(1, 1);
      break;
    case 2:
       int = helpers.generateNumbers(1, 2);
    break;
      
  }
  

  let finds = ['odd', 'even'];
  let rand = helpers.oneOrZero();
  let oddeven = finds[rand];
  let title = `${int[0]} is an ${oddeven} number, ${'\n'} True or False?`;
  returnObject.question = { title: title, from: ['TRUE', 'FALSE'] };

  if (int[0] % 2 == 0) {
    if (oddeven == 'even') {
      returnObject.answer = ['TRUE'];
    } else {
      returnObject.answer = ['FALSE'];
    }
  } else {
    if (oddeven == 'even') {
      returnObject.answer = ['FALSE'];
    } else {
      returnObject.answer = ['TRUE'];
    }
  }

  returnObject.uiComponent = 'buttonAnswer';

  returnObject.storeQuiz = { title: title, content: title, ui: 'basic', level };
  return returnObject;
};

export const generateMultiplications = (numberLength = 1) => {
  let returnObject = { question: [], answer: [], uiComponent: 'default' };
  const numbersCount = 2;
  const numbers = helpers.generateNumbers(numbersCount, numberLength);
  const operators = ['x'];
  let response = [numbers[0], 'x', numbers[1]];
  // for (let i = 0; i < operators.length; i++)
  //   response.push(` ${operators[i]} ${numbers[i + 1]}`);

  returnObject.question = response.join('');
  returnObject.answer = [numbers[0] * numbers[1]];
  returnObject.storeQuiz = {
    title: returnObject.question,
    content: returnObject.question,
    ui: 'basic',
  };
  return returnObject;
};

export const generateSubtractions = (numberLength = 1) => {
  let returnObject = { question: [], answer: [], uiComponent: 'default' };
  const numbersCount = 2;
  const numbers = helpers.generateNumbers(numbersCount, numberLength);
  let num1 = Math.max(numbers[0], numbers[1]);
  let num2 = Math.min(numbers[0], numbers[1]);
  returnObject.question = num1 + '-' + num2;
  returnObject.answer = [num1 - num2];
  returnObject.storeQuiz = {
    title: returnObject.question,
    content: returnObject.question,
    ui: 'basic',
  };
  return returnObject;
};

export const generateAdditions = (level = 1) => {
  let returnObject = { question: [], answer: [], uiComponent: 'default' };
  let numberLength, item,title;
  switch(level){
    case 1:
      numberLength =1
    break;
    case 2:
      numberLength =1
    break;
    case 3:
      numberLength =2
    break;
    case 4:
      numberLength =3
    break;
    case 5:
      numberLength =4
    break;
  }
  const numbersCount = 2;
  const numbers = helpers.generateNumbers(numbersCount, numberLength);

  if(level ==2){
    var itemoption = [
      ['6',['1+2+3']],
      ['8',['1+3+4']],
      ['10',['1+4+5']],
      ['12',['1+5+6']],
      ['9',['2+3+4']],
      ['11',['2+4+5']],
      ['13',['2+5+6']],
      ['12',['3+4+5']],
      ['14',['3+5+6']],
      ['15',['4+5+6']],      
    ];
    item = itemoption[Math.floor(Math.random() * itemoption.length)];
    returnObject.answer = [item[1]];
    title = `Choose 3 numbers that add up to ${item[0]}?`;
    returnObject.question = {
      title: title,
      from: helpers.shuffle([
        itemoption[0][1],
        itemoption[1][1],
        itemoption[2][1],
        itemoption[3][1],
        itemoption[4][1],
        itemoption[5][1],
        itemoption[6][1],
        itemoption[7][1],
        itemoption[8][1],
        itemoption[9][1],
      ]),
    };
    //below line shange png to item[0].png
    returnObject.image = imageSource[item[0]]; // require(`./../assets/img/questions/${item[0]}.png`)
    returnObject.uiComponent = 'buttonAnswer';
    returnObject.storeQuiz = { title: title, content: title, ui: 'basic' };
    returnObject.imageSourceType = item[0];
  }else{
  returnObject.question = numbers[0] + '+' + numbers[1];
  returnObject.answer = [numbers[0] + numbers[1]];
  returnObject.storeQuiz = {
    title: returnObject.question,
    content: returnObject.question,
    ui: 'basic',
  };
}
  return returnObject;
};

export const generateDivisions = (numberLength = 1) => {
  let returnObject = { question: [], answer: [], uiComponent: 'default' };
  const numbers = helpers.generateNumbers(1, numberLength);
  const denominator = helpers.generateNumbers(1, 1);

  if (denominator[0] < 2) {
    denominator[0] = denominator[0] + 2;
  }
  const numerator = denominator[0] * numbers[0];

  returnObject.question = numerator + '÷' + denominator[0];
  returnObject.answer = [numbers[0]];
  returnObject.storeQuiz = {
    title: returnObject.question,
    content: returnObject.question,
    ui: 'basic',
  };
  return returnObject;
};

export const generateMissingNumber = (level = 1) => {
  let returnObject = { question: [], answer: [], uiComponent: 'inlineinput' };
  const numbersCount = 3;
  let numbers = helpers.generateNumbers(numbersCount, 1);
  let operator,answer,title;
  
  let response

  numbers = numbers.sort(function(a, b){return a-b});
  switch (level) {
    case 1:
      operator = '+';
      answer = numbers[0]+numbers[1]
      break;
    case 2:
      operator = '-';
      answer = numbers[1]-numbers[0]
      break;
    case 3:
    operator = 'x';
    answer = numbers[1]*numbers[0]
    break;
    case 4:
      operator = '÷';
      answer=numbers[1]
      numbers[1] = numbers[1]*numbers[0]
      break;
    case 5:
      var signoption = ['x','-','+','÷'];
      operator = signoption[Math.floor(Math.random() * signoption.length)];
      answer = operator
      numbers[2] = helpers.evalOperation(numbers[1]+operator+numbers[0])
      numbers[2] = +(numbers[2]).toFixed(2)
      title = 'Choose a sign to make calculation correct:'+'\n'+numbers[1]+ ' ? ' +numbers[0]+' = '+numbers[2]
    break;
  }
  if(level<5){
  response = ['<input>', ' ' + operator + ' ', numbers[0],' = ', answer];
  returnObject.question = response;
  returnObject.answer = [numbers[1]];
  returnObject.storeQuiz = {
    title: returnObject.question,
    content: returnObject.question,
    ui: 'basic',
  };
}else{
  returnObject.uiComponent = 'buttonAnswer';
  returnObject.answer = [answer];
  returnObject.question = { title: title, from: signoption };
  returnObject.storeQuiz = { title: title, content: title, ui: 'basic' };

}
  return returnObject;
};

export const generateNegNumbers = (level = 1) => {
  let returnObject = { question: [], answer: [], uiComponent: 'default' };
  const numbersCount = 3;
  let numbers = helpers.generateNumbers(numbersCount, 1);

  let rand = [-1, 1];

  let negsign = rand[helpers.oneOrZero()];
  let negsign2 = rand[helpers.oneOrZero()];
  //use following to get random + or -1
  //operators.push(['*', '/', '+', '-'][Math.floor(Math.random() * 4)]);
  let operator;
  if (level == '2') {
    operator = '+';
    negsign = -1;
    negsign2 = 1;
  } else if (level == '3') {
    operator = '-';
    negsign2 = 1;
  } else if (level == '4') {
    operator = 'x';
  } else if (level == '5') {
    operator = '÷';
    numbers[0] = numbers[1]*numbers[2]
  }

  let negNum1 = negsign * numbers[0];

  let negNum2 = negsign2 * numbers[1];

  if (level > 1) {
    if (negNum1 < 0) {
      negNum1 = '(' + negsign * numbers[0] + ')';
    }
    if (negNum2 < 0) {
      negNum2 = '(' + negsign2 * numbers[1] + ')';
    }

    returnObject.question = negNum1 + operator + negNum2;
    returnObject.answer = [helpers.evalOperation(returnObject.question, 0)];
    returnObject.storeQuiz = {
      title: returnObject.question,
      content: returnObject.question,
      ui: 'basic',
    };
  } else {
    //largest of - 1 and -2
    numbers = [negNum1, negNum2];
    let rand = helpers.oneOrZero();
    returnObject.answer = [
      rand === 1 ? Math.min(...numbers) : Math.max(...numbers),
    ];
    returnObject.uiComponent = 'buttonAnswer';
    let finds = ['larger', 'smaller'];

    let title = 'Click on the ' + finds[rand] + ' number';
    let content = title;
    returnObject.question = { title: title, from: numbers };

    returnObject.storeQuiz = { title: title, content: content, ui: 'basic' };
  }
  return returnObject;
};

export const generateOrderNumbers = (level = 1) => {
  let returnObject = { question: [], answer: [], uiComponent: 'default' };
  const int = Number(helpers.generateNumbers(1, 1));

  let numbersCount = 2;
  let decimalCount = 0;

  switch (level) {
    case 2:
      numbersCount = 2;
      decimalCount = 1;
      break;
    case 3:
      numbersCount = 3;
      decimalCount = 2;
      break;
    case 4:
      numbersCount = 5;
      decimalCount = 4;
      break;
  }

  let numbers = [];
  let decimNumners = helpers.generateDecimalNumbers(
    numbersCount,
    0,
    decimalCount,
  );
if(decimNumners[1]==decimNumners[0]){
  decimNumners[1]=decimNumners[0]+1
}
  for (let i = 0; i < numbersCount; i++) {
    numbers.push(int + Number(decimNumners[i]));
  }
  let finds = ['larger', 'smaller'];
  let rand = helpers.oneOrZero();
  let title = 'Choose ' + finds[rand] + ' number';
  returnObject.question = { title: title, from: numbers };
  returnObject.answer = [
    rand === 1 ? Math.min(...numbers) : Math.max(...numbers),
  ];
  returnObject.uiComponent = 'buttonAnswer';

  let content = title + ' from ' + numbers.join(' , ');

  returnObject.storeQuiz = { title: title, content: content, ui: 'basic' };

  return returnObject;
};

export const generatePercentages = (level = 1) => {
  let returnObject = { question: [], answer: [], uiComponent: 'default' };
  let colorset1 = ['red', 'green'];
  let colorset2 = ['blue', 'yellow'];
  let colorset3 = ['orange', 'black'];
  let itemset = ['balls', 'cars'];

  let color1 = colorset1[helpers.oneOrZero()];
  let color2 = colorset2[helpers.oneOrZero()];
  let color3 = colorset3[helpers.oneOrZero()];
  let itemtype = itemset[helpers.oneOrZero()];

  // show images in UI for above
  // There are 55 red balls, 25 blue balls, 20 orange balls. What percentage is blue balls?
  //Answer is 25

  let set, finder, numbers, balance, find, numbersCount;
  let quize = '';
  switch (level) {
    case 1:
      numbersCount = 1;
      numbers = helpers.generateNumbers(numbersCount, 2);
      balance = eval(100 - numbers[0]);
      finder = Math.floor(Math.random() * 2);
      set = [
        [numbers[0], color1],
        [balance, color2],
      ];

      set.forEach((element, index) => {
        quize += ' ' + element[0] + ' ' + element[1] + ' ' + itemtype + ',';
        if (index == Number(finder)) {
          find = element[1] + ' ' + itemtype;
        }
      });

      quize = quize.replace(/,\s*$/, '');
      //quize = `There are${quize}. What percentage is ${finder}?`

      returnObject.question = `There are${quize}. What percentage is ${find}?`;
      returnObject.answer = [set[finder][0]];
      returnObject.storeQuiz = {
        title: `There are${quize}.`,
        content: returnObject.question,
        ui: 'basic',
      };
      break;
    case 2:
      numbersCount = 2;
      numbers = helpers.generateNumbers(numbersCount, 2);
      while (eval(numbers[0] + numbers[1]) > 98) {
        numbers = helpers.generateNumbers(numbersCount, 2);
      }
      balance = eval(100 - numbers[0] - numbers[1]);
      set = [
        [numbers[0], color1],
        [numbers[1], color2],
        [balance, color3],
      ];
      finder = Math.floor(Math.random() * 3);

      set.forEach((element, index) => {
        quize += ' ' + element[0] + ' ' + element[1] + ' ' + itemtype + ',';
        if (index == Number(finder)) {
          find = element[1] + ' ' + itemtype;
        }
      });

      quize = quize.replace(/,\s*$/, '');
      //quize = `There are${quize}. What percentage is ${finder}?`

      returnObject.question = `There are${quize}. What percentage is ${find}?`;
      returnObject.answer = [set[finder][0]];
      returnObject.storeQuiz = {
        title: `There are${quize}.`,
        content: returnObject.question,
        ui: 'basic',
      };
      break;
    case 3:
      numbersCount = 2;
      numbers = helpers.generateNumbers(numbersCount, 1);
      numbers[0] = Math.max(numbers[0], 2);
      numbers[1] = Math.max(numbers[1], 2);
      numbers[1] = numbers[0] * numbers[1];
      returnObject.answer = [
        +(eval((numbers[0] / numbers[1]) * 100)).toFixed(2),
      ];
      //Write  3/4 as a percentage
      //returnObject.question = ('Write ' + numbers[0] + '/' + numbers[1] + ' as a percentage')
      returnObject.question = [
        {
          key: 'text',
          value: 'Write the following as a percentage, to 2 decimal places',
        },
        { key: 'factor', value: [{ num: numbers[0], det: numbers[1] }] },
      ];
      returnObject.storeQuiz = {
        title: 'Write the following as a percentage',
        content: returnObject.question,
        ui: 'basic',
      };
      //response = {set:[[numbers[0],color1] , [numbers[1],color2] , [balance,color3]], object: itemtype , find:Math.floor(Math.random() * 3)};
      break;
    case 4:
      numbersCount = 1;
      numbers = helpers.generateNumbers(numbersCount, 2);
      numbers[0] = Math.max(numbers[0], 2);
      //Write 25% as a faction
      returnObject.question = []; //('Write ' + numbers[0] + ' as a faction')
      returnObject.answer = helpers.simplify(numbers[0], 100);
      returnObject.title = 'Write ' + numbers[0] + '% as a faction';
      returnObject.uiComponent = 'fraction';
      returnObject.storeQuiz = {
        title: returnObject.title,
        content: returnObject.title,
        ui: 'fraction-answer',
      };

      //response = {set:[[numbers[0],color1] , [numbers[1],color2] , [balance,color3]], object: itemtype , find:Math.floor(Math.random() * 3)};
      break;
  }

  return returnObject;
};

export const generateFractions = (level = 1) => {
  let returnObject = { question: [], answer: [], uiComponent: 'default' };
  const numberLength = 1;
  const numbersCount = 2;
  const numbers = helpers.generateNumbers(numbersCount, numberLength);

  let operator, quotient, remainder, answerint;
  let answernumerator;
  let answerdenominator;
  let multiplier = helpers.generateNumbers(1, 2);
  let rand = [-1, 1];
  let negsign = rand[helpers.oneOrZero()];
  numbers[0] = negsign * numbers[0];
  let storeTitle = '';

  const numbersb = helpers.generateNumbers(numbersCount, numberLength);

  numbersb[0] = numbersb[0];
  numbersb[1] = Math.max(numbersb[1], 1);

  switch (level) {
    case 3:
      operator = '+';
      [answernumerator, answerdenominator] = helpers.simplify(
        numbers[0] * numbersb[1] + numbers[1] * numbersb[0],
        numbers[1] * numbersb[1],
      );

      returnObject.answer = [answernumerator, answerdenominator];
      returnObject.question = [
        { num: numbers[0], det: numbers[1] },
        operator,
        { num: numbersb[0], det: numbersb[1] },
      ];
      storeTitle =
        numbers[0] +
        '/' +
        numbers[1] +
        operator +
        numbersb[0] +
        '/' +
        numbersb[1];
      returnObject.uiComponent = 'fraction';
      returnObject.title = 'Solve following in simplest form';
      break;
    case 4:
      operator = '-';
      [answernumerator, answerdenominator] = helpers.simplify(
        numbers[0] * numbersb[1] - numbers[1] * numbersb[0],
        numbers[1] * numbersb[1],
      );
      returnObject.answer = [answernumerator, answerdenominator];
      returnObject.question = [
        { num: numbers[0], det: numbers[1] },
        operator,
        { num: numbersb[0], det: numbersb[1] },
      ];
      storeTitle =
        numbers[0] +
        '/' +
        numbers[1] +
        operator +
        numbersb[0] +
        '/' +
        numbersb[1];
      returnObject.uiComponent = 'fraction';
      returnObject.title = 'Solve following in simplest form';
      break;
    case 5:
      operator = 'x';
      [answernumerator, answerdenominator] = helpers.simplify(
        numbers[0] * numbersb[0],
        numbers[1] * numbersb[1],
      );

      returnObject.answer = [answernumerator, answerdenominator];
      returnObject.question = [
        { num: numbers[0], det: numbers[1] },
        operator,
        { num: numbersb[0], det: numbersb[1] },
      ];
      storeTitle =
        numbers[0] +
        '/' +
        numbers[1] +
        operator +
        numbersb[0] +
        '/' +
        numbersb[1];
      returnObject.uiComponent = 'fraction';
      returnObject.title = 'Solve following in simplest form';
      break;
    case 6:
      operator = '÷';
      [answernumerator, answerdenominator] = helpers.simplify(
        numbers[0] * numbersb[1],
        numbers[1] * numbersb[0],
      );

      returnObject.answer = [answernumerator, answerdenominator];
      returnObject.question = [
        { num: numbers[0], det: numbers[1] },
        operator,
        { num: numbersb[0], det: numbersb[1] },
      ];
      storeTitle =
        numbers[0] +
        '/' +
        numbers[1] +
        operator +
        numbersb[0] +
        '/' +
        numbersb[1];
      returnObject.uiComponent = 'fraction';
      returnObject.title = 'Solve following in simplest form';
      break;
    case 7:
      numbers[1]=Math.abs(numbers[1])+1;  
      numbers[0]=Math.abs(numbers[0])+1+numbers[1];
      numbers[0]=10
      numbers[1]=5   
      quotient = Math.floor(numbers[0] / numbers[1]);
      remainder = numbers[0] % numbers[1];
      // [answerint, answernumerator, answerdenominator] = [
      //   quotient,
      //   helpers.simplify(remainder, numbers[1]),
      // ];

      returnObject.answer = [quotient, ...helpers.simplify(remainder, numbers[1])];
      // console.log(returnObject.answer)
      returnObject.question = [{ num: numbers[0], det: numbers[1] }];
      storeTitle = numbers[0] + '/' + numbers[1];
      returnObject.uiComponent = 'mixed-fraction';
      returnObject.title = 'Write in mixed fraction';
      break;
    case 8:
      numbers[0]=Math.abs(numbers[0]);
      numbers[1]=Math.abs(numbers[1]);
      [answernumerator, answerdenominator] = helpers.simplify(
        Math.max(numbers[0], numbers[1]),
        Math.min(numbers[0], numbers[1]),
      );
      quotient = Math.floor(answernumerator / answerdenominator);
      remainder = answernumerator % answerdenominator;
      let qnint, qnnumerator, qndenominator;
      [qnint, qnnumerator, qndenominator] = [
        quotient,
        ...helpers.simplify(remainder, answerdenominator),
      ];

      returnObject.answer = [answernumerator, answerdenominator];
      returnObject.question = [quotient, { num: qnnumerator, det: qndenominator }];
      storeTitle = quotient + qnnumerator + '/' + qndenominator;
      returnObject.uiComponent = 'fraction';
      returnObject.title = 'Write in improper fraction';
      break;
    case 9:
      operator = 'x';
      numbers[0] = 1;
      numbers[1] = 2;
      let finds = [2, 4];
      let rand = helpers.oneOrZero();
      numbers[1] = finds[rand];
      numbersb[0] = numbersb[0] * numbers[1];
      numbersb[1] = 1;
      [answernumerator, answerdenominator] = helpers.simplify(
        numbers[0] * numbersb[0],
        numbers[1] * numbersb[1],
      );

      returnObject.answer = [answernumerator];
      returnObject.question = [
        { num: numbers[0], det: numbers[1] },
        operator,
        numbersb[0],
      ];
      storeTitle = numbers[0] + '/' + numbers[1] + operator + numbersb[0];
      returnObject.uiComponent = 'fraction';
      returnObject.title = 'Solve following in simplest form';
      break;
    case 10:
      operator = '=';
      multiplier = Math.max(2, helpers.generateNumbers(1, 1));
      
      var qntypes = ['num', 'den'];
      let qntype = qntypes[Math.floor(Math.random() * qntypes.length)];

      if (qntype == 'num') {
        returnObject.answer = [multiplier * numbers[0]];
        returnObject.question = [
          { num: numbers[0], det: numbers[1] },
          operator,
          { num: '<input>', det: numbers[1] * multiplier },
        ];
        storeTitle =
          numbers[0] +
          '/' +
          numbers[1] +
          operator +
          numbersb[0] +
          '/' +
          numbersb[1];
      } else {
        
        returnObject.answer = [multiplier * numbers[1]];
        returnObject.question = [
          { num: numbers[0], det: numbers[1] },
          operator,
          { num: numbers[0] * multiplier, det: '<input>' },
        ];
        storeTitle =
          numbers[0] +
          '/' +
          numbers[1] +
          operator +
          numbersb[0] +
          '/' +
          numbersb[1];
      }

      returnObject.uiComponent = 'equivfraction';
      returnObject.title = 'Fill in the missing number';
      break;

    default:
      multiplier = helpers.generateNumbers(1, level);
      numbers[0] = eval(numbers[0] * Math.max(multiplier[0], 2));
      numbers[1] = eval(Math.max(numbers[1], 1) * Math.max(multiplier[0], 2));

      returnObject.answer = helpers.simplify(numbers[0], numbers[1]);

      returnObject.question = [{ num: numbers[0], det: numbers[1] }];
      //response = { 'quiz': [{ 'num': numbers[0], 'det': numbers[1] }], 'answer': { 'num': answernumerator, 'det': answerdenominator } };
      storeTitle = numbers[0] + '/' + numbers[1];

      returnObject.uiComponent = 'fraction';
      returnObject.title = 'Solve following in simplest form';
      break;
  }

  returnObject.storeQuiz = {
    title: storeTitle,
    content: returnObject.question,
    ui: 'fraction',
  };
  return returnObject;
};

export const generateRounding = (level = 1) => {
  const numberLength = 2;
  const numbersCount = 2;
  const decimalplaces = 4;
  const numbers = helpers.generateDecimalNumbers(
    numbersCount,
    numberLength,
    decimalplaces,
  );
  let returnObject = { question: [], answer: [], uiComponent: 'default' };
  let roundby;
  var roundoption = [1, 2, 3];
  roundby = roundoption[Math.floor(Math.random() * roundoption.length)];
  returnObject.answer = [helpers.round(numbers[0], roundby)];
  returnObject.question = `Round: ${numbers[0]} to ${roundby} decimal places`;
  returnObject.storeQuiz = {
    title: returnObject.question,
    content: returnObject.question,
    ui: 'default',
  };
  return returnObject;
};

export const generateDecimals = (level = 1) => {
  let numberLength = 1;
  let numbersCount = 2;
  let decimalCount = 2;
  let decimNumbers = helpers.generateDecimalNumbers(
    numbersCount,
    numberLength,
    decimalCount,
  );
  let decimNumbersmult = helpers.generateDecimalNumbers(numbersCount, 1, 1);
  let multiplier = helpers.generateNumbers(1, numberLength);
  let answer, roundby;
  let question1;
  let question2;
  let operator;

  let returnObject = { question: [], answer: [], uiComponent: 'default' };
  switch (level) {
    case 1:
      decimNumbers = helpers.generateDecimalNumbers(numbersCount, 1, 4);
      var roundoption = [
        ['unit', -1],
        ['tenth', 1],
        ['hundredth', 2],
        ['thousandth', 3],
      ];
      roundby = roundoption[Math.floor(Math.random() * roundoption.length)];
      let digits = '' + decimNumbers[0] + '';
      let decimalpos = digits.indexOf('.');
      let endpos = eval(decimalpos + '+' + roundby[1]);
      answer = digits.substring(decimalpos + roundby[1], endpos + 1);
      returnObject.question = `What is the ${roundby[0]} value of ${decimNumbers[0]} ?`;
      break;
    case 2:
      operator = '+';
      [question1, question2] = [decimNumbers[0], decimNumbers[1]];
      answer = helpers.roundNumber(question1 + question2);
      returnObject.question = question1 + operator + question2;
      break;
    case 3:
      operator = '-';
      [question1, question2] = [decimNumbers[0], decimNumbers[1]];
      answer = helpers.roundNumber(question1 - question2);
      returnObject.question = question1 + operator + question2;
      break;
    case 4:
      operator = 'x';
      [question1, question2] = [decimNumbersmult[0], decimNumbersmult[1]];
      answer = helpers.roundNumber(question1 * question2);
      returnObject.question = question1 + operator + question2;
      break;
    case 5:
      operator = '÷';
      [question1, question2] = [decimNumbers[0] * multiplier, multiplier];
      returnObject.question = question1 + operator + question2;
      answer = decimNumbers[0];
      break;
  }
  returnObject.answer = [answer];
  returnObject.storeQuiz = {
    title: returnObject.question,
    content: returnObject.question,
    ui: 'default',
  };
  console.log(returnObject.question)
  return returnObject;
};

exports.decToFraction = (decimal = 0.3435) => {
  let gcd = (a, b) => (b < 0.0000001 ? a : gcd(b, Math.floor(a % b)));
  let len = decimal.toString().length - 2;
  let denominator = Math.pow(10, len);
  let numerator = decimal * denominator;
  let divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;
  return Math.floor(numerator) + '/' + Math.floor(denominator);
};

export const getStarStarts = (collection, type, level) => {
  return collection
    .find((q) => q.value === type)
    .levels.find((r) => r.value === level).starts;
};
