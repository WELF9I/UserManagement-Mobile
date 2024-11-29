import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, Image, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { z } from 'zod';
import { launchImageLibrary } from 'react-native-image-picker';
import { Camera, Facebook, Mail, Edit2, ChevronRight } from 'lucide-react-native';

// Zod schema for validation
const profileSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(200, 'Bio must be under 200 characters'),
});

const ProfilePage = () => {
  const [firstName, setFirstName] = useState('Mohamed Amine');
  const [lastName, setLastName] = useState('Welfeki');
  const [email, setEmail] = useState('welfkimedamine@gmail.com');
  const [bio, setBio] = useState('This is a bio.');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets?.[0]?.uri };
        setProfileImage(source.uri || null);
      }
    });
  };

  const handleSaveChanges = () => {
    const inputData = { firstName, lastName, email, bio };

    try {
      profileSchema.parse(inputData); // Validate using Zod
      setErrors({});
      console.log('Inputs are valid. Saving changes...', inputData);
    } catch (e) {
      if (e instanceof z.ZodError) {
        const fieldErrors = e.errors.reduce((acc, error) => {
          acc[error.path[0] as string] = error.message;
          return acc;
        }, {} as Record<string, string>);
        setErrors(fieldErrors);
      }
    }
  };

  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDarkMode && styles.darkText]}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.profilePicture} onPress={handleImagePicker}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.initialsContainer}>
              <Text style={styles.initials}>{getInitials()}</Text>
            </View>
          )}
          <View style={styles.cameraButton}>
            <Camera size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={[styles.name, isDarkMode && styles.darkText]}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.form}>
          {/* First Name */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>First Name</Text>
            <TextInput
              mode="outlined"
              value={firstName}
              onChangeText={setFirstName}
              right={<TextInput.Icon icon={() => <Edit2 size={20} />} />}
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
          </View>

          {/* Last Name */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Last Name</Text>
            <TextInput
              mode="outlined"
              value={lastName}
              onChangeText={setLastName}
              right={<TextInput.Icon icon={() => <Edit2 size={20} />} />}
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
          </View>

          {/* Email */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Email</Text>
            <TextInput
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              right={<TextInput.Icon icon={() => <Edit2 size={20} />} />}
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Bio */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Bio</Text>
            <TextInput
              mode="outlined"
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              style={[styles.input, styles.textarea]}
              outlineStyle={styles.inputOutline}
            />
            {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}
            <Text style={styles.charCount}>
              {bio.length} characters
            </Text>
          </View>

          {/* Dark Mode Switch */}
          <View style={styles.settingRow}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>

          {/* Social Buttons */}
          <TouchableOpacity style={styles.socialButton}>
            <Facebook size={24} color="#1877F2" />
            <Text style={styles.socialButtonText}>Connect with Facebook</Text>
            <ChevronRight size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={{ uri: 'https://www.google.com/favicon.ico' }} 
              style={styles.googleIcon} 
            />
            <Text style={styles.socialButtonText}>Connect with Google</Text>
            <ChevronRight size={24} color="#666" />
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  profilePicture: {
    position: 'relative',
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  initialsContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#666',
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
    color: '#666',
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'transparent',
  },
  inputOutline: {
    borderRadius: 8,
  },
  textarea: {
    minHeight: 100,
  },
  charCount: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 12,
  },
  socialButtonText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  darkText: {
    color: '#fff',
  },
});

export default ProfilePage;