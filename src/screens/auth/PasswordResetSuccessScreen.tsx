import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; 
import { useTheme } from '../../components/theme/ThemeContext'; 
import { authService } from '../../services/authService';

const PasswordResetSuccessScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); 
  const { theme } = useTheme(); 

  const handleGoToSignIn = () => {
    //@ts-ignore
    navigation.navigate('SignIn');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.foreground }]}>
          {t('passwordSuccessfullyReset')}
        </Text>
        <View style={styles.checkMarkContainer}>
          <Image
            source={require('../../assets/check-mark.png')}
            style={styles.checkMarkImage}
          />
        </View>
        <Text style={[styles.message, { color: theme.foreground }]}>
          {t('yourPasswordHasBeenReset')}
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleGoToSignIn}
        >
          <Text style={[styles.buttonText, { color: theme.primaryForeground }]}>
            {t('goToSignIn')}
          </Text>
        </TouchableOpacity>
      </View>
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
  content: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  checkMarkContainer: {
    marginVertical: 30,
  },
  checkMarkImage: {
    width: 200,
    height: 200,
    borderRadius: 300,
    resizeMode: 'contain',
  },
  message: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PasswordResetSuccessScreen;
