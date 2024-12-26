import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CommonText from '../CommonText';
import { Tag } from '../../utils/types';
import { setSelectedFilterTags, setSortBy, resetFilters } from '../../redux/filterContactsSlice';
import FilterContactsByTags from './FilterContactsByTags';
import getTheme from '../../utils/GetTheme';
import cancelIcon from '../../assets/images/cancel-icon-white.png';

type FilterContactsProps = {
  endEditing: () => void;
}

export default function FilterContacts({ endEditing }: FilterContactsProps) {
  const dispatch = useDispatch();
  const theme = getTheme();
  const [isSelectingTags, setIsSelectingTags] = useState(false);
  const selectedTagIds = useSelector((state: any) => state.filter.selectedTagIds);
  const currentSortBy = useSelector((state: any) => state.filter.sortBy);

  const handleSortPress = (sortType: 'name' | 'birthday' | 'tagCount') => {
    dispatch(setSortBy(currentSortBy === sortType ? null : sortType));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
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
        <CommonText weight="regular" size="medium">Has Tag:</CommonText>
        <FilterContactsByTags />
      </View>

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
            style={[styles.sortButton, currentSortBy === 'birthday' && styles.selectedButton]} 
            onPress={() => handleSortPress('birthday')}
          >
            <CommonText weight="regular" size="small">Birthday</CommonText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.sortButton, currentSortBy === 'tagCount' && styles.selectedButton]} 
            onPress={() => handleSortPress('tagCount')}
          >
            <CommonText weight="regular" size="small"># of Tags</CommonText>
          </TouchableOpacity>
        </View>
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
  }
});
