import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';

const ProfilePage = () => {
  const [name, setName] = useState('Mohamed Amine Welfeki');
  const [email, setEmail] = useState('welfkimedamine@gmail.com');
  const [bio, setBio] = useState('This is a bio.');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSaveChanges = () => {
    // Save the updated profile information
    console.log('Saving changes...');
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : null]}>
      <View style={styles.content}>
        <View style={styles.profilePicture}>
          <TouchableOpacity style={styles.cameraButton}>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput style={[styles.input, styles.textarea]} value={bio} onChangeText={setBio} multiline />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  profilePicture: {
    position: 'relative',
    marginVertical: 24,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: '#888',
    marginBottom: 16,
  },
  formGroup: {
    width: '100%',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  textarea: {
    height: 80,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfilePage;