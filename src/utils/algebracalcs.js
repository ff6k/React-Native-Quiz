import React from 'react'
import helpers from './helpers'
import { Text } from 'react-native'
  exports.generateSimpleFormulae = (
    level = 1,
  ) => {
    
    let numberssingle = helpers.generateNumbers(2, 1);
    let numbersdouble = helpers.generateNumbers(2, 2);
    
    numberssingle[0] = Math.max(numberssingle[0],2)
    numbersdouble[0] = Math.max(numbersdouble[0],3)
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    let item;
    switch(level){
      case 1:
        var itemoption = [["packet of crisps","packets"],["bar of chocolate","bars"],["box of candles","boxes"]];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
        //question = If the price of a [item[0]] is [numbersdouble] p, find the cost of [numberssingle] [item[1]]
        returnObject.answer = [( (eval(numberssingle[0] * numbersdouble[0] )))];
        returnObject.question = `If the price of a ${[item[0]]} is ${[numbersdouble[0]]}, find the cost of ${[numberssingle[0]]} ${[item[1]]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
      case 2:
        var itemoption = [["kitten","grows","month","months"],["spring","extends","weight hung from its end", "weights"],["puppy","grows","months","months"]];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
        //question = A kitten was [numbersdouble[0]] long. It [grows] by [numberssingle[0]] every [month]. Find the length after [numberssingle[1]] [month]s
        returnObject.answer = [( (numbersdouble[0]+(numberssingle[0] * numberssingle[1] )))];
        returnObject.question = `A ${item[0]} was ${[numbersdouble[0]]} cm long. It ${item[1]} by ${[numberssingle[0]]} cm every ${item[2]}. Find the length after ${[numberssingle[1]]} ${item[2]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
    }
   
    return returnObject;
  };

  exports.generateEvalExpr = (
    level = 1,
  ) => {
    
    let numberssingle = helpers.generateNumbers(4, 1);
    let numbersdouble = helpers.generateNumbers(4, 2);
    
    numberssingle[0] = Math.max(numberssingle[0],2)
    numbersdouble[0] = Math.max(numbersdouble[0],3)
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    let item,item2;
    var itemoption = ["x","z","t"];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
    var itemoption2 = ["p","n","m"];
    item2 = itemoption2[Math.floor(Math.random() * itemoption2.length)];
    switch(level){
      case 1:
        
        
        //question = Evaluate "y=" numberssingle[0] itemoption, where x = numberssingle[1] // y=3x
        returnObject.answer = [( eval(numberssingle[0] * numberssingle[1] ))];
        returnObject.question = `Evaluate y = ${numberssingle[0]}${item}, where ${item} = ${numberssingle[1]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
      case 2:
        returnObject.answer = [( eval(numberssingle[0] * numberssingle[1]  - numberssingle[2]))];
        returnObject.question = `Evaluate y = ${numberssingle[0]}${item} - ${numberssingle[2]} , where ${item} = ${numberssingle[1]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
      case 3:
        numberssingle[3] = Math.max(numberssingle[0],3)
        returnObject.answer = [( eval(numberssingle[3]*(numberssingle[0] * numberssingle[1]  - numberssingle[2])))];
        returnObject.question = `Evaluate y = ${numberssingle[3]}(${numberssingle[0]}${item} - ${numberssingle[2]}) , where ${item} = ${numberssingle[1]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
    }
   
    return returnObject;
  };

  exports.generateExpBrackets = (
    level = 1,
  ) => {
    
    let numberssingle = helpers.generateNumbers(4, 1);
    let item;
    var itemoption = ["x","z","t"];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
    
    
    let rand = [-1, 1];
    numberssingle[0] = Math.min(4,Math.max(numberssingle[0],1))*rand[helpers.oneOrZero()];
    numberssingle[1] = Math.max(numberssingle[1],1)*rand[helpers.oneOrZero()];
    numberssingle[2] = Math.min(4,Math.max(numberssingle[2],1))*rand[helpers.oneOrZero()];
    numberssingle[3] = Math.max(numberssingle[3],1)*rand[helpers.oneOrZero()];
    
    let  returnObject = { question: [], answer: [], uiComponent: 'three_inputs' }
    let ans1,ans2,ans3,ans1text,ans2text,ans3text,sep1text,sep2text,sep3text
    switch(level){
      case 1:
        ans1 = numberssingle[0] * numberssingle[2] ;
        ans2 = ( numberssingle[0] * numberssingle[3] )+ (numberssingle[1] * numberssingle[2] );
        ans3 =  numberssingle[1] * numberssingle[3] ;
        ans1text = `${item}^{2}`;
        ans2text = `${item}`;
        ans3text = '';
        sep1text = ', ';
        sep2text = ', ';
        sep3text = '';
        //return 3 items for answer ans1,ans2,ans3
        returnObject.answer = [eval(ans1),eval(ans2),eval(ans3)];
        if (numberssingle[0] == '1') {
          numberssingle[0] ='';
        }else if(numberssingle[0] == '-1') {
          numberssingle[0] ='-';
        }else if(numberssingle[2] == '1') {
          numberssingle[2] ='';
        }else if(numberssingle[2] == '-1') {
          numberssingle[2] ='-';
        }
        
        if (numberssingle[1] < '0') {
          numberssingle[1] =` ${numberssingle[1]}` ;
        }else{
          numberssingle[1] =` + ${numberssingle[1]}` ;
        }
        if (numberssingle[3] < '0') {
          numberssingle[3] =` ${numberssingle[3]}` ;
        }else{
          numberssingle[3] =` + ${numberssingle[3]}` ;
        }

        returnObject.question = {leftTexts:[],rightTexts:[ans1text,ans2text,ans3text],text:`Remove the brackets and simplify:  (${numberssingle[0]}${item}${numberssingle[1]})(${numberssingle[2]}${item}${numberssingle[3]})`}
        //returnObject.question = `Remove the brackets and simplify: y = ${numberssingle[0]}${item} - ${numberssingle[2]} , where ${item} = ${numberssingle[1]}`
        returnObject.storeQuiz = {title:returnObject.question.text,content:returnObject.question.text,ui:'basic'};
        returnObject.storeAnswer = `${ans1+ans1text} ${ans2+ans2text} ${ans1+ans3text}`
        break;
      case 2: 
        break;
    }
    return returnObject;
  };

  exports.generateSolveEqns = (
    level = 1,
  ) => {
    let num1,num2,num3,num4,num5,num6,num7,num8;
    let one,two,three,four;
    let lefttext1,lefttext2;
    let numberssingle = helpers.generateNumbers(5, 1);
    let item;
    var itemoption = ["x","z","t"];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
    
    
    let rand = [-1, 1];
    numberssingle[0] = Math.max(numberssingle[0],1)*rand[helpers.oneOrZero()];
    numberssingle[1] = Math.max(numberssingle[1],1)*rand[helpers.oneOrZero()];
    numberssingle[2] = Math.max(numberssingle[2],1)*rand[helpers.oneOrZero()];
    numberssingle[3] = Math.max(numberssingle[3],1)*rand[helpers.oneOrZero()];
    numberssingle[4] = Math.max(numberssingle[4],1)*rand[helpers.oneOrZero()];
    
    let sign1 ='';
    let sign2 ='';
    let sign3 ='';
    let sign4 ='';
    
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    
    switch(level){
      case 1:
        numberssingle[2] = Math.abs(numberssingle[2])*-1;
        
        returnObject.answer = [( numberssingle[1] )];
        numberssingle[1] = eval(numberssingle[1]+numberssingle[2]);
        numberssingle[0] = helpers.infrontx(numberssingle[0]);
        numberssingle[2] = helpers.afterx(numberssingle[2]);
        
        returnObject.question = `Find the value of ${item}: ${'\n'}${item}${numberssingle[2]} =${numberssingle[1]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
      case 2:
        numberssingle[2] = Math.abs(numberssingle[2]);
        
        returnObject.answer = [( numberssingle[1] )];
        numberssingle[1] = eval(numberssingle[1]+numberssingle[2]);
        numberssingle[0] = helpers.infrontx(numberssingle[0]);
        numberssingle[2] = helpers.afterx(numberssingle[2]);
        
        returnObject.question = `Find the value of ${item}: ${'\n'}${item}${numberssingle[2]} =${numberssingle[1]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
      case 3:
        numberssingle[0] = Math.abs(numberssingle[0]);
        returnObject.answer = [( numberssingle[1] )];
        numberssingle[1] = eval(numberssingle[1]*numberssingle[0]);
        numberssingle[0] = helpers.infrontx(numberssingle[0]);
        numberssingle[2] = helpers.afterx(numberssingle[2]);
        
        returnObject.question = `Find the value of ${item}: ${'\n'}${numberssingle[0]}${item} =${numberssingle[1]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
        case 4:
      numberssingle[0] = Math.abs(numberssingle[0])*-1;
      returnObject.answer = [( numberssingle[1] )];
      numberssingle[1] = eval(numberssingle[1]*numberssingle[0]);
      numberssingle[0] = helpers.infrontx(numberssingle[0]);
      numberssingle[2] = helpers.afterx(numberssingle[2]);
      
      returnObject.question = `Find the value of ${item}: ${'\n'}${numberssingle[0]}${item} =${numberssingle[1]}`
      returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
      
      break;
      case 5:
      numberssingle[1] = [2, 3][helpers.oneOrZero()];
     numberssingle[3] = [2, 3][helpers.oneOrZero()];
     var numeratoroption = [1,2,3];
     num1 = numeratoroption[Math.floor(Math.random() * numeratoroption.length)];
     numberssingle[0] = Math.abs(Math.max(2,numberssingle[0]));
     numberssingle[0] = Math.abs(numberssingle[0])
     num2 = numberssingle[3]*numberssingle[0];
     [num1,num2]=helpers.simplify(num1,num2);
     if(numberssingle[3]*numberssingle[0]<0){
      sign1='-';
     }else{sign1='';}
     one ='$'+sign1+'\\frac{'+Math.abs(num1)+'}{'+Math.abs(num2)+'}'+item+'$';
     [num7,num8]=helpers.simplify((numberssingle[4]*((sign1=='-') ? num1 *-1 : num1)),(num2)) ;
     if(num7*num8<0){
      sign3='-';
     }else{sign3='';}
     if(num8==1){three='$='+Math.abs(num7)+'$'}else if(num8==-1){three='$='+Math.abs(num7)+'$'}else{three ='$ ='+sign3+'\\frac{'+Math.abs(num7)+'}{'+Math.abs(num8)+'}$';}
     
     returnObject.question = {rightTexts:[' ,'],leftTexts:[lefttext1,lefttext2],title:`${numberssingle[4]}Find the value of ${item}: `, equ:`${one}${three}`}
     returnObject.uiComponent='mathjax';

     returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
     returnObject.answer = [numberssingle[4]];
      break;
      case 6:
        numberssingle[1] = [2, 3][helpers.oneOrZero()];
        numberssingle[3] = [2, 3][helpers.oneOrZero()];
        var numeratoroption = [1,2,3];
        num1 = numeratoroption[Math.floor(Math.random() * numeratoroption.length)];
        numberssingle[0] = Math.abs(Math.max(2,numberssingle[0]));
        num2 = numberssingle[3]*numberssingle[0];
        [num1,num2]=helpers.simplify(num1,num2);
        numberssingle[0] = Math.abs(numberssingle[0])*-1
        if(numberssingle[3]*numberssingle[0]<0){
         sign1='-';
        }else{sign1='';}
        one ='$'+sign1+'\\frac{'+Math.abs(num1)+'}{'+Math.abs(num2)+'}'+item+'$';
        [num7,num8]=helpers.simplify((numberssingle[4]*((sign1=='-') ? num1 *-1 : num1)),(num2)) ;
        if(num7*num8<0){
         sign3='-';
        }else{sign3='';}
        if(num8==1){three='$='+Math.abs(num7)+'$'}else if(num8==-1){three='$='+Math.abs(num7)+'$'}else{three ='$ ='+sign3+'\\frac{'+Math.abs(num7)+'}{'+Math.abs(num8)+'}$';}
        
        returnObject.question = {rightTexts:[' ,'],leftTexts:[lefttext1,lefttext2],title:`${numberssingle[4]}Find the value of ${item}: `, equ:`${one}${three}`}
        returnObject.uiComponent='mathjax';
   
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        returnObject.answer = [numberssingle[4]];
      break;
      case 7:
      returnObject.answer = [( numberssingle[1] )];
      numberssingle[1] = eval(numberssingle[1]+numberssingle[2]);
      numberssingle[0] = helpers.infrontx(numberssingle[0]);
      numberssingle[2] = helpers.afterx(numberssingle[2]);
      
      returnObject.question = `Find the value of ${item}: ${'\n'}${item}${numberssingle[2]} =${numberssingle[1]}`
      returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
      
      break;
      case 8:
        returnObject.answer = [( numberssingle[1] )];
        numberssingle[1] = eval(numberssingle[1]*numberssingle[0]);
        numberssingle[0] = helpers.infrontx(numberssingle[0]);
        numberssingle[2] = helpers.afterx(numberssingle[2]);
        
        returnObject.question = `Find the value of ${item}: ${'\n'}${numberssingle[0]}${item} =${numberssingle[1]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
      case 9:
        returnObject.answer = [( numberssingle[1] )];
        numberssingle[1] = eval(numberssingle[0]*numberssingle[1]+numberssingle[2]);
        numberssingle[0] = helpers.infrontx(numberssingle[0]);
        numberssingle[2] = helpers.afterx(numberssingle[2]);
        
        returnObject.question = `Find the value of ${item}: ${'\n'} ${numberssingle[0]}${item}${numberssingle[2]} =${numberssingle[1]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
      case 10: 
        returnObject.answer = [( numberssingle[4] )];
        numberssingle[3] = helpers.afterx((numberssingle[0]*numberssingle[4])+numberssingle[1]-(numberssingle[2]*numberssingle[4]));
        numberssingle[0] = helpers.infrontx(numberssingle[0]);
        numberssingle[1] = helpers.afterx(numberssingle[1]);
        numberssingle[2] = helpers.infrontx(numberssingle[2]);
        
        returnObject.question = `Find the value of ${item}: ${'\n'} ${numberssingle[0]}${item}${numberssingle[1]}=${numberssingle[2]}${item}${numberssingle[3]}`
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        
        break;
      case 11: 
     
          
     numberssingle[1] = [2, 3][helpers.oneOrZero()];
     numberssingle[3] = [2, 3][helpers.oneOrZero()];
     var numeratoroption = [1,2,3];
     num1 = numeratoroption[Math.floor(Math.random() * numeratoroption.length)];
     numberssingle[0] = Math.abs(Math.max(2,numberssingle[0]));
     num2 = numberssingle[3]*numberssingle[0];
     [num1,num2]=helpers.simplify(num1,num2);
     if(numberssingle[3]*numberssingle[0]<0){
      sign1='-';
     }else{sign1='';}
     one ='$'+sign1+'\\frac{'+Math.abs(num1)+'}{'+Math.abs(num2)+'}'+item+'$';
     if(numberssingle[0]*numberssingle[2]<0){
      sign2='-';
     }else{sign2='+';}
      
     num3 = Math.abs(numberssingle[2]);
     num4 = Math.abs(numberssingle[0]);
     [num3,num4]=helpers.simplify(num3,num4);
     two ='$\\frac{'+num3+'}{'+num4+'}$';
     
     if(num4==1){two='$'+sign2+Math.abs(num3)+'$'}else if(num4==-1){two='$'+sign2+Math.abs(num3)+'$'}else{two ='$'+sign2+ '\\frac{'+Math.abs(num3)+'}{'+Math.abs(num4)+'}$';}
     [num7,num8]=helpers.simplify((numberssingle[4]*((sign1=='-') ? num1 *-1 : num1)*num4)+(((sign2=='-') ? num3 *-1 : num3)*num2),(num2*num4)) ;
     if(num7*num8<0){
      sign3='-';
     }else{sign3='';}
     if(num8==1){three='$='+Math.abs(num7)+'$'}else if(num8==-1){three='$='+Math.abs(num7)+'$'}else{three ='$ ='+sign3+'\\frac{'+Math.abs(num7)+'}{'+Math.abs(num8)+'}$';}
     
     returnObject.question = {rightTexts:[' ,'],leftTexts:[lefttext1,lefttext2],title:`Find the value of ${item}: `, equ:`${one}${two}${three}`}
     returnObject.uiComponent='mathjax';

     returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
     returnObject.answer = [numberssingle[4]];
     //[Number.parseFloat(helpers.evalOperation('('+sign2+'1/'+numberssingle[1]+'-'+numberssingle[2]+')*('+sign1 + numberssingle[0]+')')).toFixed(2)];     
     
      break;
      case 12: 
          
     numberssingle[1] = [2, 3][helpers.oneOrZero()];
     numberssingle[3] = [2, 3][helpers.oneOrZero()];
     var numeratoroption = [1,2,3];
     num1 = numeratoroption[Math.floor(Math.random() * numeratoroption.length)];
     numberssingle[0] = Math.abs(Math.max(2,numberssingle[0]));
     num2 = numberssingle[3]*numberssingle[0];
     [num1,num2]=helpers.simplify(num1,num2);
     if(numberssingle[3]*numberssingle[0]<0){
      sign1='-';
     }else{sign1='';}
     one ='$'+sign1+'\\frac{'+Math.abs(num1)+'}{'+Math.abs(num2)+'}'+item+'$';
     if(numberssingle[0]*numberssingle[2]<0){
      sign2='-';
     }else{sign2='+';}
      
     num3 = Math.abs(numberssingle[2]);
     num4 = Math.abs(numberssingle[0]);
     [num3,num4]=helpers.simplify(num3,num4);
     two ='$\\frac{'+num3+'}{'+num4+'}$';
     
     if(num4==1){two='$'+sign2+Math.abs(num3)+'$'}else if(num4==-1){two='$'+sign2+Math.abs(num3)+'$'}else{two ='$'+sign2+ '\\frac{'+Math.abs(num3)+'}{'+Math.abs(num4)+'}$';}

     
     num5 = numberssingle[3]
     num6 = numberssingle[4]
     
     if(num5*num6<0){
      sign3='-';
     }else{sign3='';}
     [num5,num6] = helpers.simplify(Math.abs(num5),Math.abs(num6));
     if(num6==1){three='$'+sign3+num5+item+'$'}else{three='$'+sign3+'\\frac{'+num5+'}{'+num6+'}'+item+'$'};

     [num7,num8]=helpers.simplify(((numberssingle[4]*((sign1=='-') ? num1 *-1 : num1)*num4)+(((sign2=='-') ? num3 *-1 : num3)*num2))*num6-((sign3=='-') ? num5 *-1 : num5)*num2*num4,(num2*num4*num6)) ;
     if(num7*num8<0){
      sign4='-';
     }else{sign4='+';}
     if(num8==1){four='$'+sign4+Math.abs(num7)+'$'}else if(num8==-1){four='$'+sign4+Math.abs(num7)+'$'}else{four ='$ '+sign4+'\\frac{'+Math.abs(num7)+'}{'+Math.abs(num8)+'}$';}
     
      returnObject.question = {title:`Find the value of ${item}:`, equ:`${one}${two}=${three}${four}`}
      returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
      returnObject.answer = [numberssingle[4]];
      returnObject.uiComponent='mathjax';
      //[Number.parseFloat(helpers.evalOperation('('+sign2+'1/'+numberssingle[1]+'-'+numberssingle[2]+')*('+sign1 + numberssingle[0]+')')).toFixed(2)];     
      
      break;
    }
    return returnObject;
  };

  exports.generateInequalities = (
    level = 1,
  ) => {
    
    let numberssingle = helpers.generateNumbers(5, 1);
    let item,tempanswer,answeroptions;
    var itemoption = ["x","z","t"];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
    var signoption = [["<",">"],[">","<"],["<",">"],[">","<"]];
    let ineqsign = signoption[Math.floor(Math.random() * signoption.length)];
    
    let rand = [-1, 1];
    numberssingle[0] = Math.max(numberssingle[0],1)*rand[helpers.oneOrZero()];
    numberssingle[1] = Math.max(numberssingle[1],1)*rand[helpers.oneOrZero()];
    numberssingle[2] = Math.max(numberssingle[2],1)*rand[helpers.oneOrZero()];
    numberssingle[3] = Math.max(numberssingle[3],1)*rand[helpers.oneOrZero()];
    
    let  returnObject = { question: [], answer: [], uiComponent: 'buttonAnswer' },title;
    
    switch(level){
      case 1:
        tempanswer =  numberssingle[1];
        returnObject.answer = [`${item}${ineqsign[0]}${tempanswer}`];
        answeroptions = helpers.shuffle([`${item}${ineqsign[0]}${tempanswer}`,`${item}${ineqsign[1]}${tempanswer}`,`${item}${ineqsign[0]}${numberssingle[0]}`,`${item}${ineqsign[1]}${numberssingle[0]}`]);
        numberssingle[0] = helpers.infrontx(numberssingle[0]);
        numberssingle[2] = helpers.afterx(numberssingle[2]);
        numberssingle[1] = (numberssingle[1]+numberssingle[2]);
        title = `Solve the equation: ${item}${numberssingle[2]} ${ineqsign[0]} ${numberssingle[1]}`;
        returnObject.question = { title: title, from: answeroptions }
        returnObject.storeQuiz = {title:title,content:title,ui:'basic'}     
        break;
      case 2:
        tempanswer =  numberssingle[1];
        if(numberssingle[0]<0){
          returnObject.answer = [`${item}${ineqsign[1]}${tempanswer}`];
        }else{
          returnObject.answer = [`${item}${ineqsign[0]}${tempanswer}`];
        }
        answeroptions = helpers.shuffle([`${item}${ineqsign[0]}${tempanswer}`,`${item}${ineqsign[1]}${tempanswer}`,`${item}${ineqsign[0]}${numberssingle[0]}`,`${item}${ineqsign[1]}${numberssingle[0]}`]);
        numberssingle[0] = helpers.infrontx(numberssingle[0]);
        numberssingle[2] = helpers.afterx(numberssingle[2]);
        numberssingle[1] = (numberssingle[1]*numberssingle[0]);
        title = `Solve the equation: ${numberssingle[0]}${item} ${ineqsign[0]} ${numberssingle[1]}`;
        returnObject.question = { title: title, from: answeroptions }
        returnObject.storeQuiz = {title:title,content:title,ui:'default'}
        
        break;
      case 3:
        tempanswer =  numberssingle[1];
        if(numberssingle[0]<0){
          returnObject.answer = [`${item}${ineqsign[1]}${tempanswer}`];
        }else{
          returnObject.answer = [`${item}${ineqsign[0]}${tempanswer}`];
        }
        answeroptions = helpers.shuffle([`${item}${ineqsign[0]}${tempanswer}`,`${item}${ineqsign[1]}${tempanswer}`,`${item}${ineqsign[0]}${numberssingle[0]}`,`${item}${ineqsign[1]}${numberssingle[0]}`]);
        numberssingle[0] = helpers.infrontx(numberssingle[0]);
        numberssingle[2] = helpers.afterx(numberssingle[2]);
        numberssingle[1] = (numberssingle[0]*numberssingle[1]+numberssingle[2]);
        title = `Solve the equation: ${numberssingle[0]}${item}${numberssingle[2]} ${ineqsign[0]} ${numberssingle[1]}`;
        returnObject.question = { title: title, from: answeroptions }
        returnObject.storeQuiz = {title:title,content:title,ui:'default'}
        
        break;
      case 4: 
        tempanswer =  numberssingle[4];
        if(numberssingle[0]-numberssingle[2]<0){
          returnObject.answer = [`${item}${ineqsign[1]}${tempanswer}`];
        }else{
          returnObject.answer = [`${item}${ineqsign[0]}${tempanswer}`];
        }
        answeroptions = helpers.shuffle([`${item}${ineqsign[0]}${tempanswer}`,`${item}${ineqsign[1]}${tempanswer}`,`${item}${ineqsign[0]}${numberssingle[0]}`,`${item}${ineqsign[1]}${numberssingle[0]}`]);
        numberssingle[3] = helpers.afterx((numberssingle[0]*numberssingle[4])+numberssingle[1]-(numberssingle[2]*numberssingle[4]));
        numberssingle[0] = helpers.infrontx(numberssingle[0]);
        numberssingle[1] = helpers.afterx(numberssingle[1]);
        numberssingle[2] = helpers.infrontx(numberssingle[2]); 
        title =  `Solve the equation: ${numberssingle[0]}${item}${numberssingle[1]} ${ineqsign[0]} ${numberssingle[2]}${item}${numberssingle[3]}`;
        returnObject.question = { title: title, from: answeroptions }
        returnObject.storeQuiz = {title:title,content:title,ui:'default'}  
      
        break;
    }
    return returnObject;
  };

  exports.generateFactorise = (
      level = 1,
    ) => {
      
      let numberssingle = helpers.generateNumbers(4, 1);
      let multiplier = Math.max(2,helpers.generateNumbers(1, 1));
      let item,item2;
      var itemoption = ["y","z","t"];
          item = itemoption[Math.floor(Math.random() * itemoption.length)];
          var itemoption = ["m","n","p"];
          item2 = itemoption[Math.floor(Math.random() * itemoption.length)];
            
      let rand = [-1, 1];
      numberssingle[0] = Math.min(2,Math.max(numberssingle[0],1))*rand[helpers.oneOrZero()];
      
      let temp1,temp2;
      let  returnObject = { question: [], answer: [], uiComponent: 'three_inputs' }
      let ans1,ans2,ans3,ans1text,ans2text,ans3text,sep1text,sep2text,sep3text
      let text1,text2;
      switch(level){
        case 1:
          ans1 = numberssingle[0] * numberssingle[2] ;
          ans2 = ( numberssingle[0] * numberssingle[3] )+ (numberssingle[1] * numberssingle[2] );
          ans3 =  numberssingle[1] * numberssingle[3] ;
          text1 = '(';
          text2 = ')';
          ans1text = `${text1}`;
          ans2text = `${item}`;
          ans3text = `${text2}`;
          sep2text = ', ';
          sep3text = '';
          //return 3 items for answer ans1,ans2,ans3
          numberssingle[1]=multiplier*numberssingle[0];
          sep1text = (numberssingle[1]/numberssingle[0]>0)? ' + ' : ' ';
          [temp1,temp2] = [numberssingle[0],numberssingle[1]/numberssingle[0]]
          returnObject.answer = [temp1,1,temp2];
          returnObject.storeAnswer = `${temp1+ans1text} ${'1'+ans2text} ${sep1text} ${temp2+ans3text}`
          numberssingle[0]=helpers.infrontx(numberssingle[0]);
          numberssingle[1]=helpers.afterx(numberssingle[1]);
          returnObject.question = {leftTexts:[''],rightTexts:[ans1text,ans2text,ans3text],text:`Factorise following expression: ${'\n'}  ${numberssingle[0]}${item}${numberssingle[1]}`}
          //returnObject.question = `Remove the brackets and simplify: y = ${numberssingle[0]}${item} - ${numberssingle[2]} , where ${item} = ${numberssingle[1]}`
          returnObject.storeQuiz = {title:returnObject.question.text,content:returnObject.question.text,ui:'basic'};
          
          break;
        case 2: 
          ans1 = numberssingle[0] * numberssingle[2] ;
          ans2 = ( numberssingle[0] * numberssingle[3] )+ (numberssingle[1] * numberssingle[2] );
          ans3 =  numberssingle[1] * numberssingle[3] ;
          text1 = '(';
          text2 = ')';
          ans1text = `${item}${text1}`;
          ans2text = `${item2}`;
          ans3text = `${text2}`;
          sep2text = ', ';
          sep3text = '';
          //return 3 items for answer ans1,ans2,ans3
          numberssingle[1]=multiplier*numberssingle[0];
          sep1text = (numberssingle[1]/numberssingle[0]>0)? ' + ' : ' ';
          [temp1,temp2] = [numberssingle[0],numberssingle[1]/numberssingle[0]]
          returnObject.answer = [temp1,1,temp2];
          returnObject.storeAnswer = `${temp1+ans1text} ${'1'+ans2text} ${sep1text} ${temp2+ans3text}`
          numberssingle[0]=helpers.infrontx(numberssingle[0]);
          numberssingle[1]=helpers.afterx(numberssingle[1]);
          returnObject.question = {leftTexts:[''],rightTexts:[ans1text,ans2text,ans3text],text:`Factorise following expression: ${'\n'}  ${numberssingle[0]}${item}${item2}${numberssingle[1]}${item}`}
          //returnObject.question = `Remove the brackets and simplify: y = ${numberssingle[0]}${item} - ${numberssingle[2]} , where ${item} = ${numberssingle[1]}`
          returnObject.storeQuiz = {title:returnObject.question.text,content:returnObject.question.text,ui:'basic'};
          break;
        case 3: 
          ans1 = numberssingle[0] * numberssingle[2] ;
          ans2 = ( numberssingle[0] * numberssingle[3] )+ (numberssingle[1] * numberssingle[2] );
          ans3 =  numberssingle[1] * numberssingle[3] ;
          text1 = '(';
          text2 = ')';
          ans1text = `${item}${text1}`;
          ans2text = `${item}`;
          ans3text = `${text2}`;
          
          //return 3 items for answer ans1,ans2,ans3
          numberssingle[1]=multiplier*numberssingle[0];
          sep1text = (numberssingle[1]/numberssingle[0]>0)? ' + ' : ' ';
          [temp1,temp2] = [numberssingle[0],numberssingle[1]/numberssingle[0]]
          
          sep3text = '$$'+`${numberssingle[0]}${item}^2`+`${helpers.infrontxmid(numberssingle[1])}${item}`+'$$';
          returnObject.answer = [temp1,1,temp2];
          returnObject.storeAnswer = `${temp1+ans1text} ${'1'+ans2text} ${sep1text} ${temp2+ans3text}`
          numberssingle[0]=helpers.infrontx(numberssingle[0]);
          numberssingle[1]=helpers.afterx(numberssingle[1]);
          returnObject.question = {leftTexts:[''],rightTexts:[ans1text,ans2text,ans3text],text:`Factorise following expression:`, equ:`${sep3text}`}
          returnObject.storeQuiz = {title:returnObject.question.text,content:returnObject.question.text,ui:'basic'};
          returnObject.uiComponent='mathjax3inputs';
          break;
      }
      return returnObject;
    };

    exports.generateSimultaneous = (
      level = 1,
    ) => {
      let  returnObject = { question: [], answer: [], uiComponent: 'default' }
      let num1,num2,num3,num4,num5,num6,num7,num8;
      let numberssingle = helpers.generateNumbers(6, 1);
      let item, item2;
      var itemoption = ["x","z","t"];
          item = itemoption[Math.floor(Math.random() * itemoption.length)];
      var itemoption = ["y","m","n"];
          item2 = itemoption[Math.floor(Math.random() * itemoption.length)];
      let rand = [-1, 1];
      numberssingle[0] = Math.max(numberssingle[0],1)*rand[helpers.oneOrZero()];
      numberssingle[1] = Math.max(numberssingle[1],1)*rand[helpers.oneOrZero()];
      numberssingle[2] = Math.max(numberssingle[2],1)*rand[helpers.oneOrZero()];
      numberssingle[3] = Math.max(numberssingle[3],1)*rand[helpers.oneOrZero()];
      numberssingle[4] = Math.max(numberssingle[4],1)*rand[helpers.oneOrZero()];
      numberssingle[5] = Math.max(numberssingle[5],1)*rand[helpers.oneOrZero()];
      
      
      let sign1,sign2;
      switch(level){
        case 1:
        var numeratoroption = [1,2,3];
        numberssingle[0] = numeratoroption[Math.floor(Math.random() * numeratoroption.length)];
        numberssingle[1] = numeratoroption[Math.floor(Math.random() * numeratoroption.length)];                
        numberssingle[3] = numeratoroption[Math.floor(Math.random() * numeratoroption.length)];
        numberssingle[4] = numeratoroption[Math.floor(Math.random() * numeratoroption.length)];                
        let one,two,three,four, five, six;
        if( (numberssingle[0] == numberssingle[3])){
          if(numberssingle[1]== numberssingle[4]){
          numberssingle[0]=numberssingle[0]+1}
        }
        num1 = helpers.infrontx(numberssingle[0])
        one ='$$'+num1+item;
        num2 = helpers.infrontxmid(numberssingle[1])
        two = num2+item2;
        num3 = helpers.infrontx(numberssingle[3])
        num4 = helpers.infrontxmid(numberssingle[4])  

        let var1,var2;
        var1 = numberssingle[2]
        var2 = numberssingle[5]
        three = numberssingle[0] * var1 + numberssingle[1]*var2

        four = num3+item;
        five = num4+item2;
        six = numberssingle[3] * var1 + numberssingle[4]*var2+'$$'
        let newline = '\\\\';
        let lefttext1,lefttext2
        lefttext1 = `${item}= `;
        lefttext2 = `${item2}= `;
        returnObject.question = {rightTexts:[' ,',''],leftTexts:[lefttext1,lefttext2],title:`Solve the simultaneous equation:`, equ:`${one}${two}=${three} ${newline} ${four}${five}=${six}`}
        //console.log(returnObject.question.equ);
        //`$$\\begin{pmatrix}a & b \\\\ c & d\\\\ c & d\\end{pmatrix}$$`
        returnObject.storeQuiz = {title:returnObject.question.title,content:returnObject.question.equ,ui:'default'}
        returnObject.answer = [var1,var2];
        returnObject.uiComponent='mathjax2inputs';
        //[Number.parseFloat(helpers.evalOperation('('+sign2+'1/'+numberssingle[1]+'-'+numberssingle[2]+')*('+sign1 + numberssingle[0]+')')).toFixed(2)];     
        
        break;
      }
      return returnObject;
    };

    exports.generateSimplifyalgfracs = (
      level = 1,
    ) => {
      let  returnObject = { question: [], answer: [], uiComponent: 'default' }
      let num1,num2,num3,num4,num5,num6,num7,num8;
      let numberssingle = helpers.generateNumbers(6, 1);
      let item, item2;
      var itemoption = ["x","z","t"];
          item = itemoption[Math.floor(Math.random() * itemoption.length)];
      var itemoption = ["y","m","n"];
          item2 = itemoption[Math.floor(Math.random() * itemoption.length)];
      let rand = [-1, 1];
      numberssingle[0] = Math.max(numberssingle[0],1)*rand[helpers.oneOrZero()];
      numberssingle[1] = Math.max(numberssingle[1],1)*rand[helpers.oneOrZero()];
      numberssingle[2] = Math.max(numberssingle[2],1)*rand[helpers.oneOrZero()];
      numberssingle[3] = Math.max(numberssingle[3],1)*rand[helpers.oneOrZero()];
      numberssingle[4] = Math.max(numberssingle[4],1)*rand[helpers.oneOrZero()];
      numberssingle[5] = Math.max(numberssingle[5],1)*rand[helpers.oneOrZero()];
      let one,two,three,four,five,six;
      let var1,var2;
      let questionexp;
      let lefttext1,lefttext2
      let tempvar;
      switch(level){
        case 1:
        
        num1 = helpers.infrontx(numberssingle[0])
        
        if(numberssingle[1]==numberssingle[0]){
          numberssingle[1]  = Math.abs(numberssingle[1]*numberssingle[0]);
        }else{
          numberssingle[1]  = Math.abs(numberssingle[1]);
        }
        
        num2 = helpers.infrontx(numberssingle[1])
        num3 = Math.abs(numberssingle[2])==1? item : item+'^'+Math.abs(numberssingle[2]);
        num4 = rand[helpers.oneOrZero()];
        num5 = eval(Math.abs(numberssingle[2])+'+'+num4)==0 ? '':item+'^'+eval(Math.abs(numberssingle[2])+'+'+num4);
        num5 = eval(Math.abs(numberssingle[2])+'+'+num4)==1 ? item:num5;
        questionexp ='$$'+'\\frac{'+num1+num3+'}{'+num2+num5+'}'+'$$';
        
        [var1,var2] = helpers.simplify(numberssingle[0],numberssingle[1])
        if(num4>0){
          var2 = (var2 == 1) ? item : var2+item;
        }else{
          var1 = (var1 == 1) ? item : var1+item;
        }
        
        
        lefttext1 = `num = `;
        lefttext2 = `den = `;
        //[Number.parseFloat(helpers.evalOperation('('+sign2+'1/'+numberssingle[1]+'-'+numberssingle[2]+')*('+sign1 + numberssingle[0]+')')).toFixed(2)];     
        
        break;
      case 2:
        numberssingle[1]=numberssingle[1]*numberssingle[0]
        numberssingle[3]=numberssingle[2]*numberssingle[0]
        tempvar = helpers.shuffle([numberssingle[0],numberssingle[1],numberssingle[3]]);
        numberssingle[0]=tempvar[0]
        numberssingle[1]=tempvar[1]
        numberssingle[3]=tempvar[2]
        num1 = helpers.infrontx(numberssingle[0])
        num2 = helpers.infrontxmid(numberssingle[1])
        num3 = Math.abs(numberssingle[2])==1? item : item+'^'+Math.abs(numberssingle[2]);
        num4 = rand[helpers.oneOrZero()];
        one = eval(Math.abs(numberssingle[2])+'+'+num4);
        num5 = one ==0 ? '':item+'^'+one;
        num5 = one ==1 ? item:num5;
        num6 = helpers.infrontx(numberssingle[3])
        num4 = [0,num4][helpers.oneOrZero()];
        two = eval(Math.abs(numberssingle[2])+'+'+num4)
        num7 = two==0 ? '':item+'^'+two;
        num7 = two==1 ? item:num7;        
        questionexp ='$$'+'\\frac{'+num1+num3+num2+num5+'}{'+num6+num7+'}'+'$$';
        six = [Math.abs(numberssingle[2]),one,two].sort(function(a, b){return a-b});
        six = six[0];
        tempvar = helpers.gcdfn(numberssingle[0],helpers.gcdfn(numberssingle[1],numberssingle[3]))
        three = numberssingle[0]/tempvar; 
        four = numberssingle[1]/tempvar;
        five = numberssingle[3]/tempvar;

        if(five <0){
          [three,four,five]=[three*-1,four*-1,five*-1]
        }
        //need to update following code  
        var1 = (eval(Math.abs(numberssingle[2])+'-'+six)==0?three:helpers.infrontx(three))+(eval(Math.abs(numberssingle[2])+'-'+six)==1?item:'')+(eval(Math.abs(one)+'-'+six)==0?four:helpers.infrontx(four))+(eval(Math.abs(one)+'-'+six)==1?item:'') ;
        var2 = (eval(Math.abs(two)+'-'+six)==0?five:helpers.infrontx(five)) + (eval(Math.abs(two)+'-'+six)==1?item :'');
        
        
        lefttext1 = `num = `;
        lefttext2 = `den = `;
        //[Number.parseFloat(helpers.evalOperation('('+sign2+'1/'+numberssingle[1]+'-'+numberssingle[2]+')*('+sign1 + numberssingle[0]+')')).toFixed(2)];     
        
        break;
      }
        returnObject.question = {rightTexts:[' ,',''],leftTexts:[lefttext1,lefttext2],title:`Simplify the algebraic fraction:`, equ:`${questionexp}`}
        //console.log(returnObject.question.equ);
        //`$$\\begin{pmatrix}a & b \\\\ c & d\\\\ c & d\\end{pmatrix}$$`
        returnObject.storeQuiz = {title:returnObject.question.title,content:returnObject.question,ui:'default'}
        returnObject.answer = [var1,var2];
        returnObject.uiComponent='mathjax2inputs';
        
      return returnObject;
    };

    exports.generateLinearGraphs = (
      level = 1,
    ) => {
      let num1,num2,num3,num4,num5,num6,num7,num8;
      let one,two,three,four;
      let lefttext1,lefttext2,lefttext3;
      let righttext1, righttext2;
      let numberssingle = helpers.generateNumbers(5, 1);
      let item;
      var itemoption = ["x","z","t"];
          item = itemoption[Math.floor(Math.random() * itemoption.length)];
      
      
      let rand = [-1, 1];
      numberssingle[0] = Math.max(numberssingle[0],1)*rand[helpers.oneOrZero()];
      numberssingle[1] = Math.max(numberssingle[1],1)*rand[helpers.oneOrZero()];
      numberssingle[2] = Math.max(numberssingle[2],1)*rand[helpers.oneOrZero()];
      numberssingle[3] = Math.max(numberssingle[3],1)*rand[helpers.oneOrZero()];
      numberssingle[4] = Math.max(numberssingle[4],1)*rand[helpers.oneOrZero()];
      
      let sign1 ='';
      let sign2 ='';
      let sign3 ='';
      let sign4 ='';
      
      let  returnObject = { question: [], answer: [], uiComponent: 'default' }
      
      switch(level){
        case 1:
          returnObject.answer = [numberssingle[1],numberssingle[0]];
          
          lefttext1 = ''
          lefttext2 = ''
          righttext1 = 'x'
          
          returnObject.question = {rightTexts:[righttext1,''],leftTexts:[lefttext1,lefttext2],coordinates:[helpers.getCoordinates_mxc(numberssingle[1],numberssingle[0])],title:`Write the equation of graph shown above`}
          returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
          returnObject.uiComponent='victory';
          break;
        case 2:
          //question page show graphs of 3x-5
          //question options 2x-5, 4x-5, 3x-5, 3x-4
          returnObject.answer = [`${numberssingle[1]}${item}${numberssingle[0]}`];
          returnObject.question = {from: [[`${numberssingle[1]}${item}${numberssingle[0]}`], [`${numberssingle[1]+1}${item}${numberssingle[0]+1}`]] , rightTexts:[righttext1,''],leftTexts:[lefttext1,lefttext2],coordinates:[helpers.getCoordinates_mxc(numberssingle[1],numberssingle[0])],title:`${numberssingle[1]},${numberssingle[0]} Click the equation of graph shown above`}
          returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
          returnObject.uiComponent='victorybtn';
          break;
        case 3:
          returnObject.answer = [numberssingle[0],numberssingle[1],numberssingle[2]];
          //question page show graphs of 2x^2+3x-5
          righttext1 = 'x^{2}'
          righttext2 = 'x'
          lefttext3 = ' '
          returnObject.question = {rightTexts:[righttext1,righttext2],leftTexts:[lefttext1,lefttext2],coordinates:[helpers.getCoordinates_quad(numberssingle[0],numberssingle[1],numberssingle[2])],title:`${numberssingle[0]},${numberssingle[1]},${numberssingle[2]}Write the equation of graph shown above`}
          returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
          returnObject.uiComponent='victory3';
          break;
      }
      return returnObject;
    };
  