import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './theme/ThemeContext';
import ThemeToggleButton from './theme/ThemeToggleButton';
import LanguageSelector from './LanguageSelector';

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.left}>
        <LanguageSelector />
      </View>

      <View style={styles.right}>
        <ThemeToggleButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default CustomHeader;
