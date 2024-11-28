import React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
  return (
    <Searchbar
      placeholder="Search users..."
      onChangeText={onChangeText}
      value={value}
      style={styles.searchBar}
      inputStyle={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    elevation: 0,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  input: {
    fontSize: 14,
  },
});

