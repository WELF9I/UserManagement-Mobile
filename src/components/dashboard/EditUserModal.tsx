import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { User } from '../../types/dashboard';

interface EditUserModalProps {
  isVisible: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  isVisible,
  user,
  onClose,
  onSave,
}) => {
  const [editedUser, setEditedUser] = React.useState<User | null>(user);

  React.useEffect(() => {
    setEditedUser(user);
  }, [user]);

  if (!editedUser) return null;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit User</Text>
          <Text>Name: {editedUser.name}</Text>
          <Text>Email: {editedUser.email}</Text>
          <Picker
            selectedValue={editedUser.role}
            onValueChange={(itemValue) => 
              setEditedUser({...editedUser, role: itemValue})
            }
          >
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Moderator" value="moderator" />
            <Picker.Item label="User" value="user" />
          </Picker>
          <Picker
            selectedValue={editedUser.status}
            onValueChange={(itemValue) => 
              setEditedUser({...editedUser, status: itemValue})
            }
          >
            <Picker.Item label="Active" value="active" />
            <Picker.Item label="Pending" value="pending" />
            <Picker.Item label="Banned" value="banned" />
          </Picker>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              onSave(editedUser);
              onClose();
            }}
          >
            <Text style={styles.modalButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButton: {
    backgroundColor: '#ef4444',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

