//@flow
import React from 'react';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import DropDown, { DropDownPropsInterface } from './DropDown';

const MyDropDown = (props: DropDownPropsInterface) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <DropDown
      label={props.label || 'title'}
      mode={props.mode || 'outlined'}
      value={props.value}
      setValue={props.setValue}
      list={props.list || []}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      inputProps={{
        right: <TextInput.Icon name={'menu-down'} />,
      }}
      {...props}
    />
  );
};

export default MyDropDown;
