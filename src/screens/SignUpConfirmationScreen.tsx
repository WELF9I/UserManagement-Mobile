import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpConfirmationScreen = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    const timer = setTimeout(() => {
        //@ts-ignore
      navigation.navigate('SignIn');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/mail-envelope.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Request Sent!</Text>
      <Text style={styles.message}>
        Your sign-up request has been sent to the admin for approval. Please wait for confirmation.
      </Text>
      <Text style={styles.submessage}>
        You will be redirected to the login screen shortly.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
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
    color: '#4a90e2',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  submessage: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
});

export default SignUpConfirmationScreen;