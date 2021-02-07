const number = {
  regex: /^-?\d*\.?\d+$/,
  text: 'Only decimal numbers are allowed',
};
export default {
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,15}$/,
    text: 'At least one lowercase, one uppercase, one digit and [8-15] long',
  },
  username: {
    regex: /^[a-zA-Z0-9]{5,}$/,
    text: 'The username should be at least 5 alphanumeric',
  },
  fullname: {
    // regex: /^\w{3,}(?:(?:,\s\w+)+|(?:\s\w{2,})+)$/,
    regex: /^([a-zA-Z]+[’'-.]?[a-zA-Z]+[ ]?)+$/,
    text: 'Provide your space-separated family and last name',
  },
  profilename: {
    // regex: /^\w{3,}(?:(?:,\s\w+)+|(?:\s\w{2,})+)$/,
    regex: /^([a-zA-Z]+[’'-.]?[a-zA-Z]+[ ]?)+$/,
    text: 'Provide your space-separated account name',
  },
  email: {
    // regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    text: 'Provide your valid email',
  },
  answer: {
    regex: /^-?\d*\.?\d+$/,
    text: 'Only decimal numbers are allowed',
  },
  verify: {
    text: 'Should match the provided password',
  },
  answer: number,
  code: {
    regex: /^[0-9]{4}$/,
    text: '4 digit decimal numbers are allowed',
  },
  default: number,
};
