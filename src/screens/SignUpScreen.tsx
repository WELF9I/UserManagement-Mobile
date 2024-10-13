import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/ThemeContext';
import CustomHeader from '../components/CustomHeader';

const signUpSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Email is invalid'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [successMessage, setSuccessMessage] = useState('');
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigation.navigate('SignUpConfirmation' as never);
      console.log('Form data:', data);
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title={t('signUp')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: theme.foreground }]}>{t('signUp')}</Text>
        
        {successMessage ? (
          <View style={[styles.successMessage, { backgroundColor: theme.accent, borderColor: theme.accentForeground }]}>
            <Text style={{ color: theme.accentForeground }}>{successMessage}</Text>
          </View>
        ) : null}

      <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.foreground }]}>{t('firstName')}</Text>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { borderColor: theme.border, color: theme.foreground }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={t('firstNamePlaceholder')}
                  placeholderTextColor={theme.mutedForeground}
                />
              )}
            />
            {errors.firstName && (
              <Text style={[styles.errorText, { color: theme.errorColor }]}>
                {t(errors.firstName?.message ?? 'firstNameError')}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.foreground }]}>{t('lastName')}</Text>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { borderColor: theme.border, color: theme.foreground }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={t('lastNamePlaceholder')}
                  placeholderTextColor={theme.mutedForeground}
                />
              )}
            />
            {errors.lastName && (
              <Text style={[styles.errorText, { color: theme.errorColor }]}>
                {t(errors.lastName?.message ?? 'lastNameError')}
              </Text>
            )}
          </View>

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
            {errors.email && (
              <Text style={[styles.errorText, { color: theme.errorColor }]}>
                {t(errors.email?.message ?? 'emailError')}
              </Text>
            )}
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
            {errors.password && (
              <Text style={[styles.errorText, { color: theme.errorColor }]}>
                {t(errors.password?.message ?? 'passwordError')}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.primaryForeground} />
            ) : (
              <Text style={[styles.buttonText, { color: theme.primaryForeground }]}>{t('signUp')}</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('SignIn' as never)}
        >
          <Text style={[styles.linkText, { color: theme.blue }]}>{t('alreadyHaveAccount')}</Text>
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
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
  },
  successMessage: {
    padding: 10,
    borderRadius: 4,
    marginBottom: 20,
    borderWidth: 1,
  },
});

export default SignUpScreen;