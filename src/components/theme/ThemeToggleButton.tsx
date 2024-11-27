import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react-native';


const ThemeToggleButton: React.FC = () => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.button,
        { backgroundColor: isDark ? theme.background : theme.foreground }
      ]}
    >
      {isDark ? (
        <Sun size={20} color={theme.foreground} />
      ) : (
        <Moon size={20} color={theme.background} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
});

export default ThemeToggleButton;