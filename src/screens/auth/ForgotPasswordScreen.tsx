import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../components/theme/ThemeContext';
import CustomHeader from '../../components/CustomHeader';
import { useAttempt } from '../../components/AttemptContext';
import { authService } from '../../services/authService';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email is invalid'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const navigation = useNavigation();
  const { resetAttempts, resetBlockUntil, decrementResetAttempts } = useAttempt();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    if (resetBlockUntil && Date.now() < resetBlockUntil) {
      const minutesLeft = Math.ceil((resetBlockUntil - Date.now()) / (1000 * 60));
      setSubmitError(t('pleaseWaitBeforeRequestingCode', { minutes: minutesLeft }));
      return;
    }

    setIsLoading(true);
    setSubmitError('');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await decrementResetAttempts();
      
      setSuccessMessage(t('resetCodeSent'));
      
      // Navigate to Code Verification screen after a short delay
      setTimeout(() => {
        //@ts-ignore
        navigation.navigate('CodeVerification' as never, { email: data.email } as never);
      }, 2000);
    } catch (error) {
      console.error('Forgot password error:', error);
      setSubmitError(t('errorOccurred'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title={t('forgotPassword')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: theme.foreground }]}>{t('forgotPassword')}</Text>
        
        {successMessage ? (
          <View style={styles.successMessage}>
            <Text style={styles.successMessageText}>{successMessage}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.foreground }]}>{t('email')}</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { borderColor: theme.border, color: theme.foreground }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder={t('emailPlaceholder')}
                  placeholderTextColor={theme.mutedForeground}
                />
              )}
            />
            {errors.email && <Text style={[styles.errorText, { color: theme.errorColor }]}>{errors.email.message}</Text>}
          </View>

          {submitError ? (
            <View style={styles.errorMessage}>
              <Text style={[styles.errorMessageText, { color: theme.errorColor }]}>{submitError}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={handleSubmit(onSubmit)}
            //@ts-ignore
            disabled={isLoading || (resetBlockUntil && Date.now() < resetBlockUntil)}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.primaryForeground} />
            ) : (
              <Text style={[styles.buttonText, { color: theme.primaryForeground }]}>{t('sendResetCode')}</Text>
            )}
          </TouchableOpacity>

          <Text style={[styles.attemptsText, { color: theme.mutedForeground }]}>
            {t('resetAttemptsLeft', { attempts: Math.max(resetAttempts, 0) })}
          </Text>
        </View>
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
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    borderRadius: 4,
    padding: 12,
    marginTop: 16,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  successMessageText: {
    color: '#155724',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  errorMessageText: {
    color: '#721c24',
  },
  attemptsText: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ForgotPasswordScreen;