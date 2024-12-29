import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import getTheme from '../../utils/GetTheme';
import CommonText from '../CommonText';

type SettingToggleProps = {
  toggled: boolean;
  title: string;
  onToggle: (value: boolean) => void;
};

export default function SettingToggle({ toggled, title, onToggle }: SettingToggleProps) {
    const theme = getTheme();
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}>
        <CommonText>{title}</CommonText>
        <Switch
          value={toggled}
          onValueChange={onToggle}
          trackColor={{ false: '#767577', true: '#85A947' }}
          thumbColor={toggled ? theme.text.full : theme.background}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
});
