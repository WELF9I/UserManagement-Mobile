import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PasswordResetSuccessScreen = () => {
  const navigation = useNavigation();

  const handleGoToSignIn = () => {
    //@ts-ignore
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Password Successfully Reset</Text>
        <View style={styles.checkMarkContainer}>
          <Image
            source={require('../assets/check-mark.png')}
            style={styles.checkMarkImage}
          />
        </View>
        <Text style={styles.message}>Your password has been successfully reset.</Text>
        <TouchableOpacity style={styles.button} onPress={handleGoToSignIn}>
          <Text style={styles.buttonText}>Go to Sign In</Text>
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
    backgroundColor: 'white',
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
    width:200,
    height:200,
    borderRadius:300,
    resizeMode: 'contain',
  },
  message: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PasswordResetSuccessScreen;