import validators from '../constants/validators';

exports.isValid = (type = 'default', value = '') =>
  validators[type.toLowerCase()].regex.test(value);


  exports.oneOrZero = () => {
    return Math.floor(Math.random() * 10) % 2;
  }
  
  exports.generateNumbers = (
    count = 1,
    length = Math.round(Math.random() * 5),
  ) => {
    const numbers = [];
    for (let i = 0; i < count; i++)
      numbers.push(Math.round(Math.random() * Math.pow(10, length)));
    return numbers;
  };
  
  exports.generateDecimalNumbers = (
    count = 1,
    length = 1,
    decimal = 1,
  ) => {
    const numbers = [];
    let whole,decimalnum,number;
    for (let i = 0; i < count; i++){
      whole = Math.round(Math.random() * Math.pow(10, length))
      decimalnum = +(Math.random()).toFixed(decimal);
      //Number.parseFloat
      number = +(eval(whole+'+'+decimalnum)).toFixed(decimal);
      numbers.push(number);
    }
    return numbers;
  };
  
  exports.generateOperators = (count = 1) => {
    const operators = [];
    for (let i = 0; i < count; i++)
      operators.push(['*', '/', '+', '-'][Math.floor(Math.random() * 4)]);
    return operators;
  };
  
  exports.evalOperation = (operation, floatCount = null) => {
    console.log(operation);
    operation = operation.replace('x', '*');
    operation = operation.replace('÷', '/');
    console.log(operation);
    const number = Number(eval(operation));
    if (floatCount && typeof floatCount === 'number')
      return number.toFixed(floatCount);
    return number;
    //return 10;
  };
  
  exports.gcdfn = (numerator, denominator) => {
    let gcd = (a, b) => (b ? gcd(b, a % b) : a);
    gcd = Math.abs(gcd(Number(numerator), Number(denominator)));  
    return gcd;
  };
  

  exports.simplify = (numerator, denominator) => {
    let gcd = (a, b) => (b ? gcd(b, a % b) : a);
    gcd = Math.abs(gcd(Number(numerator), Number(denominator)));
    if(denominator<0 && numerator<0){
      denominator = Math.abs(denominator)
      numerator = Math.abs(numerator)
    }else if(denominator<0){
      numerator = numerator *-1
      denominator = Math.abs(denominator)
    }
    return [Number(numerator) / gcd, Number(denominator) / gcd];
  };
  
  exports.round = (number, decimalPlaces=0) => {
    const factorOfTen = Math.pow(10, decimalPlaces)
    return Math.round(number * factorOfTen) / factorOfTen
  }

  exports.infrontx = (number)=>{
    if (number == '1') {
      number ='';
    }else if(number == '-1') {
      number ='-';
    }
  return number;
  };

  exports.afterx = (number)=>{
  if (number < '0') {
    number =`${number}` ;
  }else{
    number =`+${number}` ;
  }
  return number;
};

exports.infrontxmid = (number)=>{
  if(number==1){
    number = '+'
  }else if(number==-1){
    number = '-'
  }else{
    if (number < '0') {
      number =`${number}` ;
    }else{
      number =`+${number}` ;
    }
  
  }
  
    return number;
};


exports.shuffle = (array)=> {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

exports.toword = (number)=>{
 
    if ((number < 0) || (number > 999999999)) 
    { 
        return "NUMBER OUT OF RANGE!";
    }
    var Gn = Math.floor(number / 10000000);  /* Crore */ 
    number -= Gn * 10000000; 
    var kn = Math.floor(number / 100000);     /* lakhs */ 
    number -= kn * 100000; 
    var Hn = Math.floor(number / 1000);      /* thousand */ 
    number -= Hn * 1000; 
    var Dn = Math.floor(number / 100);       /* Tens (deca) */ 
    number = number % 100;               /* Ones */ 
    var tn= Math.floor(number / 10); 
    var one=Math.floor(number % 10); 
    var res = ""; 

    if (Gn>0) 
    { 
        res += (convert_number(Gn) + " CRORE"); 
    } 
    if (kn>0) 
    { 
            res += (((res=="") ? "" : " ") + 
            convert_number(kn) + " LAKH"); 
    } 
    if (Hn>0) 
    { 
        res += (((res=="") ? "" : " ") +
            convert_number(Hn) + " THOUSAND"); 
    } 

    if (Dn) 
    { 
        res += (((res=="") ? "" : " ") + 
            convert_number(Dn) + " HUNDRED"); 
    } 


    var ones = Array("", "one", "two", "three", "four", "five", "six","seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen","fourteen", "fifteen", "sixteen", "seventeen", "eighteen","nineteen"); 
    var tens = Array("", "", "twenty", "thirty", "fourty", "fifty", "sixty","seventy", "eighty", "ninety"); 

    if (tn>0 || one>0) 
    { 
        if (!(res=="")) 
        { 
            res += " AND "; 
        } 
        if (tn < 2) 
        { 
            res += ones[tn * 10 + one]; 
        } 
        else 
        { 

            res += tens[tn];
            if (one>0) 
            { 
                res += (" " + ones[one]); 
            } 
        } 
    }

    if (res=="")
    { 
        res = "zero"; 
    } 
    return res;
}

var _cf = (function() {
  function _shift(x) {
    var parts = x.toString().split('.');
    return (parts.length < 2) ? 1 : Math.pow(10, parts[1].length);
  }
  return function() { 
    return Array.prototype.reduce.call(arguments, function (prev, next) { return prev === undefined || next === undefined ? undefined : Math.max(prev, _shift (next)); }, -Infinity);
  };
})();
//following 4 functions to deal with decimal calcs

exports.roundNumber = function (number, decimals = 12) {
  var newnumber = new Number(number+'').toFixed(parseInt(decimals));
  return parseFloat(newnumber); 
}


exports.getCoordinates_mxc = function(m,c,range=[-3,3]){
  let coordinates = [];
  let y;
  for(let x=range[0];x<=range[1];x++){
    y = m*x+c;
    coordinates.push({x:x,y:y});
  }
  //coordinates.push({x:(-c/m),y:0});

  return coordinates;
}


exports.getCoordinates_quad = function(a,b,c,range=[-5,5]){
  let coordinates = [];
  let y;
  for(let x=range[0];x<=range[1];x++){
    y = a*(x*x)+b*x+c;
    coordinates.push({x:x,y:y});
  }
  //coordinates.push({x:(-c/m),y:0});

  return coordinates;
}

exports.roundUp =function (num, precision=0) {
  precision = Math.pow(10, precision)
  return Math.ceil(num * precision) / precision
}

exports.convertMinsToHrsMins = function(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${h}:${m}`;
}

exports.getArrayDepth = function(value) {
  return Array.isArray(value) ? 
    1 + Math.max(...value.map(exports.getArrayDepth)) :
    0;
}