import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/ThemeContext';
import CustomHeader from '../components/CustomHeader';

const NewPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params as { email: string };
  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    setPasswordLengthValid(newPassword.length >= 8);
    setPasswordsMatch(newPassword === confirmPassword && newPassword !== '');
  }, [newPassword, confirmPassword]);

  const isPasswordValid = passwordLengthValid && passwordsMatch;

  const handleConfirm = () => {
    navigation.navigate('PasswordResetSuccess' as never);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title={t('setNewPassword')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: theme.foreground }]}>{t('setNewPassword')}</Text>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.foreground }]}>{t('newPassword')}</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: theme.border, color: theme.foreground },
              newPassword !== '' && (passwordLengthValid ? styles.validInput : styles.invalidInput)
            ]}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder={t('enterNewPassword')}
            placeholderTextColor={theme.mutedForeground}
          />
          {newPassword !== '' && (
            <Text style={[
              passwordLengthValid ? styles.validMessage : styles.errorMessage,
              { color: passwordLengthValid ? theme.primary : theme.errorColor }
            ]}>
              {passwordLengthValid ? t('passwordLengthValid') : t('passwordMustBeAtLeast')}
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.foreground }]}>{t('confirmPassword')}</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: theme.border, color: theme.foreground },
              confirmPassword !== '' && (passwordsMatch ? styles.validInput : styles.invalidInput)
            ]}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder={t('confirmNewPassword')}
            placeholderTextColor={theme.mutedForeground}
          />
          {confirmPassword !== '' && (
            <Text style={[
              passwordsMatch ? styles.validMessage : styles.errorMessage,
              { color: passwordsMatch ? theme.primary : theme.errorColor }
            ]}>
              {passwordsMatch ? t('passwordsMatch') : t('passwordsDontMatch')}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.primary },
            !isPasswordValid && styles.buttonDisabled
          ]}
          onPress={handleConfirm}
          disabled={!isPasswordValid}
        >
          <Text style={[styles.buttonText, { color: theme.primaryForeground }]}>{t('confirm')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1.2,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    width: '100%',
  },
  validInput: {
    borderColor: 'green',
  },
  invalidInput: {
    borderColor: 'red',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 14,
    marginTop: 5,
  },
  validMessage: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default NewPasswordScreen;