import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import getTheme from '../../utils/GetTheme';
import CommonText from '../CommonText';

type SettingButtonProps = {
  title: string;
  onPress: () => void;
};

export default function SettingButton({ title, onPress }: SettingButtonProps) {
    const theme = getTheme();
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}>
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: theme.backgroundTertiary }]}>
            <CommonText>{title}</CommonText>
        </TouchableOpacity>
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
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
