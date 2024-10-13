import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemeToggleButton from './ThemeToggleButton';
import { useTheme } from '../components/ThemeContext';

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
        <Text style={[styles.languageButtonText, { color: theme.foreground }]}>
          {i18n.language === 'en' ? 'FR' : 'EN'}
        </Text>
      </TouchableOpacity>
      <ThemeToggleButton />
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
  languageButton: {
    padding: 8,
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader;