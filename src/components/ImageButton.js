import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import type { ImageProps, ButtonProps } from 'react-native';

const ImageButton = ({
  imgProps,
  btnProps,
}: {
  imgProps: ImageProps,
  btnProps: ButtonProps,
}) => (
  <TouchableOpacity {...btnProps}>
    <Image {...imgProps} />
  </TouchableOpacity>
);

export default ImageButton;
