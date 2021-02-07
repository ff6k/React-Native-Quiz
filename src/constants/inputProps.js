const common = { autoCorrect: false, keyboardType: 'name-phone-pad' };

const text = {
  textContentType: 'name',
  autoCapitalize: 'words',
  autoCompleteType: 'name',
  autoCorrect: false,
  keyboardType: 'name-phone-pad',
};

export default [
  { label: 'FullName', ...text },
  { label: 'Email', ...text },
  { label: 'ProfileName', ...text },
  { label: 'Username', ...text },
  { label: 'Code', ...text, keyboardType: 'decimal-pad' },
  {
    label: 'Password',
    secureTextEntry: true,
    textContentType: 'newPassword',
    autoCapitalize: 'none',
    autoCorrect: false,
    // keyboardType: 'name-phone-pad',
  },
  {
    label: 'Answer',
    autoCorrect: false,
    textContentType: 'none',
    autoCapitalize: 'none',
    autoCompleteType: 'off',
    keyboardType: 'decimal-pad',
  },
  {
    label: 'default',
    textContentType: 'none',
    autoCapitalize: 'none',
    autoCompleteType: 'off',
    keyboardType: 'decimal-pad',
    autoCorrect: false,
  },
];
