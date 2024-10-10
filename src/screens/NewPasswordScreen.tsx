import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const NewPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  //@ts-ignore
  const { email } = route.params;

  useEffect(() => {
    setPasswordLengthValid(newPassword.length >= 8);
    setPasswordsMatch(newPassword === confirmPassword && newPassword !== '');
  }, [newPassword, confirmPassword]);

  const isPasswordValid = passwordLengthValid && passwordsMatch;

  const handleConfirm = () => {
    //@ts-ignore
    navigation.navigate('PasswordResetSuccess');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set New Password</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={[
            styles.input,
            newPassword !== '' && (passwordLengthValid ? styles.validInput : styles.invalidInput)
          ]}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter new password"
        />
        {newPassword !== '' && (
          <Text style={passwordLengthValid ? styles.validMessage : styles.errorMessage}>
            {passwordLengthValid ? 'Password length is valid' : 'Password must be at least 8 characters'}
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={[
            styles.input,
            confirmPassword !== '' && (passwordsMatch ? styles.validInput : styles.invalidInput)
          ]}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm new password"
        />
        {confirmPassword !== '' && (
          <Text style={passwordsMatch ? styles.validMessage : styles.errorMessage}>
            {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, !isPasswordValid && styles.buttonDisabled]}
        onPress={handleConfirm}
        disabled={!isPasswordValid}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
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
    borderColor: '#d1d5db',
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
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  validMessage: {
    color: 'green',
    fontSize: 14,
    marginTop: 5,
  },
});

export default NewPasswordScreen;