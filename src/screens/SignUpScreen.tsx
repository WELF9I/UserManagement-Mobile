import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../components/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';

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
  const { theme, isDark } = useTheme();

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
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.themeToggleContainer}>
        <ThemeToggleButton />
      </View>
      <Text style={[styles.title, { color: theme.foreground }]}>Sign Up</Text>
      
      {successMessage ? (
        <View style={[styles.successMessage, { backgroundColor: theme.accent, borderColor: theme.accentForeground }]}>
          <Text style={{ color: theme.accentForeground }}>{successMessage}</Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.foreground }]}>First Name</Text>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.foreground }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="First Name"
                placeholderTextColor={theme.mutedForeground}
              />
            )}
          />
          {errors.firstName && <Text style={[styles.errorText, { color: theme.errorColor }]}>{errors.firstName.message}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.foreground }]}>Last Name</Text>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.foreground }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Last Name"
                placeholderTextColor={theme.mutedForeground}
              />
            )}
          />
          {errors.lastName && <Text style={[styles.errorText, { color: theme.errorColor }]}>{errors.lastName.message}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.foreground }]}>Email</Text>
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
                placeholder="Email"
                placeholderTextColor={theme.mutedForeground}
              />
            )}
          />
          {errors.email && <Text style={[styles.errorText, { color: theme.errorColor }]}>{errors.email.message}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.foreground }]}>Password</Text>
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
                placeholder="Password"
                placeholderTextColor={theme.mutedForeground}
              />
            )}
          />
          {errors.password && <Text style={[styles.errorText, { color: theme.errorColor }]}>{errors.password.message}</Text>}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.primaryForeground} />
          ) : (
            <Text style={[styles.buttonText, { color: theme.primaryForeground }]}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('SignIn' as never)}
      >
        <Text style={[styles.linkText, { color: theme.blue }]}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  themeToggleContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 15,
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