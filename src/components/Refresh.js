import React from 'react';
import { RefreshControl } from 'react-native';
import { useTheme } from 'react-native-paper';

const Refresh = ({ title, isFetching, onRefresh }) => {
  const { colors } = useTheme();
  return (
    <RefreshControl
      refreshing={isFetching}
      {...{ onRefresh }}
      title={title || 'Refreshing list'}
      tintColor={colors.primary}
      titleColor={colors.primary}
    />
  );
};

export default Refresh;
