import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import { useTheme } from '../components/ThemeContext'; // Import the useTheme hook

const SignUpConfirmationScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); // Initialize the translation hook
  const { theme } = useTheme(); // Get the current theme

  React.useEffect(() => {
    const timer = setTimeout(() => {
      //@ts-ignore
      navigation.navigate('SignIn');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image
        source={require('../assets/mail-envelope.png')}
        style={styles.image}
      />
      <Text style={[styles.title, { color: theme.foreground }]}>
        {t('requestSent')}
      </Text>
      <Text style={[styles.message, { color: theme.foreground }]}>
        {t('signUpRequestSent')}
      </Text>
      <Text style={[styles.submessage, { color: theme.mutedForeground }]}>
        {t('redirectToLogin')}
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
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  submessage: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SignUpConfirmationScreen;
