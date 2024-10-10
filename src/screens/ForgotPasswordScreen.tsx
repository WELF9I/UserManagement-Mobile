import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAttempt } from '../components/AttemptContext';

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

  const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    if (resetBlockUntil && Date.now() < resetBlockUntil) {
      const minutesLeft = Math.ceil((resetBlockUntil - Date.now()) / (1000 * 60));
      setSubmitError(`Please wait ${minutesLeft} minutes before requesting another code.`);
      return;
    }

    setIsLoading(true);
    setSubmitError('');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await decrementResetAttempts();
      
      setSuccessMessage('A reset code has been sent to your email.');
      
      // Navigate to Code Verification screen after a short delay
      setTimeout(() => {
        //@ts-ignore
        navigation.navigate('CodeVerification', { email: data.email });
      }, 2000);
    } catch (error) {
      console.error('Forgot password error:', error);
      setSubmitError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      
      {successMessage ? (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageText}>{successMessage}</Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        </View>

        {submitError ? (
          <View style={styles.errorMessage}>
            <Text style={styles.errorMessageText}>{submitError}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          //@ts-ignore
          disabled={isLoading || (resetBlockUntil && Date.now() < resetBlockUntil)}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Send Reset Code</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.attemptsText}>
          Reset attempts left: {Math.max(resetAttempts, 0)}
        </Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'white',
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
    borderColor: '#d1d5db',
    borderRadius: 4,
    padding: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 4,
    padding: 12,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
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
    color: 'gray',
  },
});

export default ForgotPasswordScreen;