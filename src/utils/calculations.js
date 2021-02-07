import helpers from './helpers'

exports.generateMultTens = (
  level = 1,
) => {
  let  returnObject = { question: [], answer: [], uiComponent: 'default' }
  let multiplier;
  let numbers = helpers.generateDecimalNumbers(1, 1,4);
 
  switch (level) {
    case 1:
      numbers = helpers.generateNumbers(1, 1);
      multiplier = 10;
      break;
    case 2:
      numbers = helpers.generateNumbers(1, 1);
      multiplier = 100;
      break;
    case 3:
      numbers = helpers.generateNumbers(1, 1);
      multiplier = 1000;
      break;
    case 4:
      numbers = helpers.generateNumbers(1, 1);
      var itemoption = [10,100,1000];
      multiplier = itemoption[Math.floor(Math.random() * itemoption.length)];
    break;
    case 5:
      multiplier = 10;
      break;
    case 6:
      multiplier = 100;
      break;
    case 7:
      multiplier = 1000;
      break;
    case 8:
      var itemoption = [10,100,1000];
      multiplier = itemoption[Math.floor(Math.random() * itemoption.length)];
    break;
    
  }
  let response = [numbers[0], 'x', multiplier];
  returnObject.question = response.join('');
  returnObject.answer = [(numbers[0] * multiplier)];
  returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
  return returnObject
};

exports.generateDivTens = (
  level = 1,
  ) => {
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    let multiplier;
    const numbers = helpers.generateDecimalNumbers(1, 1,4);
   
    switch (level) {
      case 1:
        multiplier = 10;
        break;
      case 2:
        multiplier = 100;
        break;
      case 3:
        multiplier = 1000;
        break;
      case 4:
        var itemoption = [10,100,1000];
        multiplier = itemoption[Math.floor(Math.random() * itemoption.length)];
      break;
      
    }
    let response = [numbers[0], '÷', multiplier];
    returnObject.question = response.join('');
    returnObject.answer = [(numbers[0] / multiplier)];
    returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
    return returnObject
};

exports.generateOrderOps = (
    level = 1,
  ) => {
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    const numbersCount = 6;
    const numbers = helpers.generateNumbers(numbersCount, 1);
    
    let response;
    var itemoption = [ ' ÷ ', ' x '];
    let sign1 = itemoption[Math.floor(Math.random() * itemoption.length)];
    let sign3 = itemoption[Math.floor(Math.random() * itemoption.length)];
    var itemoption2 = [ ' + ', ' - '];
    let sign2 = itemoption2[Math.floor(Math.random() * itemoption2.length)];
    let sign5 = itemoption2[Math.floor(Math.random() * itemoption2.length)];
    var itemoption3 = [ ' + ', ' - ',' ÷ ', ' x '];
    let sign4 = itemoption3[Math.floor(Math.random() * itemoption3.length)];
    numbers[1] = Math.max(2,numbers[1]);
    numbers[3] = Math.max(2,numbers[3]);
    numbers[5] = Math.max(2,numbers[5]);
      switch (level) {
        case 1:
          response = (sign1==' ÷ '?numbers[0]*numbers[1]:numbers[0])  + sign1 + numbers[1] + sign2 + (sign3==' ÷ '?numbers[2]*numbers[3]:numbers[2])  + sign3 + numbers[3] ;
          break;
        case 2:
          response = (sign1==' ÷ '?numbers[0]*numbers[1]:numbers[0])  + sign1 + numbers[1] + sign2 + (sign3==' ÷ '?numbers[2]*numbers[3]:numbers[2])  + sign3 + numbers[3] + sign5 +'(' + (sign4==' ÷ '?numbers[4]*numbers[5]:numbers[4])  + sign4 + numbers[5] + ')' ;
          break;

      }
      
    returnObject.question= response;
    returnObject.answer= [1];
    returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
    return returnObject
  };

exports.generateRatios = (
    level = 1,
  ) => {
    const numberLength = 1;
    const numbersCount = 2;
    let  returnObject = { question: [], answer: [], uiComponent: 'two_inputs' }
    let numbers = helpers.generateNumbers(numbersCount, numberLength);

    let colorset1 = ['red', 'green'];
    let colorset2 = ['blue', 'yellow'];
    let itemset = ['balls', 'cars']
    // There are 4 red and 2 blue cars
  
    let color1 = colorset1[helpers.oneOrZero()];
    let color2 = colorset2[helpers.oneOrZero()];
    let itemtype = itemset[helpers.oneOrZero()];
    //show images as above
    //ask user to fill ratio of red to blue cars
    // [2 ] : [1 ]
    let total,ratio,find;
    switch (level) {
      case 1:
        
        
        numbers[0] = Math.max(2,numbers[0]);
        var multoption = [4,5,7,8,9];
        let multby;
         multby = multoption[Math.floor(Math.random() * multoption.length)];
         numbers[1] = numbers[0]*multby;
        
    
        
        let response = `There are ${numbers[0]} ${color1} and ${numbers[1]} ${color2} ${itemtype}. Write the lowest ratio:`;
        let answer = helpers.simplify(numbers[0],numbers[1]);

        returnObject.storeQuiz = {title:response,content:response,ui:'basic'};
        returnObject.question = {rightTexts:[' :'],leftTexts:[],text:response}
        returnObject.answer = answer
      break;
      case 2:
        returnObject.uiComponent='default'
        total = Math.max(2,helpers.generateNumbers(1, 1));
        numbers[0] = Math.max(2,numbers[0]);
        numbers[1] = Math.max(3,numbers[1]);
        ratio = helpers.simplify(numbers[0],numbers[1])
        find = helpers.oneOrZero()
        total = (find==0?ratio[0]:ratio[1])*total
        response = `The ratio of ${color1} to ${color2} ${itemtype} is ${ratio[0]}:${ratio[1]}. If I have ${total} ${find==0?color1:color2} ${itemtype}. How many ${find==0?color2:color1} ${itemtype} do I have?`
        
        answer = [total/(find==0?ratio[0]:ratio[1])*(find==0?ratio[1]:ratio[0])];

        returnObject.storeQuiz = {title:response,content:response,ui:'basic'};
        returnObject.question = response
        returnObject.answer = answer
      break;
      case 3:
        returnObject.uiComponent='default'
        total = Math.max(2,helpers.generateNumbers(1, 1));
        numbers[0] = Math.max(2,numbers[0]);
        numbers[1] = Math.max(3,numbers[1]);
        ratio = helpers.simplify(numbers[0],numbers[1])
        find = helpers.oneOrZero()
        total = (total * (ratio[0] + ratio[1]));
        response = `The ratio of ${color1} to ${color2} ${itemtype} is ${ratio[0]}:${ratio[1]}. If I have total of ${total} ${itemtype}. How many ${find==0?color1:color2} ${itemtype} do I have?`
        
        answer = [total/(ratio[0]+ratio[1])*(find==0?ratio[0]:ratio[1])];

        returnObject.storeQuiz = {title:response,content:response,ui:'basic'};
        returnObject.question = response
        returnObject.answer = answer
        break;
      
    }
    
    return returnObject;
  };

  exports.generateFactors = (
    level = 1,
  ) => {
    let  returnObject = { question: [], answer: [], uiComponent: 'dynamic_inputs',sortAnswer:true },number
    let num1, num2, response;
    num1 = helpers.generateNumbers(1, 1);
    num2 = helpers.generateNumbers(1, 1);
    number = num1*num2;
    //const question = Numbers[0] * Numbers[1] * Numbers[2] * Numbers[3];
    switch (level) {
      case 1:
        //List the factor pairs of:
  
        let factors = number => Array
          .from(Array(number + 1), (_, i) => i)
          .filter(i => number % i === 0);
  
        let facters = factors(number);
        //console.log(facters);
        let answer =[];
        let storeAns = [];
        for(let i=0;i<facters.length/2;i++){
          answer.push(facters[i],facters[facters.length-1-i]);
          storeAns.push(`{${facters[i]},${facters[facters.length-1-i]}}`);
        }

        //console.log(answer);

        //answer = [{factors(0),factors(n)},  {factors(1),factors(n-1)}];
        //console.log(factors(number));      //  [1, 2, 3, 4, 6, 9, 12, 18, 36]
        //answer = [{1,36},{2,18},{3,12},{4,9},{6,6}]
        //frontend show 5 box pairs i.e. 10 individual boxes 
        returnObject.question = `List the factor pairs of: ${number}`;
        returnObject.inpuCount = answer.length/2;
        returnObject.answer = answer
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'};
        returnObject.storeAnswer = storeAns.join(',');
        returnObject.type = 1;
        break;
      case 2:
        function primeFactors(number){
          let factors=[];
          while(number % 2 == 0) 
          { 
            //console.log(2); 
            factors.push(2);
            number = number / 2; 
          }

          //Math.sqrt()

          for (var i = 3; i <= Math.sqrt(number); i = i + 2) 
          { 
            
             
            while (number % i == 0) 
            { 
              //console.log(i);
              factors.push(i);
              number = number / i; 
            } 
          }

          if (number > 2) 
          //console.log(number);
          factors.push(number);
          return factors;
        }
        number = helpers.generateNumbers(1, 2)[0];
        returnObject.answer = primeFactors(number);
        returnObject.question = `List the prime factor of: ${number}`;
        returnObject.inpuCount = returnObject.answer.length;
        //returnObject.answer = answer
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'};
        returnObject.storeAnswer = returnObject.answer.join(',');
        returnObject.type = 2;
        //primenumbers = primfactors(30);
        //primenumbers = 1,2,3,5,...
        //qn show like [] x [] x[] ... for number of items in array
        break;
      case 3:
        returnObject.uiComponent = 'two_inputs'
        var itemoption = [2,3,5,7,11];
        num1 = itemoption[Math.floor(Math.random() * itemoption.length)];
        num2 = itemoption[Math.floor(Math.random() * itemoption.length)];
        answer = [num1,num2];
        number = num1*num2;
         response = `Which prime numbers complete these sums`;
        returnObject.storeQuiz = {title:response,content:response,ui:'basic'};
        returnObject.question = {rightTexts:[' x ',` = ${number}`],leftTexts:[],text:response}
        returnObject.answer = answer
      break;
    }
  
    
    return returnObject;
  };

  exports.generateSquarNum = (
    level = 1,
  ) => {
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    let qnnum,qnnuma,qnnumb;
    let Numbers = helpers.generateNumbers(2, 1);
    let response,answer;
    switch (level) {
      case 1:
        response = `What is ${Numbers[0]}^{2} ?`;
        answer = ( Numbers[0]*Numbers[0]);
        returnObject.answer = [answer];
    
        returnObject.storeQuiz = {title:response,content:response,ui:'default'};
        returnObject.question = response
        break;
      case 2:
        let sqnum;
        sqnum =  Numbers[0]* Numbers[0];
        response = `Find the number that multiplies by itself to give ${sqnum} ?`;
        answer = Numbers[0];
        returnObject.answer = [answer];
    
        returnObject.storeQuiz = {title:response,content:response,ui:'default'};
        returnObject.question = response

        break;
      case 3:
       sqnum;
      sqnum =  Numbers[0]* Numbers[0]*100;
      response = `Find the number that multiplies by itself to give ${sqnum} ?`;
      answer = Numbers[0]*10;
      returnObject.answer = [answer];
  
      returnObject.storeQuiz = {title:response,content:response,ui:'default'};
      returnObject.question = response

      break;
      case 4:
        returnObject.sortAnswer = true 
        returnObject.uiComponent = 'two_inputs'
        let answer = [Numbers[0],Numbers[1]];
        qnnuma = Numbers[0]*Numbers[0];
        qnnumb = Numbers[1]*Numbers[1];
        qnnum = qnnuma+qnnumb;
        let response = `Michael has 2 square numbers that add up to ${qnnum}? What could they be?`;
        returnObject.storeQuiz = {title:response,content:response,ui:'basic'};
        returnObject.question = {rightTexts:[' ,'],leftTexts:[],text:response}
        returnObject.answer = answer
        
        break;
    }
    
    
    return returnObject;
   };
 
   exports.generateCubeNum = (
    level = 1,
  ) => {
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    let qnnum,qnnuma,qnnumb;
    let Numbers = helpers.generateNumbers(2, 1);
    let response,answer;
    switch (level) {
      case 1:
        response = `What is ${Numbers[0]}^{3} ?`;
        answer = ( Numbers[0]*Numbers[0]*Numbers[0]);
        returnObject.answer = [answer];
    
        returnObject.storeQuiz = {title:response,content:response,ui:'default'};
        returnObject.question = response
        break;
      case 2:
        let sqnum;
        sqnum =  Numbers[0]* Numbers[0]* Numbers[0];
        response = `Find the number that multiplies by itself 3 times to give ${sqnum} ?`;
        answer = Numbers[0];
        returnObject.answer = [answer];
    
        returnObject.storeQuiz = {title:response,content:response,ui:'default'};
        returnObject.question = response

        break;
      case 3:
       sqnum;
      sqnum =  Numbers[0]* Numbers[0]* Numbers[0]*1000;
      response = `Find the number that multiplies by itself 3 times to give ${sqnum} ?`;
      answer = Numbers[0]*10;
      returnObject.answer = [answer];
  
      returnObject.storeQuiz = {title:response,content:response,ui:'default'};
      returnObject.question = response

      break;
      case 4:
        returnObject.sortAnswer = true 
        returnObject.uiComponent = 'two_inputs'
        answer = [Numbers[0],Numbers[1]];
        qnnuma = Numbers[0]*Numbers[0]*Numbers[0];
        qnnumb = Numbers[1]*Numbers[1]*Numbers[1];
        qnnum = qnnuma+qnnumb;
        response = `${Numbers[0]} - ${Numbers[1]}Michael has 2 cube numbers that add up to ${qnnum}? What could they be?`;
        returnObject.storeQuiz = {title:response,content:response,ui:'basic'};
        returnObject.question = {rightTexts:[' ,'],leftTexts:[],text:response}
        returnObject.answer = answer

        break;
    }
    
    
    return returnObject;
   };
 
   exports.generateSequences = (
    level = 1,
  ) => {
    let  returnObject = { question: [], answer: [], uiComponent: 'inlineinput' }
    let factornum1,factornum2,factornum3,qnnum;
    let Numbers = helpers.generateNumbers(2, 1);
    let startnumber = helpers.generateNumbers(3, 1);
    let response,answer,operator,title;
    switch (level) {
      case 1:
        operator='+';
        break;
      case 2:
        operator='-';
        break;
    }
    if(level==3){
      qnnum = ["1", "2", "3", "4", "5", "6"];
      factornum1 = Math.abs(3,Numbers[0])
      factornum2 = Math.abs(3,Numbers[1])
      factornum3 = Math.abs(3,Numbers[2])
      qnnum[0]=[startnumber[0],startnumber[0]+factornum1,startnumber[0]+factornum1*2,startnumber[0]+factornum1*3,'<input>']
      qnnum[1]=[startnumber[1],startnumber[1]+factornum2,startnumber[1]+factornum2*2,startnumber[1]+factornum2*3,'<input>']
      qnnum[2]=[startnumber[2],startnumber[2]+factornum3,startnumber[2]+factornum3*2,startnumber[2]+factornum3*3,'<input>']

      response = [
        [qnnum[0][0], '+',qnnum[1][0],'+',qnnum[2][0],'=',eval(qnnum[0][0]+qnnum[1][0]+qnnum[2][0])],
        [qnnum[0][1], '+',qnnum[1][1],'+',qnnum[2][1],'=',eval(qnnum[0][1]+qnnum[1][1]+qnnum[2][1])],
        [qnnum[0][2], '+',qnnum[1][2],'+',qnnum[2][2],'=',eval(qnnum[0][2]+qnnum[1][2]+qnnum[2][2])],
        [qnnum[0][3], '+',qnnum[1][3],'+',qnnum[2][3],'=',eval(qnnum[0][3]+qnnum[1][3]+qnnum[2][3])],
        ['<input>', '+','<input>','+','<input>','=','<input>'],
      ];
      answer = [[qnnum]]
      title = `Write the next number sentence in the pattern.`;
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'basic',
      };
      returnObject.question = response;
      returnObject.answer = answer;
      //returnObject.uiComponent = 'in'
      
    }else{
    
    factornum1 = Math.abs(3,Numbers[0])
    
    qnnum = ["1", "2", "3", "4", "5", "6"];
    qnnum[0] = startnumber[0];
    qnnum[1] = helpers.evalOperation(qnnum[0]+operator+factornum1);
    qnnum[2] = helpers.evalOperation(qnnum[1]+operator+factornum1);
    qnnum[3] = helpers.evalOperation(qnnum[2]+operator+factornum1);
    qnnum[4] = helpers.evalOperation(qnnum[3]+operator+factornum1);
    answer = [qnnum[3],qnnum[4]]
    qnnum[3] = '<input>'
    qnnum[4] = '<input>'
    response = [qnnum[0] , ', ' , qnnum[1] , ', ' , qnnum[2], ', ' , qnnum[3], ', ' , qnnum[4]];
    returnObject.question = response;
    returnObject.answer = [answer];
    returnObject.storeQuiz = {
      title: returnObject.question,
      content: returnObject.question,
      ui: 'basic',
    };
    }

    return returnObject;
   };