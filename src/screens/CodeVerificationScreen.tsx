import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAttempt } from '../components/AttemptContext';

const CodeVerificationScreen = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params as { email: string };
  const { verifyAttempts, verifyBlockUntil, resetAttempts, resetBlockUntil, decrementVerifyAttempts, decrementResetAttempts } = useAttempt();

  const FIXED_CODE = '123456';

  useEffect(() => {
    //@ts-ignore
    inputRefs.current[0]?.focus();
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text !== '' && index < 5) {
      //@ts-ignore
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
      //@ts-ignore
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  const handleResetPassword = async () => {
    if (verifyBlockUntil && Date.now() < verifyBlockUntil) {
      const minutesLeft = Math.ceil((verifyBlockUntil - Date.now()) / (1000 * 60));
      Alert.alert('Error', `Please try again in ${minutesLeft} minutes.`);
      return;
    }

    const enteredCode = code.join('');
    const isValidCode = enteredCode === FIXED_CODE;
    setIsValid(isValidCode);

    if (isValidCode) {
      //@ts-ignore
      navigation.navigate('NewPassword' as never, { email } as never);
    } else {
      await decrementVerifyAttempts();
      if (verifyAttempts <= 1) {
        Alert.alert('Error', 'You have exceeded the maximum attempts. Please try again in 1 hour.');
      } else {
        Alert.alert('Error', `Invalid code. Verify attempts left: ${verifyAttempts - 1}`);
      }
    }
  };

  const handleResendCode = async () => {
    if (resetBlockUntil && Date.now() < resetBlockUntil) {
      const minutesLeft = Math.ceil((resetBlockUntil - Date.now()) / (1000 * 60));
      Alert.alert('Error', `Please wait ${minutesLeft} minutes before requesting another code.`);
      return;
    }

    if (resetAttempts <= 0) {
      Alert.alert('Error', 'You have exceeded the maximum resend attempts. Please try again in 1 hour.');
    } else {
      await decrementResetAttempts();
      Alert.alert('Success', 'A new verification code has been sent to your email.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>We've sent a 6-digit code to {email}</Text>
      
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={[
              styles.codeInput,
              isValid === false && styles.invalidInput,
              isValid === true && styles.validInput
            ]}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            //@ts-ignore
            ref={el => inputRefs.current[index] = el}
          />
        ))}
      </View>

      {isValid === false && (
        <Text style={styles.errorMessage}>
          Invalid code. Verify attempts left: {verifyAttempts}
          {verifyBlockUntil && Date.now() < verifyBlockUntil && ". Please try again in 1 hour."}
        </Text>
      )}
      {isValid === true && (
        <Text style={styles.successMessage}>Code is valid!</Text>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          (!isCodeComplete || (verifyBlockUntil && Date.now() < verifyBlockUntil)) ? styles.buttonDisabled : null
        ]}
        onPress={handleResetPassword}
        //@ts-ignore
        disabled={!isCodeComplete || (verifyBlockUntil && Date.now() < verifyBlockUntil)}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResendCode} style={styles.resendLink}>
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>
      
      <Text style={styles.attemptsText}>
        Reset attempts left: {resetAttempts >= 0 ? resetAttempts : 0}
      </Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  codeInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  invalidInput: {
    borderColor: 'red',
  },
  validInput: {
    borderColor: 'green',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 20,
  },
  successMessage: {
    color: 'green',
    marginBottom: 20,
  },
  button: {
    marginTop: 40,
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendLink: {
    marginTop: 20,
  },
  resendText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  attemptsText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
  },
});

export default CodeVerificationScreen;