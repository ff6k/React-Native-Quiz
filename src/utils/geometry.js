import helpers from './helpers';
import { imageSource } from './imageSource';

exports.generateNameShapes = (level = 1) => {
 

  let returnObject = {
    question: [],
    answer: [],
    uiComponent: 'default',
    imagePath: '',
  };
  let item, title,name,answer;
  switch (level) {
    case 1:
      var itemoption = [
        ['square'],
        ['rectangle'],
        ['circle'],
        ['hexagon'],
        ['pentagon'],
        ['triangle'],
      ];
      item = itemoption[Math.floor(Math.random() * itemoption.length)];
      returnObject.answer = [item[0]];
      title = 'What shape is shown above?';
      returnObject.question = {
        title: title,
        from: [
          'square',
          'rectangle',
          'circle',
          'hexagon',
          'pentagon',
          'triangle',
        ],
      };
      //below line shange png to item[0].png
      returnObject.image = imageSource[item[0]]; // require(`./../assets/img/questions/${item[0]}.png`)
      returnObject.imageSourceType = item[0];
      returnObject.uiComponent = 'buttonAnswer';
      returnObject.storeQuiz = { title: title, content: title, ui: 'basic' };
      break;
    case 2:
      var itemoption = [['cube'], ['pyramid'], ['sphere'], ['cuboid']];
      item = itemoption[Math.floor(Math.random() * itemoption.length)];
      returnObject.answer = [item[0]];
      title = 'What shape is shown above?';
      returnObject.question = {
        title: title,
        from: ['cube', 'pyramid', 'sphere', 'cuboid'],
      };
      //below line shange png to item[0].png
      returnObject.image = imageSource[item[0]]; // require(`./../assets/img/questions/${item[0]}.png`)
      returnObject.imageSourceType = item[0];
      returnObject.uiComponent = 'buttonAnswer';

      returnObject.storeQuiz = { title: title, content: title, ui: 'basic' };

      break;
      case 3:
        var itemoption = [
          ["I have 8 vertices.","OCTAGON"],
          ["I have 3 sides.","TRIANGLE"],
          ["I have 4 right angles and all sides same lengths","SQUARE"],
          ["I have 4 right angles and not all sides have same lengths","RECTANGLE"],
          ["I have no vertices.","CIRCLE"],
        ];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
        returnObject.answer = [item[1]];
        title = `${item[0]}`;
        returnObject.question = {
          title: title,
          from: [
            'SQUARE',
            'RECTANGLE',
            'CIRCLE',
            'HEXAGON',
            'PENTAGON',
            'TRIANGLE',
            'OCTAGON',
          ],
        };
        //below line shange png to item[0].png
        returnObject.image = imageSource[item[0]]; // require(`./../assets/img/questions/${item[0]}.png`)
        returnObject.uiComponent = 'buttonAnswer';
        returnObject.storeQuiz = { title: title, content: title, ui: 'basic' };
        returnObject.imageSourceType = item[0];
      break;
      case 4:
        var itemoption = [
          ["I have 2 pairs of parallel sides. My diagonals meet at right angles.","SQUARE"],
          ["I have 3 pairs of parallel sides, but no perpendicular sides.","HEXAGON"],
          ["I have 1 pair of perpendicular sides but no parallel sides.","TRIANGLE"]
        ];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
        returnObject.answer = [item[1]];
        title = `${item[0]}`;
        returnObject.question = {
          title: title,
          from: [
            'SQUARE',
            'RECTANGLE',
            'CIRCLE',
            'HEXAGON',
            'PENTAGON',
            'TRIANGLE',
          ],
        };
        //below line shange png to item[0].png
        returnObject.image = imageSource[item[0]]; // require(`./../assets/img/questions/${item[0]}.png`)
        returnObject.uiComponent = 'buttonAnswer';
        returnObject.storeQuiz = { title: title, content: title, ui: 'basic' };
        returnObject.imageSourceType = item[0];
      break;
      case 5:
        var itemoption = [
          ["No pairs of parallel sides",["CIRCLE", "KITE", "RIGHT-ANGLED TRIANGLE","PENTAGON"]],
          ["No pairs of perpendicular sides",["CIRCLE", "KITE", "PARALLELOGRAM","PENTAGON"]],
          ["1 pair of parallel sides",["",""]],
          ["2 or more pairs of parallel sides",["SQUARE", "RECTANGLE", "PARALLELOGRAM"]],
          ["2 or more pairs of perpendicular sides",["SQUARE", "RECTANGLE"]],
        ];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
        var nameoption = [
          'SQUARE',
          'RECTANGLE',
          'CIRCLE',
          'HEXAGON',
          'PENTAGON',
          'TRIANGLE',
        ];
        name = nameoption[Math.floor(Math.random() * nameoption.length)];
        //console.log(name,item[1]);
        if(item[1].includes(name)===true){
          answer = 'TRUE'
        }else{
          answer = 'FALSE'
        }
        //console.log(answer);
        returnObject.answer = [answer];
        title = `Is this statement true or false for ${name}: ${'\n'} ${item[0]}`;
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
      break;
      case 6:
        var itemoption = [
          ["The polyhedron has 5 vertices",["PYRAMID"]],
          ["The 3D shape has 6 sides",["CUBE", "CUBOID"]],
          ["The polyhedron has triangle and rectangle sides",["TRIANGULAR PRISM"]],
          ["The polyhedron has 4 equilateral triangle faces",["TRIANGULAR PRISM"]],
          ["The 3D shape has 8 vertices and each side is a quadrilateral",["CUBE", "CUBOID"]],
          ["The polyhedron has one vertex and one edge",["CONE"]],
          ["The polyhedron square and triangle sides",["SQUARE-BASED PYRAMID"]],
        ];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
        var nameoption = [
          'PYRAMID',
          'CUBE',
          'CUBOID',
          'TRIANGULAR PRISM',
          'CONE',
          'SQUARE-BASED PYRAMID',
        ];
        name = nameoption[Math.floor(Math.random() * nameoption.length)];
        //console.log(name,item[1]);
        if(item[1].includes(name)===true){
          answer = 'TRUE'
        }else{
          answer = 'FALSE'
        }
        //console.log(answer);
        returnObject.answer = [answer];
        title = `Is this description true or false for ${name}: ${'\n'} ${item[0]}`;
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
        break;
  }

  return returnObject;
};

exports.generatePerimeter = (level = 1) => {
  const numberLength = 1;
  const numbersCount = 2;
  const numbers = helpers.generateNumbers(numbersCount, numberLength);
  numbers[0] = Math.max(numbers[0], 2);
  numbers[1] = Math.max(numbers[1], 2);
  let returnObject = { question: [], answer: [], uiComponent: 'shape' };
  let number, addadj, subadj,cvalue;
  switch (level) {
    case 1:
      returnObject.answer = [numbers[0] * 2 + numbers[1] * 2];
      returnObject.question = `Calculate the perimeter when a=${numbers[0]}, b=${numbers[1]}`;
      returnObject.image = imageSource['rectanglep']; 
      returnObject.imageSourceType = 'rectanglep';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 2:
      cvalue = helpers.round(
        Math.sqrt(numbers[0] * numbers[0] + numbers[1] * numbers[1]),
      );
      //cvalue = Math.sqrt((numbers[0]*numbers[0])+(numbers[1]*numbers[1]));
      returnObject.answer = [numbers[0] + numbers[1] + cvalue];
      returnObject.question = `Calculate the perimeter when a=${numbers[0]}, b=${numbers[1]} and c=${cvalue}`;
      returnObject.image = imageSource['trianglep']; 
      returnObject.imageSourceType = 'trianglep';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;

    case 3:
      number = Math.max(numbers[0], 3);

      addadj = numbers[1];
      var suboption = [1, 2];
      subadj = suboption[Math.floor(Math.random() * suboption.length)];

      const [num1, num2, num3, num4] = [
        number,
        number,
        number + addadj,
        number - subadj,
      ];
      //imagepath = 'level1_per_area.png';
      returnObject.answer = [
        num1 + num2 + num3 + num4 + (num3 - num2) + (num1 - num4),
      ];
      returnObject.question = `Calculate the perimeter when a=${num1}, b=${num2}, c=${num4}, d=${num3}`;
      returnObject.image = imageSource['level1_per_area']; 
      returnObject.imageSourceType = 'level1_per_area';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 4:
      returnObject.answer = [numbers[0] * 8 + numbers[1] * 4];
      returnObject.question = `Calculate the perimeter when a=${numbers[0]}, b=${numbers[1]}`;
      returnObject.image = imageSource['level2_per_area']; 
      returnObject.imageSourceType = 'level2_per_area';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 5:
      numbers[0] = Math.max(2, numbers[0]);
      var qntypeoption = [1, 2, 3, 4];
      let qntype =
        qntypeoption[Math.floor(Math.random() * qntypeoption.length)];
      if (qntype == 1) {
        returnObject.answer = [+(3.141592653589793238 * numbers[0]).toFixed(2)];
        returnObject.question = `Calculate the circumference of a circle when diameter=${numbers[0]}, to decimal places`;
        returnObject.image = imageSource['circlepd']; 
      returnObject.imageSourceType = 'circlepd';
      } else if (qntype == 2) {
        returnObject.answer = [
          +(3.141592653589793238 * (numbers[0] * 2)).toFixed(2),
        ];
        returnObject.question = `Calculate the circumference of a circle when radius=${numbers[0]}, to decimal places`;
        returnObject.image = imageSource['circlepr']; 
      returnObject.imageSourceType = 'circlepr';
      } else if (qntype == 3) {
        returnObject.answer = [
          +(3.141592653589793238 * numbers[0] + numbers[0]).toFixed(2),
        ];
        returnObject.question = `Calculate the perimeter when diameter=${numbers[0]}, to decimal places`;
        returnObject.image = imageSource['halfcirclepd']; 
      returnObject.imageSourceType = 'halfcirclepd';
      } else {
        returnObject.answer = [
          +(3.141592653589793238 * (numbers[0] * 2) + numbers[0] * 2).toFixed(
            2,
          ),
        ];
        returnObject.question = `Calculate the perimeter when radius=${numbers[0]}, to decimal places`;
        returnObject.image = imageSource['halfcirclepr']; 
      returnObject.imageSourceType = 'halfcirclepr';
      }
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
  }

  return returnObject;
};

exports.generateArea = (level = 1) => {
  const numberLength = 1;
  const numbersCount = 3;
  const numbers = helpers.generateNumbers(numbersCount, numberLength);
  let returnObject = { question: [], answer: [], uiComponent: 'shape' };
  let number, addadj, subadj;
  switch (level) {
    case 1:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      returnObject.answer = [numbers[0] * numbers[1]];
      returnObject.question = `Calculate the area when a=${numbers[0]}, b=${numbers[1]}`;
      returnObject.image = imageSource['rectanglep']; 
      returnObject.imageSourceType = 'rectanglep';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 2:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      returnObject.answer = [(numbers[0] * numbers[1]) / 2];
      returnObject.question = `Calculate the area when a=${numbers[0]}, b=${numbers[1]}`;
      returnObject.image = imageSource['trianglep']; 
      returnObject.imageSourceType = 'trianglep';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 3:
      number = Math.max(numbers[0], 3);

      addadj = numbers[1];
      var suboption = [1, 2];
      subadj = suboption[Math.floor(Math.random() * suboption.length)];

      let [num1, num2, num3, num4] = [
        number,
        number,
        number + addadj,
        number - subadj,
      ];

      returnObject.answer = [num3 * num4 + (num3 - num2) * (num1 - num4)];
      returnObject.question = `Calculate the area when a=${num3}, b=${num4}, c=${num2}, d=${num1}`;
      returnObject.image = imageSource['level1_per_area']; 
      returnObject.imageSourceType = 'level1_per_area';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 4:
      returnObject.answer = [
        numbers[0] * numbers[1] * 4 + numbers[0] * numbers[0],
      ];
      returnObject.question = `Calculate the area when a=${numbers[1]}, b=${numbers[0]}`;
      returnObject.image = imageSource['level2_per_area']; 
      returnObject.imageSourceType = 'level2_per_area';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 5:
      number = Math.min(8, Math.max(numbers[0], 4));
      let numberb = Math.max(numbers[2], 3);

      var suboption2 = [1, 2];
      subadj = suboption2[Math.floor(Math.random() * suboption2.length)];
      addadj = suboption2[Math.floor(Math.random() * suboption2.length)];
      let num5, num6;
      let cvalue = helpers.round(
        Math.sqrt(numbers[0] * numbers[0] + numbers[1] * numbers[1]),
      );
      [num1, num2, num3, num4, num5, num6] = [
        number + addadj,
        number - subadj,
        cvalue,
        number - subadj,
        Math.min(numberb, number),
        number + addadj - Math.min(numberb, number),
      ];

      returnObject.answer = [num1 * num2 + num6 * num4 * 0.5];
      returnObject.question = `Calculate the area when a=${num1}, b=${num2}, c=${num3}, d=${num4}, e=${num5}, f=${num6}`;
      returnObject.image = require('./../assets/img/questions/level3_per_area.png');
      returnObject.image = imageSource['level3_per_area']; 
      returnObject.imageSourceType = 'level3_per_area';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 6:
      returnObject.answer = [0.5 * (numbers[0] + numbers[1]) * numbers[2]];
      returnObject.question = `Calculate the area when a=${numbers[0]}, b=${numbers[1]} and h=${numbers[2]}`;
      returnObject.image = imageSource['trapeziump']; 
      returnObject.imageSourceType = 'trapeziump';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 7:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      returnObject.answer = [numbers[0] * numbers[1]];
      returnObject.question = `Calculate the area when b=${numbers[0]}, h=${numbers[1]}`;
      returnObject.image = imageSource['parallelogramp']; 
      returnObject.imageSourceType = 'parallelogramp';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 8:
      numbers[0] = Math.max(2, numbers[0]);
      var qntypeoption = [1, 2, 3, 4];
      let qntype =
        qntypeoption[Math.floor(Math.random() * qntypeoption.length)];
      if (qntype == 1) {
        returnObject.answer = [
          +(
            3.141592653589793238 *
            (((numbers[0] / 2) * numbers[0]) / 2)
          ).toFixed(2),
        ];
        returnObject.question = `Calculate the area of a circle when diameter=${numbers[0]}, to 2 decimal places`;
        returnObject.image = imageSource['circlepd']; 
      returnObject.imageSourceType = 'circlepd';
      } else if (qntype == 2) {
        returnObject.answer = [
          +(3.141592653589793238 * (numbers[0] * numbers[0])).toFixed(2),
        ];
        returnObject.question = `Calculate the area of a circle when radius=${numbers[0]}, to 2 decimal places`;
        returnObject.image = imageSource['circlepr']; 
      returnObject.imageSourceType = 'circlepr';
      } else if (qntype == 3) {
        returnObject.answer = [
          +(
            (3.141592653589793238 * (((numbers[0] / 2) * numbers[0]) / 2)) /
            2
          ).toFixed(2),
        ];
        returnObject.question = `Calculate the area when diameter=${numbers[0]}, to 2 decimal places`;
        returnObject.image = imageSource['halfcirclepd']; 
      returnObject.imageSourceType = 'halfcirclepd';
      } else {
        returnObject.answer = [
          +((3.141592653589793238 * (numbers[0] * numbers[0])) / 2).toFixed(2),
        ];
        returnObject.question = `Calculate the area of a circle when radius=${numbers[0]}, to 2 decimal places`;
        returnObject.image = imageSource['halfcirclepr']; 
      returnObject.imageSourceType = 'halfcirclepr';
      }
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
  }

  return returnObject;
};

exports.generateVolume = (level = 1) => {
  const numberLength = 1;
  const numbersCount = 4;
  const numbers = helpers.generateNumbers(numbersCount, numberLength);
  let returnObject = { question: [], answer: [], uiComponent: 'shape' };
  let cvalue;
  switch (level) {
    case 1:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      numbers[2] = Math.max(2, numbers[2]);
      returnObject.answer = [numbers[0] * numbers[1] * numbers[2]];
      returnObject.question = `Calculate the volume when a=${numbers[0]}, b=${numbers[1]}, c=${numbers[2]}`;
      returnObject.image = imageSource['cuboid2']; 
      returnObject.imageSourceType = 'cuboid2';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 2:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      numbers[2] = Math.max(2, numbers[2]);

      var qntypeoption = [1, 2];
      let qntype =
        qntypeoption[Math.floor(Math.random() * qntypeoption.length)];
      qntype = 2;
      if (qntype == 1) {
        returnObject.answer = [
          +(((numbers[0] * numbers[1]) / 2) * numbers[2]).toFixed(2),
        ];
        returnObject.question = `Calculate the volume of this prism when a=${numbers[0]}, b=${numbers[1]}, h=${numbers[2]}, to 2 decimal places`;
        returnObject.image = imageSource['triangleprism']; 
      returnObject.imageSourceType = 'triangleprism';
      } else if (qntype == 2) {
        [numbers[1], numbers[0]] = [numbers[1], numbers[0]].sort(function (
          a,
          b,
        ) {
          return a - b;
        });
        if (numbers[0] == numbers[1]) {
          numbers[0] = numbers[0] + 2;
        }
        cvalue = Math.sqrt(numbers[0] * numbers[0] - numbers[1] * numbers[1]);
        returnObject.answer = [
          +(((numbers[1] * cvalue) / 2) * numbers[2]).toFixed(2),
        ];
        returnObject.question = `Calculate the volume of this prism when a=${numbers[0]}, b=${numbers[1]}, h=${numbers[2]}, to 2 decimal places`;
        returnObject.image = imageSource['triangleprism2']; 
      returnObject.imageSourceType = 'triangleprism2';
      }
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 3:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      qntypeoption = [1, 2, 3, 4, 5];
      qntype = qntypeoption[Math.floor(Math.random() * qntypeoption.length)];

      if (qntype == 1) {
        returnObject.answer = [
          +(
            3.141592653589793238 *
            (numbers[0] * numbers[0] * numbers[1])
          ).toFixed(2),
        ];
        returnObject.question = `Calculate the volume of this cylinder when radius=${numbers[0]}, h=${numbers[1]}, to 2 decimal places`;
        returnObject.image = imageSource['cylinder_r']; 
      returnObject.imageSourceType = 'cylinder_r';
      } else if (qntype == 2) {
        returnObject.answer = [
          +(
            3.141592653589793238 *
            (((numbers[0] / 2) * numbers[0]) / 2) *
            numbers[1]
          ).toFixed(2),
        ];
        returnObject.question = `Calculate the volume of this cylinder when diameter=${numbers[0]}, h=${numbers[1]}, to 2 decimal places`;
        returnObject.image = require('./../assets/img/questions/cylinder_d.png');
        returnObject.image = imageSource['cylinder_d']; 
      returnObject.imageSourceType = 'cylinder_d';
      } else if (qntype == 3) {
        returnObject.answer = [
          +(
            ((3.141592653589793238 * (((numbers[0] / 2) * numbers[0]) / 2)) /
              2) *
            numbers[1]
          ).toFixed(2),
        ];
        returnObject.question = `Calculate the volume of this cylinder when diameter=${numbers[0]}, h=${numbers[1]}, to 2 decimal places`;
        returnObject.image = imageSource['halfcylinder_d']; 
      returnObject.imageSourceType = 'halfcylinder_d';
      } else if (qntype == 4) {
        returnObject.answer = [
          +(
            ((3.141592653589793238 * (numbers[0] * numbers[0])) / 2) *
            numbers[1]
          ).toFixed(2),
        ];
        returnObject.question = `Calculate the volume of this cylinder when diameter=${numbers[0]}, h=${numbers[1]}, to 2 decimal places`;
        returnObject.image = imageSource['halfcylinder_r']; 
      returnObject.imageSourceType = 'halfcylinder_r';
      }
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 4:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      numbers[2] = Math.max(2, numbers[2]);
      numbers[3] = Math.max(2, numbers[3]);
      returnObject.answer = [
        0.5 * (numbers[0] + numbers[1]) * numbers[2] * numbers[3],
      ];
      returnObject.question = `Calculate the volume when a=${numbers[0]}, b=${numbers[1]}, c=${numbers[2]} and h=${numbers[3]}`;
      returnObject.image = imageSource['trapezium2']; 
      returnObject.imageSourceType = 'trapezium2';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
  }

  return returnObject;
};

exports.generatePythagoras = (level = 1) => {
  const numberLength = 1;
  const numbersCount = 4;
  const numbers = helpers.generateNumbers(numbersCount, numberLength);
  let returnObject = { question: [], answer: [], uiComponent: 'shape' };
  let number, addadj, subadj, answer;
  switch (level) {
    case 1:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      
      answer = +Math.sqrt(
        numbers[0] * numbers[0] + numbers[1] * numbers[1],
      ).toFixed(2);
      returnObject.answer = [answer];
      returnObject.question = `Find the length of c to 2 dp, when a=${numbers[0]}, b=${numbers[1]}`;
      returnObject.image = imageSource['trianglep']; 
      returnObject.imageSourceType = 'trianglep';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 2:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(3, numbers[1]);
      var suboption = [1, 2];
      addadj = suboption[Math.floor(Math.random() * suboption.length)];
      if (numbers[0] == numbers[1]) {
        numbers[1] = numbers[1] + addadj;
      }
      [numbers[0], numbers[1]] = [numbers[0], numbers[1]].sort(function (a, b) {
        return a - b;
      });
      answer = +Math.sqrt(
        (numbers[1] * numbers[1]) - (numbers[0] * numbers[0]),
      ).toFixed(2);
      returnObject.answer = [answer];
      returnObject.question = `Find the length of a to 2 dp, when b=${numbers[0]}, c=${numbers[1]}`;
      returnObject.image = imageSource['trianglep']; 
      returnObject.imageSourceType = 'trianglep';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 3:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      
      answer = +Math.sqrt(
        numbers[0] * numbers[0] + numbers[1] * numbers[1],
      ).toFixed(2);
      returnObject.answer = [answer];
      returnObject.question = `Find the length of a diagonal of a rectangle of length ${numbers[0]} and width ${numbers[1]} to 2 dp`;
      
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 4:
      numbers[0] = Math.max(2, numbers[0]);
            
      answer = +Math.sqrt(
        (numbers[0] * numbers[0])/2 ).toFixed(2);
      returnObject.answer = [answer];
      returnObject.question = `Find the length of a side of a square, when the length of the diagonal is ${numbers[0]} to 2 dp`;
      
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 5:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      
      answer = +Math.sqrt(
        numbers[0] * numbers[0] + numbers[1] * numbers[1],
      ).toFixed(2);
      returnObject.answer = [answer];
      returnObject.question = `A ship sails ${numbers[0]} due North and then ${numbers[1]} due West. How far is it from its starting point to 2 dp`;
      
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 6:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      numbers[2] = Math.max(2, numbers[2]);
      
      answer = numbers[0] * numbers[0] + numbers[1] * numbers[1];

      answer = +Math.sqrt(
        answer  + numbers[2] * numbers[2],
      ).toFixed(2);
      returnObject.answer = [answer];
      returnObject.question = `A rectangular room has length of ${numbers[0]} m, width of ${numbers[1]} m and height ${numbers[2]} m. Calculate the diagonal of the room, to 2 dp`;
      
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
    break;
    case 7:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(3, numbers[1]);
      numbers[2] = Math.max(2.5, numbers[1]);
      
      answer = +Math.sqrt(
        (numbers[1] * numbers[1]) + (numbers[0] * numbers[0]).toFixed(4),
      );
      
      numbers[2] = +(answer+numbers[2]).toFixed(3)
      
      answer = +Math.sqrt(
        (numbers[2] * numbers[2]) - (answer * answer),
      ).toFixed(2);

      returnObject.answer = [answer];
      returnObject.question = `Find the height of a rectangular room of length ${numbers[0]} m, width ${numbers[1]} m, where the length of the diagonal is ${numbers[2]} m, to 2 dp`;
      
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
    break;
    case 8:
      numbers[0] = Math.max(5, numbers[0]);
      var suboption = [1, 2, 3];
      addadj = suboption[Math.floor(Math.random() * suboption.length)];
      answer = +(
        (numbers[0] * numbers[0] - addadj * addadj) /
        (addadj * 2)
      ).toFixed(2);
      returnObject.answer = [answer];
      returnObject.question = `The diagonal of a rectangle exceeds the length by ${addadj}cm. If the width of the rectangle is ${numbers[0]}cm, find the length? Give answer to 2 dp`;
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 9:
      numbers[0] = Math.max(5, numbers[0]);
     
      var suboption = [3,4];
      numbers[1] = numbers[0]-suboption[Math.floor(Math.random() * suboption.length)];
      numbers[2] = numbers[0]-suboption[Math.floor(Math.random() * suboption.length)];
      answer = +(
        (2 * numbers[1] * numbers[2]) /
        ((1 + numbers[0]) * (1 + numbers[0]) -
          numbers[0] * numbers[0] -
          numbers[2] * numbers[2])
      ).toFixed(2);
      returnObject.answer = [answer];
      returnObject.question = `A ladder is placed against a vertical wall so the top of the ladder is at point A and it touches the floor at point B. The ladder then slips, and the height of ladder drops to point C, and bottom of ladder extends to point D.${'\n'} Given: Point O is the base of the wall, OC=${
        numbers[1]
      }AC, BD=${numbers[2]}AC, OB=${
        numbers[0]
      }m. Find the amount the ladder drops by? Give answer to 2 dp`;
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
  }

  return returnObject;
};

exports.generateSimilarshapes = (level = 1) => {
  const numberLength = 1;
  const numbersCount = 4;
  const numbers = helpers.generateNumbers(numbersCount, numberLength);
  let returnObject = { question: [], answer: [], uiComponent: 'shape' };
  let answer;
  switch (level) {
    case 1:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      numbers[2] = Math.max(2, numbers[2]);
      if (numbers[2] == numbers[1]) {
        numbers[2] = eval(numbers[2] + 2);
      }
      [numbers[1], numbers[2]] = [numbers[2], numbers[1]].sort(function (a, b) {
        return a - b;
      });
      answer = +((numbers[2] / numbers[1]) * numbers[0]).toFixed(2);
      returnObject.answer = [answer];
      returnObject.question = `Calculate PR to 2 dp, when PQ=${numbers[0]}, QT=${numbers[1]}, RS=${numbers[2]}`;
      returnObject.image = imageSource['similarshapes']; 
      returnObject.imageSourceType = 'similarshapes';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 2:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      numbers[2] = Math.max(2, numbers[2]);
      if (numbers[2] == numbers[1]) {
        numbers[2] = eval(numbers[2] + 2);
      }
      [numbers[1], numbers[2]] = [numbers[2], numbers[1]].sort(function (a, b) {
        return a - b;
      });
      answer =
        +((numbers[2] / numbers[1]) * numbers[0]).toFixed(2) - numbers[0];
      returnObject.answer = [answer];
      returnObject.question = `Calculate QR to 2 dp, when PQ=${numbers[0]}, QT=${numbers[1]}, RS=${numbers[2]}`;
      returnObject.image = imageSource['similarshapes']; 
      returnObject.imageSourceType = 'similarshapes';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 3:
      numbers[0] = Math.max(2, numbers[0]);
      numbers[1] = Math.max(2, numbers[1]);
      numbers[2] = Math.max(2, numbers[2]);
      if (numbers[2] == numbers[1]) {
        numbers[2] = eval(numbers[2] + 2);
      }
      [numbers[1], numbers[2]] = [numbers[2], numbers[1]].sort(function (a, b) {
        return a - b;
      });
      answer = +(((numbers[2]+numbers[1]) / numbers[1]) * numbers[0]).toFixed(2);
      returnObject.answer = [answer];
      returnObject.question = `Calculate RS to 2 dp, when QT=${numbers[0]}, PT=${numbers[1]}, TS=${numbers[2]}`;
      returnObject.image = imageSource['similarshapes']; 
      returnObject.imageSourceType = 'similarshapes';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
  }

  return returnObject;
};

exports.generateCoordinates = (level = 1) => {
  const numberLength = 1;
  const numbersCount = 4;
  const numbers = helpers.generateNumbers(numbersCount, numberLength);
  let returnObject = { question: [], answer: [], uiComponent: 'shape2inputs' };
  let item,answer;
  switch (level) {
    case 1:
      numbers[0] = numbers[1]+numbers[0];
      numbers[2] = numbers[3]+numbers[2];
      var itemoption = [
        ["green",[numbers[2],numbers[0]]],
        ["red",[numbers[3],numbers[0]]],
        ["blue",[numbers[3],numbers[1]]],
        ["purple",[numbers[2],numbers[1]]],
            ];
      item = itemoption[Math.floor(Math.random() * itemoption.length)];
      answer = [item[1]];
      returnObject.answer = answer[0],answer[1] ;
      returnObject.question = {leftTexts:["(",", "],rightTexts:["",")"],title:`A=${numbers[0]}, B=${numbers[1]}, C=${numbers[2]}, D=${numbers[3]} Whats the coordinates of the ${item[0]} point?`};
      returnObject.image = imageSource['twodcoordinates']; 
      returnObject.imageSourceType = 'twocoordinates';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 2:
      numbers[0] = Math.max(1,numbers[0])
      numbers[1] = Math.max(1,numbers[1])
      numbers[2] = Math.max(1,numbers[2])
      var itemoption = [
        ["A",[0,0,numbers[0]]],
        ["B",[numbers[2],0,numbers[0]]],
        ["C",[numbers[2],0,0]],
        ["D",[numbers[2],numbers[1],0]],
        ["E",[0,numbers[1],0]],
        ["F",[0,numbers[1],numbers[0]]],
        ["G",[numbers[2],numbers[1],numbers[0]]],
            ];
      item = itemoption[Math.floor(Math.random() * itemoption.length)];
      answer = [item[1]];
      returnObject.answer = answer[0],answer[1],answer[2] ;
      returnObject.question = {leftTexts:["(",", "],rightTexts:["",",",")"],title:`A=${numbers[0]}, E=${numbers[1]}, C=${numbers[2]}. Whats the coordinates (x,y,z) of the point ${item[0]}?`};
      returnObject.image = imageSource['threedcoordinates']; 
      returnObject.imageSourceType = 'threedcoordinates';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      returnObject.uiComponent = 'shape3inputs' 
      break;
  }
  return returnObject;
}


exports.generateTransformation = (level = 1) => {
  const numberLength = 1;
  const numbersCount = 4;
  const numbers = helpers.generateNumbers(numbersCount, numberLength);
  let returnObject = { question: [], answer: [], uiComponent: 'shape2inputs' };
  let item,horizontalvar,verticalvar,ansx,ansy,horizontaloption,verticaloption;
  var itemoption = [
    ["P",[7,9]],
    ["Q",[9,7]],
    ["R",[9,9]],
    ["W",[7,8]],
    ["X",[8,8]],
    ["Y",[8,7]],
    ["S",[1,1]],
    ["T",[2,3]],
    ["U",[3,3]],
    ["V",[4,1]],
        ];
  item = itemoption[Math.floor(Math.random() * itemoption.length)];

  
  switch (level) {
    case 1:
      horizontaloption = ["right","left"];
      horizontalvar = horizontaloption[Math.floor(Math.random() * horizontaloption.length)];
      verticaloption = ["up","down"];
      verticalvar = verticaloption[Math.floor(Math.random() * verticaloption.length)];
      ansx = (horizontalvar=="right")?item[1][0]+numbers[0]:item[1][0]-numbers[0]
      ansy = (verticalvar=="up")?item[1][1]+numbers[1]:item[1][1]-numbers[1]
      returnObject.answer = [ansx,ansy] ;
      returnObject.question = {leftTexts:["(",", "],rightTexts:["",")"],title:`Point ${item[0]} is transformed ${numbers[0]} squares to the ${horizontalvar} and ${numbers[1]} squares ${verticalvar}. Whats the coordinates of ${item[0]} after the transformations?`};
      returnObject.image = imageSource['twoDtransformations']; 
      returnObject.imageSourceType = 'twoDtransformations';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 2:
      horizontaloption = ["mirror line 1","mirror line 2"];
      horizontalvar = horizontaloption[Math.floor(Math.random() * horizontaloption.length)];
      
      ansx = (horizontalvar=="mirror line 1")?item[1][0]+((5-item[1][0])*2):item[1][0]
      ansy = (horizontalvar=="mirror line 1")?item[1][1]:item[1][1]+((5-item[1][1])*2)
      returnObject.answer = [ansx,ansy] ;
      returnObject.question = {leftTexts:["(",", "],rightTexts:["",")"],title:`Point ${item[0]} is transformed by reflection in ${horizontalvar}. Whats the coordinates of ${item[0]} after the transformations?`};
      returnObject.image = imageSource['twoDtransformations']; 
      returnObject.imageSourceType = 'twoDtransformations';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
    case 3:
      horizontaloption = ["90","90"];
      horizontalvar = horizontaloption[Math.floor(Math.random() * horizontaloption.length)];
      verticaloption = ["clockwise","anticlockwise"];
      verticalvar = verticaloption[Math.floor(Math.random() * verticaloption.length)];
      numbers[0]=5
      numbers[1]=5
      ansx = (verticalvar=="clockwise")?numbers[0]-((numbers[1]-item[1][1])):numbers[0]-((item[1][1]-numbers[1]))
      ansy = (verticalvar=="clockwise")?numbers[1]+((numbers[0]-item[1][0])):numbers[1]+((item[1][0]-numbers[0]))
      returnObject.answer = [ansx,ansy] ;
      returnObject.question = {leftTexts:["(",", "],rightTexts:["",")"],title:`Rotate point ${item[0]} ${horizontalvar} degrees ${verticalvar} around the point (${numbers[0]},${numbers[1]}). Whats the coordinates of ${item[0]} after the transformations?`};
      returnObject.image = imageSource['twoDtransformations']; 
      returnObject.imageSourceType = 'twoDtransformations';
      returnObject.storeQuiz = {
        title: returnObject.question.title,
        content: returnObject.question.title,
        ui: 'default',
      };
      
      break;
  }
  return returnObject;
}
exports.generateAngles = (level = 1) => {
  const numberLength = 2;
  const numbersCount = 4;
  const numbers = helpers.generateNumbers(numbersCount, numberLength);
  let returnObject = { question: [], answer: [], uiComponent: 'shape' };
  let answer;
  switch (level) {
    case 1:
      numbers[0] = Math.max(20, numbers[0]);
      numbers[1] = Math.max(20, numbers[1]);
      
       if((numbers[0] + numbers[1])>180) {
        numbers[0]=35
        numbers[1]=20
      }
      
      answer = (180-numbers[1] - numbers[0]);
      returnObject.answer = [answer];
      returnObject.question = `Calculate angle C, when A=${numbers[0]} and B=${numbers[1]}`;
      returnObject.image = imageSource['trianglea']; 
      returnObject.imageSourceType = 'trianglea';
      returnObject.storeQuiz = {
        title: returnObject.question,
        content: returnObject.question,
        ui: 'default',
      };
      break;
      case 2:
        numbers[0] = Math.max(20, numbers[0]);
        numbers[1] = Math.max(20, numbers[1]);
        numbers[2] = Math.max(20, numbers[1]);
         if((numbers[0] + numbers[1]+ numbers[2])>360) {
          numbers[0]=35
          numbers[1]=40
          numbers[1]=65
        }
        
        answer = (360-numbers[1] - numbers[0]- numbers[2]);
        returnObject.answer = [answer];
        returnObject.question = `Calculate angle C, when A=${numbers[0]}, B=${numbers[1]} and C=${numbers[2]}`;
        returnObject.image = imageSource['anglespoint']; 
      returnObject.imageSourceType = 'anglespoint';
        returnObject.storeQuiz = {
          title: returnObject.question,
          content: returnObject.question,
          ui: 'default',
        };
        break;
  }

  return returnObject;
};

exports.generateEquivShading = (level = 1) => {
 

  let returnObject = {
    question: [],
    answer: [],
    uiComponent: 'default',
    imagePath: '',
  };
  let item, typeqn,colorqn,title,imageqn,answer,searchvar;
  switch (level) {
    case 1:
      var itemoption = [
        ['equivshad1',['B - C,purple']],
        ['equivshad2',['A - D,green','B - C,purple']],
        ['equivshad3',['A - D','green','C - D','yellow','B - C','purple']],
      ];
      item = itemoption[Math.floor(Math.random() * itemoption.length)];
      var typeqnoption = [
        'same amount','different amount'
      ];
      typeqn = typeqnoption[Math.floor(Math.random() * typeqnoption.length)];
      var imageqnoption = [
        'A - B','A - C','A - D','B - C','B - D','C - D'
      ];
      imageqn = imageqnoption[Math.floor(Math.random() * imageqnoption.length)];
      
      var coloroption = [
        "green","purple","yellow"
      ];
      colorqn = coloroption[Math.floor(Math.random() * coloroption.length)];
      searchvar = imageqn + ',' + colorqn
      returnObject.answer = [item[0]];
      if (typeqn == 'same amount'){
        if ((item[1].includes(searchvar))===true){
          answer = 'TRUE'
        }else{
          answer = 'FALSE'
        }
      }else{
        if ((item[1].includes(searchvar))===true){
          answer = 'FALSE'
        }else{
          answer = 'TRUE'
        }
      }     
      
      title = `Is the amount of ${colorqn} colour same in shapes ${imageqn}?`;
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

exports.generateSymmetry = (level = 1) => {
 

  let returnObject = {
    question: [],
    answer: [],
    uiComponent: 'default',
    imagePath: '',
  };
  let item, title,name,answer;
  switch (level) {
    case 1:
        var itemoption = [
          ["symmetry1",["FALSE"]],
          ["symmetry2",["FALSE"]],
          ["symmetry3",["FALSE"]],
          ["symmetry4",["TRUE"]],
          ["symmetry5",["FALSE"]],
          ["circle",["TRUE"]],
          ["pentagon",["TRUE"]],
          ["rectangle",["TRUE"]],
          ["hexagon",["TRUE"]],
        ];
        item = itemoption[Math.floor(Math.random() * itemoption.length)];
        answer = item[1]
        returnObject.answer = [answer];
        title = `Does the shape shown have a line of symmetry?`;
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
      break;
  }

  return returnObject;
};