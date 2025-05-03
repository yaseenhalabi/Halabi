import { View, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import CommonText from '../CommonText';
import { setSelectedFilterTags, setSortBy, resetFilters, setReverse } from '../../redux/filterTagsSlice';
import getTheme from '../../utils/GetTheme';
import cancelIcon from '../../assets/images/cancel-icon-white.png';
import blackCancelIcon from '../../assets/images/cancel-icon-black.png';

type FilterTagsProps = {
    endEditing: () => void;
}

export default function FilterTags({ endEditing } : FilterTagsProps) {
  const dispatch = useDispatch();
  const theme = getTheme();
  const currentSortBy = useSelector((state: any) => state.filterTags.sortBy);
  const isReversed = useSelector((state: any) => state.filterTags.reverse);
  const heightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleSortPress = (sortType: 'name' | 'peopleCount') => {
    dispatch(setSortBy(currentSortBy === sortType ? null : sortType));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleReversePress = () => {
    dispatch(setReverse(!isReversed));
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          maxHeight: heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 500]
          }),
          opacity: heightAnim
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={endEditing}
        hitSlop={15}
      >
        <Image source={theme.name == "light" ? blackCancelIcon : cancelIcon} style={styles.closeIcon} />
      </TouchableOpacity>

      <View style={styles.section}>
        <CommonText weight="regular" size="medium">Sort By:</CommonText>
        <View style={styles.sortButtons}>
          <TouchableOpacity 
            style={[styles.sortButton, { backgroundColor: theme.backgroundSecondary }, currentSortBy === 'name' && { borderColor: theme.text.muted }]} 
            onPress={() => handleSortPress('name')}
          >
            <CommonText weight="regular" size="small">Name (A-Z)</CommonText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.sortButton, { backgroundColor: theme.backgroundSecondary }, currentSortBy === 'peopleCount' && { borderColor: theme.text.muted }]} 
            onPress={() => handleSortPress('peopleCount')}
          >
            <CommonText weight="regular" size="small">People Count</CommonText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <CommonText weight="regular" size="medium">Order:</CommonText>
        <TouchableOpacity 
          style={[styles.sortButton, { backgroundColor: theme.backgroundSecondary }, isReversed && { borderColor: theme.text.muted }, styles.reverseButton]} 
          onPress={handleReversePress}
        >
          <CommonText weight="regular" size="small">Reverse</CommonText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.resetButton} 
        onPress={handleResetFilters}
      >
        <CommonText 
          weight="regular" 
          size="small" 
          style={styles.resetText}
        >
          Remove Filters
        </CommonText>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
    paddingTop: 5,
    overflow: 'hidden',
  },
  section: {
    gap: 10,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  sortButton: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedButton: {
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 7.5,
    zIndex: 1,
  },
  closeIcon: {
      width: 20,
    height: 20,
  },
  resetButton: {
    padding: 5,
  },
  resetText: {
    color: '#FF453A', // iOS red color
  },
  reverseButton: {
    width: 'auto',
  }
}); 