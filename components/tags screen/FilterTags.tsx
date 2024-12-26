import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CommonText from '../CommonText';
import { setSelectedFilterTags, setSortBy, resetFilters, setReverse } from '../../redux/filterTagsSlice';
import getTheme from '../../utils/GetTheme';
import cancelIcon from '../../assets/images/cancel-icon-white.png';
type FilterTagsProps = {
    endEditing: () => void;
}

export default function FilterTags({ endEditing } : FilterTagsProps) {
  const dispatch = useDispatch();
  const theme = getTheme();
  const currentSortBy = useSelector((state: any) => state.filterTags.sortBy);
    const isReversed = useSelector((state: any) => state.filterTags.reverse);
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
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={endEditing}
        hitSlop={15}
      >
        <Image source={cancelIcon} style={styles.closeIcon} />
      </TouchableOpacity>

      <View style={styles.section}>
        <CommonText weight="regular" size="medium">Sort By:</CommonText>
        <View style={styles.sortButtons}>
          <TouchableOpacity 
            style={[styles.sortButton, currentSortBy === 'name' && styles.selectedButton]} 
            onPress={() => handleSortPress('name')}
          >
            <CommonText weight="regular" size="small">Name (A-Z)</CommonText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.sortButton, currentSortBy === 'peopleCount' && styles.selectedButton]} 
            onPress={() => handleSortPress('peopleCount')}
          >
            <CommonText weight="regular" size="small">People Count</CommonText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <CommonText weight="regular" size="medium">Order:</CommonText>
        <TouchableOpacity 
          style={[styles.sortButton, isReversed && styles.selectedButton, styles.reverseButton]} 
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
    paddingTop: 5,
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
    backgroundColor: '#121212',
  },
  selectedButton: {
    borderColor: 'white',
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