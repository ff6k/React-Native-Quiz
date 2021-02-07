import React, { useEffect, useState } from 'react';
import { Checkbox } from 'react-native-paper';

const state = { unchecked: 'unchecked', checked: 'checked' };

const MyCheckItem = (props) => {
  const [check, setCheck] = useState(props.status);
  const onPress = () => {
    if (check === state.unchecked) {
      setCheck(state.checked);
    } else if (check === state.checked) {
      setCheck(state.unchecked);
    }
  };

  useEffect(() => {
    const isChecked = check === state.checked;
    props.getChecked && props.getChecked(isChecked);
  }, [check]);

  return <Checkbox.Item {...props} status={check} onPress={onPress} />;
};

export default MyCheckItem;
