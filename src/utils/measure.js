import helpers from './helpers'

exports.generateTime = (
  level = 1,
) => {
  let  returnObject = { question: [], answer: [], uiComponent: 'clock' };
  var twentyfouroption = ["yes","no"];
  let twentyfourvar = twentyfouroption[Math.floor(Math.random() * twentyfouroption.length)];
  
  var houroption = [1,2,3,4,5,6,7,8,9,10,11];
  let hourvar = houroption[Math.floor(Math.random() * houroption.length)] ;
  let displayhourvar = hourvar + ((twentyfourvar == "yes") ? 12 : 0)
  
  var minoption = [5,10,15,20,25,30,35,40,45,50,55];
  let minvar = minoption[Math.floor(Math.random() * minoption.length)];
  
  let displayminvar =  (minvar == 5 ? "05" : minvar);
  switch(level){
    case 1:
      
      returnObject.question = {moveHands:true,title:`Show ${hourvar}:${displayminvar} on clock`};
      returnObject.answer = [hourvar,minvar];
      break;
    case 2:
    
      returnObject.question = {moveHands:true,title:`Show ${displayhourvar}:${displayminvar} on clock`};
      returnObject.answer = [hourvar,minvar];
      break;
    case 3:
      returnObject.question = {moveHands:false,title:`What time is shown in clock`,time:[hourvar,displayminvar]};
      returnObject.answer = [hourvar,displayminvar];
      break;
  }
  returnObject.storeQuiz = {title:returnObject.question.title,content:{h:hourvar,m:minvar},ui:'time'}
  return returnObject;
};


exports.generateMoney = (
    level = 1,
  ) => {
    
    let numbersdec = helpers.generateDecimalNumbers(2, 1,2);
    let numberssingle = helpers.generateNumbers(2, 1);
    
    numberssingle[0] = Math.max(numberssingle[0],2)
    numberssingle[1] = Math.max(numberssingle[1],2)
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    let item, item2;
    switch(level){
      case 1:
        numberssingle = numberssingle.sort(function(a, b){return a-b});

        returnObject.answer = [numberssingle[1]*10-numberssingle[0]*10]
        returnObject.question = `Sami has ${numberssingle[1]*10}p. He buys a pencil for ${numberssingle[0]*10}p. How much does he have left?`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        break;
      case 2:
        var itemoption = [["packet of crisps","packets"],["bar of chocolate","bars"],["box of candles","boxes"]];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
        //question = If the price of a [item[0]] is [numbersdouble] p, find the cost of [numberssingle] [item[1]]
        returnObject.answer = [( +(eval(numberssingle[0] * numbersdec[0] )).toFixed(2))];
        returnObject.question = `If the price of a ${[item[0]]} is £${[numbersdec[0]]} Find the cost of ${[numberssingle[0]]} ${[item[1]]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
      case 3:
        var itemoption = [["packet of crisps","packets"],["bar of chocolate","chocolate bars"],["box of candles","candle boxes"]];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
        var itemoption2 = [["packet of biscuits","biscuits"],["a cake","cakes"],["box of pens","box of pens"]];
        item2 = itemoption2[Math.floor(Math.random() * itemoption2.length)];
        //question = If the price of a [item[0]] is [numbersdouble] p, find the cost of [numberssingle] [item[1]]
        returnObject.answer = [( +(eval(numberssingle[0] * numbersdec[0]+numberssingle[1] * numbersdec[1]  )).toFixed(2))];
        returnObject.question = `If the price of a ${[item[0]]} is £${[numbersdec[0]]} and ${[item2[0]]} is £${[numbersdec[1]]}. Find the cost of ${[numberssingle[0]]} ${[item[1]]} and ${[numberssingle[1]]} ${[item2[1]]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
    }
   
    return returnObject;
  };

  exports.generateUnitConversion = (
    level = 1,
  ) => {
    
    let numbersdec = helpers.generateDecimalNumbers(2, 1,2);
    let numberssingle = helpers.generateNumbers(2, 1);
    
    numberssingle[0] = Math.max(numberssingle[0],2)
    numberssingle[1] = Math.max(numberssingle[1],2)
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    let item, item2;
    switch(level){
        case 1:
            var itemoption = [["mm","m",' / 100'],["mm","cm",' / 10'],["cm","m",' / 100'],["m","mm",' * 100'],["cm","mm",' * 10'],["m","cm",' * 100']];
            item = itemoption[Math.floor(Math.random() * itemoption.length)];
            returnObject.answer = [( +(eval(numbersdec[0] + item[2])).toFixed(2))];
            returnObject.question = `A tree is ${[numbersdec[0]]}${[item[0]]} long. What is the same length in ${[item[1]]}?`
            returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
            break;
        case 2:
            var itemoption = [["g","kg",' / 1000'],["kg","g",' * 1000']];
            item = itemoption[Math.floor(Math.random() * itemoption.length)];
            returnObject.answer = [( +(eval(numbersdec[0] + item[2])).toFixed(2))];
            returnObject.question = `A ball has weight of ${[numbersdec[0]]}${[item[0]]}. What is the same weight in ${[item[1]]}?`
            returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
            break;
        case 3:
            var itemoption = [["ml","l",' / 1000'],["l","ml",' * 1000']];
            item = itemoption[Math.floor(Math.random() * itemoption.length)];
            returnObject.answer = [( +(eval(numbersdec[0] + item[2])).toFixed(2))];
            returnObject.question = `There is ${[numbersdec[0]]}${[item[0]]} of water. What is the same amount of water in ${[item[1]]}?`
            returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
            break;
    }
   
    return returnObject;
  };