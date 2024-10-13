import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAttempt } from '../components/AttemptContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/ThemeContext';
import CustomHeader from '../components/CustomHeader';

const CodeVerificationScreen = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params as { email: string };
  const { verifyAttempts, verifyBlockUntil, resetAttempts, resetBlockUntil, decrementVerifyAttempts, decrementResetAttempts } = useAttempt();
  const { t } = useTranslation();
  const { theme } = useTheme();

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
      Alert.alert(t('error'), t('tryAgainInMinutes', { minutes: minutesLeft }));
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
        Alert.alert(t('error'), t('exceededMaxAttempts'));
      } else {
        Alert.alert(t('error'), t('invalidCodeAttemptsLeft', { attempts: verifyAttempts - 1 }));
      }
    }
  };

  const handleResendCode = async () => {
    if (resetBlockUntil && Date.now() < resetBlockUntil) {
      const minutesLeft = Math.ceil((resetBlockUntil - Date.now()) / (1000 * 60));
      Alert.alert(t('error'), t('waitBeforeRequestingCode', { minutes: minutesLeft }));
      return;
    }

    if (resetAttempts <= 0) {
      Alert.alert(t('error'), t('exceededMaxResendAttempts'));
    } else {
      await decrementResetAttempts();
      Alert.alert(t('success'), t('newCodeSent'));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title={t('verificationCode')} />
      <Text style={[styles.title, { color: theme.foreground }]}>{t('enterVerificationCode')}</Text>
      <Text style={[styles.subtitle, { color: theme.mutedForeground }]}>{t('codeSentTo', { email })}</Text>
      
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={[
              styles.codeInput,
              { borderColor: theme.border, color: theme.foreground },
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
        <Text style={[styles.errorMessage, { color: theme.errorColor }]}>
          {t('invalidCodeAttemptsLeft', { attempts: verifyAttempts })}
          {verifyBlockUntil && Date.now() < verifyBlockUntil && (
            <Text>{t('tryAgainInOneHour')}</Text> // Wrap this string in a <Text> component
          )}
        </Text>
      )}
      {isValid === true && (
        <Text style={[styles.successMessage, { color: theme.primary }]}>{t('codeValid')}</Text>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: theme.primary },
          (!isCodeComplete || (verifyBlockUntil && Date.now() < verifyBlockUntil)) ? styles.buttonDisabled : {}
        ]}
        onPress={handleResetPassword}
        //@ts-ignore
        disabled={!isCodeComplete || (verifyBlockUntil && Date.now() < verifyBlockUntil)}
      >
        <Text style={[styles.buttonText, { color: theme.primaryForeground }]}>
          {t('resetPassword')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResendCode} style={styles.resendLink}>
        <Text style={[styles.resendText, { color: theme.blue }]}>{t('resendCode')}</Text>
      </TouchableOpacity>
      
      <Text style={[styles.attemptsText, { color: theme.mutedForeground }]}>
        {t('resetAttemptsLeft', { attempts: Math.max(resetAttempts, 0) })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop:40,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
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
    marginBottom: 20,
  },
  successMessage: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendLink: {
    marginTop: 20,
  },
  resendText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  attemptsText: {
    marginTop: 10,
    fontSize: 14,
  },
});

export default CodeVerificationScreen;
