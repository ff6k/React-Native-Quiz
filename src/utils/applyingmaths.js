import helpers from './helpers'

exports.generateCalculator = (
  level = 1,
) => {
  let  returnObject = { question: [], answer: [], uiComponent: 'default' }
  let multiplier,item,name,answer;
  let numbersdec = helpers.generateDecimalNumbers(3, 1,2);
  let numbers = helpers.generateNumbers(2, 1);
  let numbersdouble = helpers.generateNumbers(2, 2);
  let numberstriple = helpers.generateNumbers(3, 2);
  
  switch (level) {
    case 1:
      var itemoption = [["nail","packs"],["pen","packs"],["screw","packs"]];
      item = itemoption[Math.floor(Math.random() * itemoption.length)];
      var nameoption = [["Pete","he"],["Sandra","she"],["Michelle","she"]];
      name = nameoption[Math.floor(Math.random() * nameoption.length)];
      numberstriple[0] = numbersdouble[0]*numbers[0]+numberstriple[0]
      answer = helpers.roundUp(numberstriple[0] / numbersdouble[0]);
      returnObject.question = `A type of ${[item[0]]} is sold in ${[item[0]]} of ${numbersdouble[0]}. ${[name[0]]} needs ${numberstriple[0]} of these ${[item[0]]}s to repair his fence. How many packs of ${[item[0]]}s does he have to buy?`
      returnObject.answer = [answer];
      break;
    case 2:
      var itemoption = [["Swimming","packs"],["Cinema","packs"],["Theme park","packs"]];
      item = itemoption[Math.floor(Math.random() * itemoption.length)];
      answer = +(numbersdec[1]*numbers[1] +numbersdec[0]*numbers[0] ).toFixed(2)
      returnObject.question = `${answer}${[item[0]]} tickets cost £${numbersdec[0]} for an adult and £${numbersdec[1]} for an child. How much will it cost for ${numbers[0]} adults and ${numbers[1]} children? `
      returnObject.answer = [answer];
      break;
    case 3:
      var itemoption = [["carrots","apples","bananas"],["turnips","strawberrys","grapes"],["oranges","pears","pineappes"]];
      item = itemoption[Math.floor(Math.random() * itemoption.length)];
      var nameoption = [["Pete","he"],["Sandra","she"],["Michelle","she"]];
      name = nameoption[Math.floor(Math.random() * nameoption.length)];
      answer = +(30-(numbersdec[0]+numbersdec[1]+numbersdec[2])).toFixed(2);
      returnObject.question = `${[name[0]]} spends £${numbersdec[0]} on ${[item[0]]}, £${numbersdec[1]} on ${[item[1]]} and £${numbersdec[2]} on ${[item[2]]}. How much change is there from £30 `
      returnObject.answer = [answer];
      break;
  }
  
  
  
  returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
  return returnObject
};


exports.generateProblemSolve = (
  level = 1,
) => {
  let  returnObject = { question: [], answer: [], uiComponent: 'default' }
  let qnnum1,qnnum2,qnnum3,qnnum4,qnnum5,item,name,answer,response,set;
  let numbersdec = helpers.generateDecimalNumbers(2,1,1)
  let numbersingle = helpers.generateNumbers(5, 1);
  let numbersdouble = helpers.generateNumbers(9, 2);
  let numberstriple = helpers.generateNumbers(3, 3);
  var nameoption = [["Pete","he"],["Sandra","she"],["Michelle","she"]];
  name = nameoption[Math.floor(Math.random() * nameoption.length)];
  switch (level) {
    case 1:
      var itemoption = [["mobile phone"],["trainers"],["laptop"]];
      item = itemoption[Math.floor(Math.random() * itemoption.length)];
      
      while(numbersdouble[0]<11){
        numbersdouble = helpers.generateNumbers(2, 2);
      }
      [qnnum1,qnnum2] = [Math.max(5,numbersingle[0]*2),eval(Math.max(5,numbersingle[0]*2)*Math.max(2,numbersingle[0])+numbersingle[1])]
      answer = helpers.roundUp(qnnum2/qnnum1);
      returnObject.question = `${name[0]} gets £${qnnum1} a month pocket money. ${name[1]} wants to buy a new ${item[0]} that costs £${qnnum2}. How many months will it take ${name[0]} to save up for the ${item[0]}?`
      returnObject.answer = [answer];
      break;
    case 2:
      answer = Math.max(2,numbersingle[0])*2
      qnnum1 =Math.max(2,numbersingle[1])
      qnnum2= answer / 2 * qnnum1
      
      returnObject.question = `I am thinking of a number. I find half of it, then multiply it by ${qnnum1}. The answer is ${qnnum2}. What number was I thinking of?`
      returnObject.answer = [answer];
    break;
    case 3:
      qnnum1 =Math.max(3,numbersingle[0])
      qnnum2 =Math.max(3,numbersingle[1])
      qnnum3 =Math.max(3,numbersingle[2])
      qnnum4 =Math.min(Math.max(2,numbersingle[3]),qnnum1-1)
      qnnum5 =Math.min(Math.max(2,numbersingle[4]),qnnum3-1)
      answer = [[eval(qnnum1+qnnum2+qnnum3)*15],[eval(qnnum1+qnnum2+qnnum3-qnnum4-qnnum5)*15]]
      returnObject.question = {leftTexts:['A: ','B: '],rightTexts:[],
        text:`In a school sports cupboard there are: ${'\n'} ${qnnum1} sacks of cricket balls ${'\n'} ${qnnum2} sacks of footballs ${'\n'} ${qnnum3} sacks of basketballs. Each sacks holds 15 balls. ${'\n'} A) How many balls are there together? ${'\n'} B) ${qnnum4} sacks of cricket balls and ${qnnum5} sacks of basketballs are removed for a lesson. How many balls are left in the sports cupboard? `}
      returnObject.uiComponent= 'two_inputs' 
      returnObject.answer = answer;
    break;
    case 4:
      numberstriple = numberstriple.sort(function(a, b){return a-b});
      qnnum1 =Math.max(3,numberstriple[0])
      qnnum2 =Math.max(3,numberstriple[1])
      qnnum3 =Math.max(3,numberstriple[2])
      qnnum4 =Math.min(Math.max(2,numbersingle[3]),qnnum1-1)
      qnnum5 =Math.min(Math.max(2,numbersingle[4]),qnnum3-1)
      
      var busoption = [["1"],["2"],["3"]];
      item = busoption[Math.floor(Math.random() * busoption.length)];
      answer = [[eval(numbersdouble[1]+numbersdouble[2])],[item[0]]]
      let appt;
      if(item[0]==1){
        appt = helpers.convertMinsToHrsMins(eval(qnnum1+numbersdouble[0]+numbersdouble[1]+Math.min(numbersdouble[2]-2,5)))
      }else if (item[0]==2){
        appt = helpers.convertMinsToHrsMins(eval(qnnum2+numbersdouble[3]+numbersdouble[4]+Math.min(numbersdouble[5]-2,5)))
      }else{
        appt = helpers.convertMinsToHrsMins(eval(qnnum3+numbersdouble[6]+numbersdouble[7]+Math.min(numbersdouble[8]-2,5)))
      }

      set = [
        [1,helpers.convertMinsToHrsMins(qnnum1), helpers.convertMinsToHrsMins(eval(qnnum1+numbersdouble[0])),helpers.convertMinsToHrsMins(eval(qnnum1+numbersdouble[0]+numbersdouble[1])),helpers.convertMinsToHrsMins(eval(qnnum1+numbersdouble[0]+numbersdouble[1]+numbersdouble[2]))],
        [2,helpers.convertMinsToHrsMins(qnnum2), helpers.convertMinsToHrsMins(eval(qnnum2+numbersdouble[3])),helpers.convertMinsToHrsMins(eval(qnnum2+numbersdouble[3]+numbersdouble[4])),helpers.convertMinsToHrsMins(eval(qnnum2+numbersdouble[3]+numbersdouble[4]+numbersdouble[5]))],
        [3,helpers.convertMinsToHrsMins(qnnum3), helpers.convertMinsToHrsMins(eval(qnnum3+numbersdouble[6])),helpers.convertMinsToHrsMins(eval(qnnum3+numbersdouble[6]+numbersdouble[7])),helpers.convertMinsToHrsMins(eval(qnnum3+numbersdouble[6]+numbersdouble[7]+numbersdouble[8]))],
      ]
      response = `Here is part of a bus timetable. ${'\n'} A) ${name[0]} wants to go to City D. From City B ${name[1]} catches the ${helpers.convertMinsToHrsMins(eval(qnnum1+numbersdouble[0]))} bus. How long will the journey take in minutes? ${'\n'} B) The next day ${name[0]} needs to travel from City A to City C to attend an appointment at ${appt}`;
      returnObject.question = {leftTexts:['A: ','B: '],rightTexts:[],title:response,headers:[`Bus number`,'City A', 'City B','City C','City D'],rows:set};
      
      //show left text /right text in default view.
      returnObject.answer = answer;
      returnObject.uiComponent = 'table2' 
    break;
    case 5:
      var ansoption = ["25","50","75"];
      answer = ansoption[Math.floor(Math.random() * ansoption.length)];  
      qnnum1 =Math.max(2,numbersingle[1])
      qnnum2= qnnum1*2/(answer/100)
      
      returnObject.question = `${name[0]} buys a packet of ${qnnum2} sweets. He drops ${qnnum1} on the floor, then eats ${qnnum1}. What percentage of the sweets are left in the packet??`
      returnObject.answer = [answer]; 
    break;
    case 6:
    
      qnnum1 = Math.max(50,numbersdouble[0]*2)
      qnnum2 = Math.max(2.2,(numbersdouble[0]*2*numbersingle[1]+numbersdouble[0])/100)
      var ansoption = ["10","20"];
      qnnum3 = ansoption[Math.floor(Math.random() * ansoption.length)];  
      qnnum4 = +(qnnum2-qnnum1/100).toFixed(2)
      qnnum5 = helpers.roundUp(qnnum4*100/qnnum1*qnnum3)
      answer = [qnnum4,qnnum5,helpers.roundUp(qnnum5/Math.max(numbersingle[0]))*Math.max(1.5,numbersdec[1])]
      response = `${name[0]} is making a garden path from bricks. He has run out of bricks and needs to buy some more. The path is currently ${qnnum1}cm long and ${name[0]} has used ${qnnum3} bricks. ${'\n'} A) He wants his path to be ${qnnum2} meters long. How many meters still need to be made? ${'\n'} B) How many more bricks will ${name[0]} need to finish his path? ${'\n'} C) Bricks cost £${Math.max(1.5,numbersdec[1])} for a pack of ${numbersingle[0]}. How much will it cost to buy the extra bricks?`
      returnObject.answer = [answer]; 

      returnObject.question = {leftTexts:['A: ','B: ','C: '],rightTexts:[],
        text:response}
      returnObject.uiComponent= 'three_inputs' 
    break;

  }
  
  
  
  returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
  return returnObject
};


exports.generateDrawSolve = (
  level = 1,
) => {
  let  returnObject = { question: [], answer: [], uiComponent: 'default' }
  let qnnum1,qnnum2,qnnum3,qnnum4,qnnum5,item,name,answer,response,set;
  let numbersdec = helpers.generateDecimalNumbers(2,1,1)
  let numbersingle = helpers.generateNumbers(5, 1);
  let numbersdouble = helpers.generateNumbers(9, 2);
  let numberstriple = helpers.generateNumbers(3, 3);
  var nameoption = [["Pete","he"],["Sandra","she"],["Michelle","she"],["Amir","he"]];
  name = nameoption[Math.floor(Math.random() * nameoption.length)];
  switch (level) {
    case 1:
      qnnum1 = Math.max(22,numbersdouble[0])
      qnnum2= qnnum1 *3+numbersdouble[1]
      answer = [qnnum1*2,numbersdouble[1]]
      response = `The total number of coins in three bags is ${qnnum2}. Bag A holds ${qnnum1} coins. Bag B holds twice as many cosins as Bag A. How many coins are in bags B and C?`
            
      returnObject.answer = [answer]; 

      returnObject.question = {leftTexts:['B: ','C: '],rightTexts:[],
        text:response}
      returnObject.uiComponent= 'two_inputs' 
    break;
    case 2:
    
      qnnum1 = eval(Math.min(20,numbersdouble[0]*2)+numbersdec[0])
      answer = +((qnnum1+numbersdec[1])/2+numbersdouble[1]-qnnum1).toFixed(2)
      response = `${answer}Jack, Sandra, Michael, Amir each throw a javelin. Jack throws his javelin ${qnnum1}m. Sandra throws hers ${numbersdec[1]} further than Jack's. Michael thows his half as far as Sandra's. Amir goes ${numbersdouble[1]}m further than Michael's. What was the difference in metres between Jacks and Amir's throw?`
      returnObject.answer = [answer]; 

      returnObject.question = response
      
    break;

  }
  
  
  
  returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
  return returnObject
};