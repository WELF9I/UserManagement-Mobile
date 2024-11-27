import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../components/theme/ThemeContext';
import CustomHeader from '../../components/CustomHeader';
import { authService } from '../../services/authService';
import { SignInData } from '../../models/User';

const signInSchema = z.object({
  email: z.string().email('Email is invalid'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    setSubmitError('');
    try {
      const response = await authService.signIn(data);
      setSuccessMessage(t('signInSuccessful'));
      console.log('Sign in successful:', response);
      // Handle successful sign in (e.g., store token, navigate to main screen)
    } catch (error) {
      console.error('Sign in error:', error);
      setSubmitError(t('invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title={t('signIn')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: theme.foreground }]}>{t('signIn')}</Text>
        
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
             {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.foreground }]}>{t('password')}</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { borderColor: theme.border, color: theme.foreground }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  placeholder={t('passwordPlaceholder')}
                  placeholderTextColor={theme.mutedForeground}
                />
              )}
            />
             {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
          </View>

          {submitError ? (
            <View style={styles.errorMessage}>
              <Text style={styles.errorMessageText}>{submitError}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.primaryForeground} />
            ) : (
              <Text style={[styles.buttonText, { color: theme.primaryForeground }]}>{t('signIn')}</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => navigation.navigate('ForgotPassword' as never)}
        >
          <Text style={[styles.forgotPasswordText, { color: theme.blue }]}>{t('forgotPassword')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpLink}
          onPress={() => navigation.navigate('SignUp' as never)}
        >
          <Text style={[styles.signUpText, { color: theme.blue }]}>{t('noAccount')}</Text>
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
    color: 'red',
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
  forgotPassword: {
    marginTop: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
  },
  signUpLink: {
    marginTop: 16,
  },
  signUpText: {
    textAlign: 'center',
  },
});

export default SignInScreen;