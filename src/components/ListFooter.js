import React from 'react';
import { Title, useTheme } from 'react-native-paper';

const ListFooter = ({ text }) => {
  const { dimensions, colors } = useTheme();
  return (
    <Title
      style={{
        alignSelf: 'center',
        marginBottom: dimensions.height(10),
        color: colors.backdrop,
        fontStyle: 'italic',
      }}
    >
      {text || 'No more data to show !'}
    </Title>
  );
};

export default ListFooter;
