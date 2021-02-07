import React, { Component, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import {
  NativeModules,
  TextInput,
  findNodeHandle,
  AppRegistry,
  View,
} from 'react-native';

const { CustomKeyboardKit } = NativeModules;

const {
  install,
  uninstall,
  insertText,
  backSpace,
  doDelete,
  moveLeft,
  moveRight,
  switchSystemKeyboard,
  hideKeyboard,
} = CustomKeyboardKit;

export {
  install,
  uninstall,
  insertText,
  backSpace,
  doDelete,
  moveLeft,
  moveRight,
  switchSystemKeyboard,
  hideKeyboard,
};

const keyboardTypeRegistry = {};

export function register(type, factory) {
  keyboardTypeRegistry[type] = factory;
}

class CustomKeyboardKitContainer extends Component {
  render() {
    const { tag, type } = this.props;
    const factory = keyboardTypeRegistry[type];
    if (!factory) {
      console.warn(`Custom keyboard type ${type} not registered.`);
      return null;
    }
    const Comp = factory();
    return <Comp tag={tag} />;
  }
}

AppRegistry.registerComponent(
  'CustomKeyboardKit',
  () => CustomKeyboardKitContainer,
);

export const CustomTextInput = ({ customKeyboardType, ...others }) => {
  const onRef = useRef();

  //   useEffect(() => {
  //     install(findNodeHandle(onRef.current), customKeyboardType);
  //   }, [customKeyboardType]);

  return (
    <View>
      <TextInput {...others} ref={onRef} />
    </View>
  );
};

// export class CustomTextInput extends Component {
//   static propTypes = {
//     ...TextInput.propTypes,
//     customKeyboardType: PropTypes.string,
//   };

//   constructor(props) {
//     super(props);
//   }

//   installInput = async () => {
//     const deal = () => {
//       return new Promise((resovle, reject) => {
//         install(findNodeHandle(this.input), this.props.customKeyboardType);
//       });
//     };
//     await deal();
//   };

//   componentDidMount() {
//     (async () => {
//       await this.installInput();
//     })();
//   }

//   componentWillReceiveProps(newProps) {
//     // if (newProps.customKeyboardType !== this.props.customKeyboardType) {
//     //   install(findNodeHandle(this.input), newProps.customKeyboardType);
//     // }
//   }

//   onRef = (ref) => {
//     this.input = ref;
//   };

//   render() {
//     const { customKeyboardType, ...others } = this.props;
//     return (
//       <View>
//         <TextInput {...others} ref={this.onRef} />
//       </View>
//     );
//   }
// }
