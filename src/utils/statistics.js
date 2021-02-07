import helpers from './helpers'
import { imageSource } from './imageSource';

exports.generateMode = (
  level = 1,
) => {
  let  returnObject = { question: [], answer: [], uiComponent: 'default' }
  let multiplier, qnnum;
  let lefttext1,lefttext2
    let righttext1,righttext2
  const numbers = helpers.generateNumbers(4,1);
 let response, responselist,responselista,responselistb;
  switch (level) {
    case 1:
      
      responselist = helpers.shuffle([numbers[0],numbers[0]+numbers[1],numbers[0]+numbers[1],numbers[0]+numbers[1],numbers[0]+numbers[2]]);
      qnnum = responselist.length;
      response  = {leftTexts:['2007: '],rightTexts:['',''],title:"What is the mode of the following data:",headers:['July', '2007'],
      rows:[
        [
          {x:'1st', y:responselist[0]},
          {x:'2nd', y:responselist[1]},
          {x:'3rd', y:responselist[2]},
          {x:'4th', y:responselist[3]},
          {x:'5th', y:responselist[4]},
        ],
      ]
    };
      returnObject.question = response;
      returnObject.answer = [numbers[0]+numbers[1]];
      returnObject.uiComponent = 'victory-bar-one'
      break;
    case 2:
     //Show responselist in table and ask
     //The table shows the temperatures, in ^{o}C, 
     //for the first 5 days of May in 2019 in London. What the is mode of the data? 
     responselista = helpers.shuffle([numbers[0],numbers[0]+numbers[1],numbers[0]+numbers[1],numbers[0]+numbers[1],numbers[0]+numbers[2]]);
     responselistb = helpers.shuffle([numbers[0],numbers[0]+numbers[1],numbers[0]+numbers[1],numbers[0]+numbers[1],numbers[0]+numbers[2]]);
        
        response = `The table show the temparatures, in degrees, for the first 5 days of July in 2007 and 2008 in Coventry. What is the mode in each year?`;
        returnObject.question = {leftTexts:['2007: ','2008: '],rightTexts:[' ,',''],title:response,headers:['July', '2007', '2008'],rows:[
          ['1st', responselista[0], responselistb[0]],
          ['2nd', responselista[1], responselistb[1]],
          ['3rd', responselista[2], responselistb[2]],
          ['4th', responselista[3], responselistb[3]],
          ['5th', responselista[4], responselistb[4]]
        ],anserSet:helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]])};
        returnObject.answer = [numbers[0]+numbers[1],numbers[1]+numbers[1]];
        returnObject.uiComponent = 'table2'
      break;
    case 3:
        responselista = helpers.shuffle([numbers[0],numbers[0]+numbers[1],numbers[0]+numbers[1],numbers[0]+numbers[1],numbers[0]+numbers[2]]);
        responselistb = helpers.shuffle([numbers[1],numbers[1]+numbers[1],numbers[1]+numbers[1],numbers[1]+numbers[1],numbers[1]+numbers[2]]);
        response = `The table show the temperatures, in degrees, for the first 5 days of July in 2007 and 2008 in Coventry. What is the mode of the data in each year?`;
        //need to add victory group and show 2008 data i.e. responselistb barchart next to it
        returnObject.question = {labels:[{name:'2007'},{name:'2008'}],leftTexts:['2007: ','2008: '],rightTexts:[' ,',''],title:response,headers:['July', '2007'],
          rows:[
            [
              {x:'1st', y:responselista[0]},
              {x:'2nd', y:responselista[1]},
              {x:'3rd', y:responselista[2]},
              {x:'4th', y:responselista[3]},
              {x:'5th', y:responselista[4]},
            ],
            [
              {x:'1st', y:responselistb[0]},
              {x:'2nd', y:responselistb[1]},
              {x:'3rd', y:responselistb[2]},
              {x:'4th', y:responselistb[3]},
              {x:'5th', y:responselistb[4]},
            ],
          ]
        };
        qnnum = responselista.length;
        returnObject.answer = [numbers[0]+numbers[1],numbers[1]+numbers[1]];
        returnObject.uiComponent = 'victory-bar'
        break;   
    case 4:
        let coordvalues, coordvalues1, cordvalues1,coordvalues2
        
        responselista = helpers.shuffle([numbers[0],numbers[0]+numbers[1],numbers[0]+numbers[1],numbers[0]+numbers[1],numbers[0]+numbers[2]]);
        responselistb = helpers.shuffle([numbers[1],numbers[1]+numbers[1],numbers[1]+numbers[1],numbers[1]+numbers[1],numbers[1]+numbers[2]]);
        coordvalues1=[[
          { x: 1, y: responselista[0]},
          { x: 2, y: responselista[1] },
          { x: 3, y: responselista[2] },
          { x: 4, y: responselista[3]},
          { x: 5, y: responselista[4] }
        ],[
          { x: 1, y: responselistb[0]},
          { x: 2, y: responselistb[1]},
          { x: 3, y: responselistb[2]},
          { x: 4, y: responselistb[3]},
          { x: 5, y: responselistb[4]}
        ]];
  
        returnObject.answer = [numbers[0]+numbers[1],numbers[1]+numbers[1]];
        
        lefttext1 = ''
        lefttext2 = ''
        righttext1 = ''
          
          returnObject.question = {labels:[{name:'2007'},{name:'2008'}],rightTexts:[righttext1,''],leftTexts:[lefttext1,lefttext2],coordinates:coordvalues1,title:`Temperature of first 5 days is showin in the line graph. What was the temperature mode in each year?`}
          returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
          returnObject.uiComponent='victory';
        break;
  }
         
 
  returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
  return returnObject
};

exports.generateMedian = (
    level = 1,
  ) => {
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    let multiplier, qnnum,answer;
    let lefttext1,lefttext2
    let righttext1,righttext2
    let num1,num2,num3,num4,num5
    const numbers = helpers.generateNumbers(4,1);
   let response,responselist, responselista,responselistb;
    switch (level) {
      case 1:
        
        responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        qnnum = responselista.length;
        response = `What is the median of these ${qnnum} numbers? ${responselista}`;
        responselist = responselista.sort(function(a, b){return a-b});
        
        
        returnObject.question = response;
        returnObject.answer = [responselist[2]];
        break;
      case 2:
        responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        responselistb = helpers.shuffle([numbers[0],numbers[2],numbers[2],numbers[2],numbers[3]]);
        response = `The table show the temparatures, in degrees, for the first 5 days of July in 2007 and 2008 in Coventry. What is the median of each year`;
        returnObject.question = {leftTexts:['2007: ','2008: '],rightTexts:[' ,',''],title:response,headers:['July', '2007', '2008'],rows:[
          ['1st', responselista[0], responselistb[0]],
          ['2nd', responselista[1], responselistb[1]],
          ['3rd', responselista[2], responselistb[2]],
          ['4th', responselista[3], responselistb[3]],
          ['5th', responselista[4], responselistb[4]]
        ],anserSet:helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]])};
        responselist = responselista.sort(function(a, b){return a-b});
        responselista = responselistb.sort(function(a, b){return a-b});
        returnObject.answer = [responselist[2],responselistb[2]];
        returnObject.uiComponent = 'table'
        break;
        case 3:
          responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
          responselistb = helpers.shuffle([numbers[0],numbers[2],numbers[2],numbers[2],numbers[3]]);
          response = `The table show the temperatures, in degrees, for the first 5 days of July in 2007 and 2008 in Coventry. What is the median of the each year`;
          //need to add victory group and show 2008 data i.e. responselistb barchart next to it
          returnObject.question = {leftTexts:['2007: ','2008: '],rightTexts:[' ,',''],title:response,headers:['July', '2007'],
            rows:[
              [
                {x:'1st', y:responselista[0]},
                {x:'2nd', y:responselista[1]},
                {x:'3rd', y:responselista[2]},
                {x:'4th', y:responselista[3]},
                {x:'5th', y:responselista[4]},
              ],
              [
                {x:'1st', y:responselistb[0]},
                {x:'2nd', y:responselistb[1]},
                {x:'3rd', y:responselistb[2]},
                {x:'4th', y:responselistb[3]},
                {x:'5th', y:responselistb[4]},
              ],
            ],
            labels:[{name:'2007'},{name:'2008'}]
          };
          qnnum = responselista.length;
          responselist = responselista.sort(function(a, b){return a-b});
          responselista = responselistb.sort(function(a, b){return a-b});
          returnObject.answer = [responselist[2],responselistb]
          returnObject.uiComponent = 'victory-bar'
          break;   
          case 4:
          let coordvalues, coordvalues1, cordvalues1,coordvalues2
          
          responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
          responselistb = helpers.shuffle([numbers[0],numbers[0],numbers[1],numbers[3],numbers[3]]);
          coordvalues1=[[
            { x: 1, y: responselista[0]},
            { x: 2, y: responselista[1] },
            { x: 3, y: responselista[2] },
            { x: 4, y: responselista[3]},
            { x: 5, y: responselista[4] }
          ],[
            { x: 1, y: responselistb[0]},
            { x: 2, y: responselistb[1]},
            { x: 3, y: responselistb[2]},
            { x: 4, y: responselistb[3]},
            { x: 5, y: responselistb[4]}
          ]];
          let labels=[{name:'2007'},{name:'2008'}]
          responselist = responselista.sort(function(a, b){return a-b});
          responselista = responselistb.sort(function(a, b){return a-b});
          returnObject.answer = [responselist[2],responselistb]
          
          lefttext1 = ''
          lefttext2 = ''
          righttext1 = ''
            
            returnObject.question = {leftTexts:['2007: ','2008: '],rightTexts:[righttext1,''],coordinates:coordvalues1,labels:labels,title:`Temperature of first 5 days is showin in the line graph. What was the temperature median in each year?`}
            returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
            returnObject.uiComponent='victory';
          break;  
          case 5:
            num1 = numbers[0]
            num2 = num1+numbers[1]
            num3 = num2+numbers[0]
            num4 = num3+numbers[2]
            num5 = num4+numbers[3]
            responselista = [num1,num2,num3,num4,num5].sort(function(a, b){return a-b});
            responselistb = [num1,num2,num3,num4,num5].sort(function(a, b){return a-b});
            response = `The box plots show the temperatures, in degrees, for the first 5 days of July in 2007 and 2008 in Coventry. What is the median of each year?`;
            //need to add victory box plot and show 2008 data i.e. responselistb boxplot next to it
            returnObject.question = {leftTexts:['2007: ','2008: '],rightTexts:[' ,',''],title:response,headers:['July', '2007'],
              rows:[
                [
                  {x:'1st', y:responselista[0]},
                  {x:'2nd', y:responselista[1]},
                  {x:'3rd', y:responselista[2]},
                  {x:'4th', y:responselista[3]},
                  {x:'5th', y:responselista[4]},
                ],
                [
                  {x:'1st', y:responselistb[0]},
                  {x:'2nd', y:responselistb[1]},
                  {x:'3rd', y:responselistb[2]},
                  {x:'4th', y:responselistb[3]},
                  {x:'5th', y:responselistb[4]},
                ],
              ]
            };
            
            
            answer = num3
            returnObject.answer = [answer];
            returnObject.uiComponent = 'victory-bar'
            break;   
             
    }
     
   
    returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
    return returnObject
  };

  exports.generateStRange = (
    level = 1,
  ) => {
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    let answer, qnnum;
    let lefttext1,lefttext2
    let righttext1,righttext2
    let num1,num2,num3,num4,num5
    const numbers = helpers.generateNumbers(5,1);
   let response,responselist, responselista,responselistb;
    switch (level) {
      case 1:
        
        responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        qnnum = responselista.length;
        
        responselist = responselista.sort(function(a, b){return a-b});
        answer = responselist[qnnum-1]-responselist[0]
        response = `What is the range of these ${qnnum} numbers? ${responselista}`;
        returnObject.question = response;
        returnObject.answer = [answer];
        break;
      case 2:
        responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        responselistb = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        response = `The table show the temparatures, in degrees, for the first 5 days of July in 2007 and 2008 in Coventry. What is the range of the data for each year?`;
        returnObject.question = {leftTexts:['2007: ','2008: '],rightTexts:[' ,',''],title:response,headers:['July', '2007', '2008'],rows:[
          ['1st', responselista[0], responselistb[0]],
          ['2nd', responselista[1], responselistb[1]],
          ['3rd', responselista[2], responselistb[2]],
          ['4th', responselista[3], responselistb[3]],
          ['5th', responselista[4], responselistb[4]]
        ],anserSet:helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]])};
        qnnum = responselista.length;
        responselist = responselista.sort(function(a, b){return a-b});
        answer = responselist[qnnum-1]-responselist[0]  
        returnObject.answer = [answer];
        returnObject.uiComponent = 'table'
        break;
      case 3:
      responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
      responselistb = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
      response = `The table show the temperatures, in degrees, for the first 5 days of July in 2007 and 2008 in Coventry. What is the range of the data for each year?`;
      //need to add victory group and show 2008 data i.e. responselistb barchart next to it
      returnObject.question = {leftTexts:['2007: ','2008: '],rightTexts:[' ,',''],title:response,headers:['July', '2007'],
        rows:[
          [
            {x:'1st', y:responselista[0]},
            {x:'2nd', y:responselista[1]},
            {x:'3rd', y:responselista[2]},
            {x:'4th', y:responselista[3]},
            {x:'5th', y:responselista[4]},
          ],
          [
            {x:'1st', y:responselistb[0]},
            {x:'2nd', y:responselistb[1]},
            {x:'3rd', y:responselistb[2]},
            {x:'4th', y:responselistb[3]},
            {x:'5th', y:responselistb[4]},
          ],
        ]
      };
      qnnum = responselista.length;
      responselist = responselista.sort(function(a, b){return a-b});
      answer = responselist[qnnum-1]-responselist[0]  
      returnObject.answer = [answer];
      returnObject.uiComponent = 'victory-bar'
      break;   
      case 4:
      let coordvalues, coordvalues1, cordvalues1,coordvalues2
      
      responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
      responselistb = helpers.shuffle([numbers[0],numbers[0],numbers[1],numbers[3],numbers[3]]);
      coordvalues1=[[
        { x: 1, y: responselista[0]},
        { x: 2, y: responselista[1] },
        { x: 3, y: responselista[2] },
        { x: 4, y: responselista[3]},
        { x: 5, y: responselista[4] }
      ],[
        { x: 1, y: responselistb[0]},
        { x: 2, y: responselistb[1]},
        { x: 3, y: responselistb[2]},
        { x: 4, y: responselistb[3]},
        { x: 5, y: responselistb[4]}
      ]];

      responselist = responselista.sort(function(a, b){return a-b});
        answer = responselist[qnnum-1]-responselist[0]  
        returnObject.answer = [answer];
      
      lefttext1 = ''
      lefttext2 = ''
      righttext1 = ''
        
        returnObject.question = {rightTexts:[righttext1,''],leftTexts:['2007: ','2008: '],coordinates:coordvalues1,title:`Temperature of first 5 days is showin in the line graph. What is the range of the data for each year?`}
        returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
        returnObject.uiComponent='victory';
      break;
      case 5:
          num1 = numbers[0]
          num2 = num1+numbers[1]
          num3 = num2+numbers[2]
          num4 = num3+numbers[3]
          num5 = num4+numbers[4]
          responselista = [num1,num2,num3,num4,num5].sort(function(a, b){return a-b});
          num1 = numbers[4]
          num2 = num1+numbers[2]
          num3 = num2+numbers[3]
          num4 = num3+numbers[1]
          num5 = num4+numbers[0]
          responselistb = [num1,num2,num3,num4,num5].sort(function(a, b){return a-b});
          response = `The box plots show the temperatures, in degrees, for the first 5 days of July in Coventry. What is the range of the data for 2008?`;
          //need to add victory box plot and show 2008 data i.e. responselistb boxplot next to it
          returnObject.question = {leftTexts:['',''],rightTexts:[' ',''],title:response,xLabel:"years",
            rows:[
              [
                { x: '2007', y: [responselista[0], responselista[1], responselista[2], responselista[3],responselista[4] ] },
                { x: '2008', y: [responselistb[0], responselistb[1], responselistb[2], responselistb[3],responselistb[4] ] },
              ]
            ]
          };
          
          
          answer = num5-num1 
          returnObject.answer = [answer];
          returnObject.uiComponent = 'boxplot-one'
          break;   
        
    }
     
   
    returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
    return returnObject
  };

  exports.generateMean= (
    level = 1,
  ) => {
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    let multiplier, qnnum;
    let lefttext1,lefttext2
    let righttext1,righttext2
    
    const numbers = helpers.generateNumbers(4,1);
   let answer,response,responselist, responselista,responselistb;
    switch (level) {
      case 1:
        
        responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        qnnum = responselista.length;     
        answer = +((numbers[0]+numbers[1]+numbers[1]+numbers[2]+numbers[3])/qnnum).toFixed(2)
        response = `Michael asks ${qnnum} classmates how many cousins they have. Here are the results: ${responselista}. Workout the mean number of cousins.`;
        returnObject.question = response;
        returnObject.answer = [answer];
        break;
      case 2:
        responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        responselistb = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        qnnum = responselista.length;  
        answer = +((numbers[0]+numbers[1]+numbers[1]+numbers[2]+numbers[3])/qnnum).toFixed(2)  
        responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        responselistb = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        response = `The table show the temparatures, in degrees, for the first 5 days of July in 2007 and 2008 in Coventry. What is the mean of the data for each year?`;
        returnObject.question = {leftTexts:['2007: ','2008: '],rightTexts:[' ,',''],title:response,headers:['July', '2007', '2008'],rows:[
          ['1st', responselista[0], responselistb[0]],
          ['2nd', responselista[1], responselistb[1]],
          ['3rd', responselista[2], responselistb[2]],
          ['4th', responselista[3], responselistb[3]],
          ['5th', responselista[4], responselistb[4]]
        ]};
             
        returnObject.answer = [answer];
        returnObject.uiComponent = 'table'
     
    
        break;
        case 3:
          responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
          responselistb = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
          response = `The table show the temperatures, in degrees, for the first 5 days of July in 2007 and 2008 in Coventry. What is the mean of the data for each year?`;
          //need to add victory group and show 2008 data i.e. responselistb barchart next to it
          returnObject.question = {leftTexts:['2007: ','2008: '],rightTexts:[' ,',''],title:response,headers:['July', '2007'],
            rows:[
              [
                {x:'1st', y:responselista[0]},
                {x:'2nd', y:responselista[1]},
                {x:'3rd', y:responselista[2]},
                {x:'4th', y:responselista[3]},
                {x:'5th', y:responselista[4]},
              ],
              [
                {x:'1st', y:responselistb[0]},
                {x:'2nd', y:responselistb[1]},
                {x:'3rd', y:responselistb[2]},
                {x:'4th', y:responselistb[3]},
                {x:'5th', y:responselistb[4]},
              ],
            ]
          };
          qnnum = responselista.length;
          responselist = responselista.sort(function(a, b){return a-b});
          answer = responselist[qnnum-1]-responselist[0]  
          returnObject.answer = [answer];
          returnObject.uiComponent = 'victory-bar'
          break;   
          case 4:
          let coordvalues, coordvalues1, cordvalues1,coordvalues2
          
          responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
          responselistb = helpers.shuffle([numbers[0],numbers[0],numbers[1],numbers[3],numbers[3]]);
          coordvalues1=[[
            { x: 1, y: responselista[0]},
            { x: 2, y: responselista[1] },
            { x: 3, y: responselista[2] },
            { x: 4, y: responselista[3]},
            { x: 5, y: responselista[4] }
          ],[
            { x: 1, y: responselistb[0]},
            { x: 2, y: responselistb[1]},
            { x: 3, y: responselistb[2]},
            { x: 4, y: responselistb[3]},
            { x: 5, y: responselistb[4]}
          ]];
    
          returnObject.answer = [1];
          
          lefttext1 = ''
          lefttext2 = ''
          righttext1 = ''
            
            returnObject.question = {rightTexts:[righttext1,''],leftTexts:['2007: ','2008: '],coordinates:coordvalues1,title:`Temperature of first 5 days is showin in the line graph. What is the mean of the data for each year?`}
            returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'default'}
            returnObject.uiComponent='victory';
          break;
          
    }
     
   
    returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
    return returnObject
  };

  exports.generateTimeSeries = (
    level = 1,
  ) => {
    let  returnObject = { question: [], answer: [], uiComponent: 'tablebtn' }
    let answer, qnnum,responselista,responselistb;
    const numbers = helpers.generateNumbers(4,1);
   let response, responselist;
    switch (level) {
      case 1:
        //show data table like
        
        responselist = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        qnnum = responselist.length;
        response = `The last 4‑point moving average is missing from the table. Calculate this 4‑point moving average.`;
        returnObject.question = {title:response,headers:['Head', 'Head33', 'Head3', 'Head4'],rows:[
          [Math.random(), '2', '3', '4'],
          ['a', 'b', 'c', 'd'],
          ['1', '2', '3', '456'],
          ['a', 'b', 'c', 'd']
        ],anserSet:helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]])};
        returnObject.answer = [numbers[1]];
        break;
      case 2:
        responselista = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        responselistb = helpers.shuffle([numbers[0],numbers[1],numbers[1],numbers[2],numbers[3]]);
        qnnum = responselista.length;  
        answer = +((numbers[0]+numbers[1]+numbers[1]+numbers[2]+numbers[3])/qnnum).toFixed(2)  
        response = `${answer}The bar chart shows the temparatures, in degrees, for the first 5 days of July in 2007 in Coventry. What is the mean of the 2007 data`;
        returnObject.question = {leftTexts:['2007: ','2008: '],rightTexts:[' ,',''],title:response,headers:['July', '2007'],rows:[
          ['1st', '<input>'],
          ['2nd', responselista[1]],
          ['3rd', responselista[2]],
          ['4th', responselista[3]],
          ['5th', responselista[4]]
        ]};
        responselist = responselista.sort(function(a, b){return a-b});
        
        returnObject.answer = [answer];
        returnObject.uiComponent = 'table'
      break;
    }
     
   
    returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
    return returnObject
  };
  

  exports.generateTallyTable = (
    level = 1,
  ) => {
    let  returnObject = { question: [], answer: [], uiComponent: 'tablebtn' }
    let answer, qnnum,responselista,responselistb;
    const numbers = helpers.generateNumbers(10,1);
    let ans1,ans2,ans3,ans4;
   let response, responselist;
    switch (level) {
      case 1:
        ans1 = numbers.filter(x => x<3).length;
        ans2 = numbers.filter(x => x<5).length;
        ans3 = numbers.filter(x => x<8).length;
        ans4 = numbers.filter(x => x<11).length;
        qnnum = numbers.length;  
        answer = [[qnnum],[ans1],[ans2-ans1],[ans3-ans2],[ans4-ans3]]
        response = `The following temperature data is recorded chart, in degrees, complete the frequency table. And state the total data points. ${'\n'} ${numbers}`;
        returnObject.question = {leftTexts:['Total: '],rightTexts:[],title:response,headers:['Temp.', 'Frequency'],rows:[
          ['0-2', '<input>'],
          ['3-4', '<input>'],
          ['5-7', '<input>'],
          ['8-10', '<input>']
        ],inputs:true};
        
        //show left text /right text in default view.
        returnObject.answer = answer;
        returnObject.uiComponent = 'table'
      break;
    }
     
   
    returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
    return returnObject
  };

  exports.generateProbability = (level = 1) => {
 

    let returnObject = {
      question: [],
      answer: [],
      uiComponent: 'default',
      imagePath: '',
    };
    let item, typeqn,colorqn,title,name,answer;
    switch (level) {
      case 1:
        var itemoption = [
          ['problikely1',['red'],['yellow'],['blue','green']],
          ['problikely2',['yellow'],['blue','green'],['red']],
          ['problikely3',['green','yellow'],[''],['blue','red']],
        ];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
        var typeqnoption = [
          'more likely','equally likely','less likely'
        ];
        typeqn = typeqnoption[Math.floor(Math.random() * typeqnoption.length)];
        var coloroption = [
          "green","yellow","red","blue"
        ];
        colorqn = coloroption[Math.floor(Math.random() * coloroption.length)];
        returnObject.answer = [item[0]];
        if ((typeqn == 'more likely') && ((item[1].includes(colorqn))===true)){
          answer = 'TRUE'
        }else if ((typeqn == 'equally likely') && ((item[2].includes(colorqn))===true)){
          answer = 'TRUE'
        }else if ((typeqn == 'less likely') && ((item[3].includes(colorqn))===true)){
          answer = 'TRUE'
        }else{
          answer = 'FALSE'
        }     

        title = `Michelle has two spinners, X and Y. Landing on colour ${colorqn} shape is ${typeqn} on X than Y?`;
        returnObject.question = {
          title: title,
          from: [
            'TRUE',
            'FALSE',
          ],
        };
        //below line shange png to item[0].png
        returnObject.image = imageSource[item[0]]; // require(`./../assets/img/questions/${item[0]}.png`)
        returnObject.uiComponent = 'buttonAnswer';
        returnObject.storeQuiz = { title: title, content: title, ui: 'basic' };
        returnObject.imageSourceType = item[0];
        returnObject.answer = [answer];
        break;
    }
  
    return returnObject;
  };

  
  exports.generateDataAnalysis = (
    level = 1,
  ) => {
    let  returnObject = { question: [], answer: [], uiComponent: 'default' }
    let answer, qnnum,qnnum2,qnnum3,temp;
    let lefttext1,lefttext2
      let righttext1,righttext2
    const numbers = helpers.generateNumbers(4,1);
   let response, responselist,responselista,responselistb,responselistc;
    switch (level) {
      
        case 1:
          responselista = helpers.shuffle([numbers[0],numbers[1],numbers[2],numbers[3],numbers[3]]);
          qnnum = responselista.indexOf(Math.max(...responselista))
          responselista[qnnum] = Math.max(...responselista)+5
          answer = qnnum+1
          qnnum =responselista.reduce(function(a, b){return a+b;})
          response = `Jason recorded how many new students join the maths club in the first week of July. Here are the results
            ${`\n`} A)   On which day of the week did most students join?
            ${`\n`} B)   How many students joined in total that week?    
            `;
          //need to add victory group and show 2008 data i.e. responselistb barchart next to it
          returnObject.question = {leftTexts:['A: ','B: '],rightTexts:[' ,',''],title:response,headers:['July', '2007'],
            rows:[
              [
                {x:'1', y:responselista[0]},
                {x:'2', y:responselista[1]},
                {x:'3', y:responselista[2]},
                {x:'4', y:responselista[3]},
                {x:'5', y:responselista[4]},
              ],
            ]
          };
          
          returnObject.answer = [answer,qnnum];
          returnObject.uiComponent = 'victory-bar'
          break;
          case 2:
          responselista = helpers.shuffle([numbers[0],numbers[1],numbers[2],numbers[3],numbers[3]]);
          responselistb = responselista.slice(0);
          responselistc = responselista.slice(0);
          responselist = ['3','4']
          qnnum = responselist[Math.floor(Math.random() * responselist.length)];
          responselist = ['0','1','2']
          qnnum2 = responselist[Math.floor(Math.random() * responselist.length)];
          if (qnnum = 4 ){
            temp = qnnum-1
          }else{
          temp = qnnum+1
          }
          responselista[temp] = responselista[temp]+1
          responselistb[temp] = responselistb[temp]+2
          responselistc[temp] = responselistc[temp]+3
          if (qnnum2 = 2 ){
            qnnum3 = qnnum2-1
            temp = 0
          }else{
          qnnum3 = qnnum2+1
          qnnum2 = 1 ? temp =0 :temp = 1
          }
          responselista[temp] = responselista[temp]+1
          responselistb[temp] = responselistb[temp]+4
          responselistc[temp] = responselistc[temp]+3

          responselistb[qnnum] = responselistc[qnnum]+5

          responselista[qnnum2] = responselistc[qnnum2]+5
          responselistb[qnnum2] = responselistc[qnnum2]+10
          
          responselista[qnnum3] = responselistb[qnnum3]+2
          answer = responselista.indexOf(Math.max(...responselista))+1
        
          response = `The results of a game show are shown for 5 rounds for maths clubs X  Y and Z.
            ${`\n`} A)   In which round did club X beat club Y?
            ${`\n`} B)   In which round did club X beat club Z by 5 points?   
            ${`\n`} C)   In which round did club Y beat club Z by 5 points? 
            `;
          //need to add victory group and show 2008 data i.e. responselistb barchart next to it
          returnObject.question = {labels:[{name:'X'},{name:'Y'},{name:'Z'}],leftTexts:['A: ','B: ','C: '],rightTexts:[' ',''],title:response,headers:['July', '2007'],
            rows:[
              [
                {x:1, y:responselista[0]},
                {x:2, y:responselista[1]},
                {x:3, y:responselista[2]},
                {x:4, y:responselista[3]},
                {x:5, y:responselista[4]},
              ],
              [
                { x: 1, y: responselistb[0]},
                { x: 2, y: responselistb[1]},
                { x: 3, y: responselistb[2]},
                { x: 4, y: responselistb[3]},
                { x: 5, y: responselistb[4]}
              ],
              [
                { x: 1, y: responselistc[0]},
                { x: 2, y: responselistc[1]},
                { x: 3, y: responselistc[2]},
                { x: 4, y: responselistc[3]},
                { x: 5, y: responselistc[4]}
              ]
            ]
          };
          
          returnObject.answer = [qnnum3+1,qnnum2+1,qnnum+1];
          returnObject.uiComponent = 'victory-bar3'
          break;   
          
        }
           
   
    returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
    return returnObject
  };

  exports.generatePieCharts = (level = 1) => {
      let returnObject = { question: [], answer: [], uiComponent: 'PieInput1' };
      let qndetails;
      
      let itemset = ['balls', 'cars'];
      let item = itemset[helpers.oneOrZero()];
    
      let set, finder, numbers, balance, total, numbersCount,answer;
      
      switch (level) {
          case 1:
          qndetails = ['blue', 'green','yellow'];
          total = helpers.generateNumbers(1, 2);
          numbersCount = 2;
          numbers = helpers.generateNumbers(numbersCount, 2);
          while (eval(numbers[0] + numbers[1]) >= 360) {
            numbers = helpers.generateNumbers(numbersCount, 2);
          }
          balance = eval(360 - numbers[0] - numbers[1]);
          set = [
            [numbers[0], qndetails[0]],
            [numbers[1], qndetails[1]],
            [balance, qndetails[2]],
          ];
          //show set data in piechart
          finder = set[Math.floor(Math.random() * set.length)];
          answer = +(total*finder[0]/360).toFixed(2)
          
    
          returnObject.question = {data:[
            { x: "Cats", y: 35 },
            { x: "Dogs", y: 40 },
            { x: "Birds", y: 55 }
          ],title:`The pie chart shows ${total} ${item} counted by Ali in a day. How many ${finder[1]} ${item} did he count?`};
          returnObject.answer = [answer];
          returnObject.storeQuiz = {
            title: `There are.`,
            content: returnObject.question,
            ui: 'basic',
          };
          break;
        
      }
    
      return returnObject;
    };

    exports.generateBoxPlots = (
      level = 1,
    ) => {
      let  returnObject = { question: [], answer: [], uiComponent: 'default' }
      let answer, qnnum;
      let lefttext1,lefttext2, lefttext3
      let righttext1,righttext2
      let num1,num2,num3,num4,num5
      const numbers = helpers.generateNumbers(5,1);
     let response,responselist, responselista,responselistb;
      
            num1 = numbers[0]
            num2 = num1+numbers[1]
            num3 = num2+numbers[2]
            num4 = num3+numbers[3]
            num5 = num4+numbers[4]
            responselista = [num1,num2,num3,num4,num5].sort(function(a, b){return a-b});
            response = `The box plots show the temperatures, in degrees, for the first 5 days of July in Coventry. `;
            //need to add victory box plot and show 2008 data i.e. responselistb boxplot next to it
            
            
        switch (level) {
          case 1: 
          response = response+`What is the median of the data for each year?`     
            answer = num3 
            returnObject.answer = [answer];
            returnObject.uiComponent = 'boxplot-one'
            break;   
          case 2: 
          response = response+`What is the range of the data for each year?`     
            answer = num5-num1 
            returnObject.answer = [answer];
            returnObject.uiComponent = 'boxplot-one'
            break; 
          case 3: 
          response = response+`What is the interquartile range of the data for each year?`     
            answer = num4-num2 
            returnObject.answer = [answer];
            returnObject.uiComponent = 'boxplot-one'
            break; 
          case 4: 
        response = response+`What is the median, range and IQR range of the data for each year?`     
          answer = num4-num2 
          returnObject.answer = [answer];
          returnObject.uiComponent = 'boxplot-three'
           lefttext1 = 'Median'
           lefttext2 = 'Range' 
           lefttext3 = 'IQR'
          break; 
      }
       
      returnObject.question = {leftTexts:[lefttext1,lefttext2,lefttext3],rightTexts:[' ',''],title:response,xLabel:"",
      rows:[
        [
          { x: '-', y: [responselista[0], responselista[1], responselista[2], responselista[3],responselista[4] ] },
        ]
      ]
    };
      returnObject.storeQuiz = {title:returnObject.question,content:returnObject.question,ui:'basic'}
      return returnObject
    };
  