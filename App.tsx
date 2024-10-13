import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpConfirmationScreen from './src/screens/SignUpConfirmationScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import CodeVerificationScreen from './src/screens/CodeVerificationScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import PasswordResetSuccessScreen from './src/screens/PasswordResetSuccessScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AttemptProvider } from './src/components/AttemptContext';
import { ThemeProvider } from './src/components/ThemeContext';
import { TailwindProvider } from 'tailwindcss-react-native';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
    <TailwindProvider>
      <ThemeProvider>
        <AttemptProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen 
                  name="SignIn" 
                  component={SignInScreen} 
                  options={{ title: 'Sign In' , headerShown: false}}
                />
                <Stack.Screen 
                  name="SignUp" 
                  component={SignUpScreen} 
                  options={{ title: 'Sign Up', headerShown: false }}     
                />
                <Stack.Screen 
                  name="SignUpConfirmation" 
                  component={SignUpConfirmationScreen} 
                  options={{ title: 'Sign Up Confirmation', headerShown: false }}
                />
                <Stack.Screen 
                  name="ForgotPassword" 
                  component={ForgotPasswordScreen} 
                  options={{ title: 'Forgot Password' }}
                />
                <Stack.Screen 
                  name="CodeVerification" 
                  component={CodeVerificationScreen} 
                  options={{ title: 'Verify Code' }}
                />
                <Stack.Screen 
                  name="NewPassword" 
                  component={NewPasswordScreen} 
                  options={{ title: 'New Password' }}
                />
                <Stack.Screen 
                  name="PasswordResetSuccess" 
                  component={PasswordResetSuccessScreen} 
                  options={{ title: 'Password Reset', headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </AttemptProvider>
      </ThemeProvider>
    </TailwindProvider>
    </I18nextProvider>
  );
};

export default App;