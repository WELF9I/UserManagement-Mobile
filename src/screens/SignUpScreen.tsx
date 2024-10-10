import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

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

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      //@ts-ignore
      navigation.navigate('SignUpConfirmation');
      console.log('Form data:', data);
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
      {successMessage ? (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageText}>{successMessage}</Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}
        </View>

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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.signInLink}
        //@ts-ignore
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.signInText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
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

  signInLink: {
    marginTop: 16,
  },
  signInText: {
    color: 'blue',
    textAlign: 'center',
  },
});

export default SignUpScreen;