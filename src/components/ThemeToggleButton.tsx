import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from './ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className={`p-2 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`}
    >
      <Text className={`text-sm ${isDark ? 'text-black' : 'text-white'}`}>
        {isDark ? '☀️' : '🌙'}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;