import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native';

interface AddRoleModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddRole: (role: string) => void;
}

export const AddRoleModal: React.FC<AddRoleModalProps> = ({
  isVisible,
  onClose,
  onAddRole,
}) => {
  const [newRole, setNewRole] = useState('');

  const handleAddRole = () => {
    if (newRole) {
      onAddRole(newRole);
      setNewRole('');
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Role</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new role"
            value={newRole}
            onChangeText={setNewRole}
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleAddRole}
          >
            <Text style={styles.modalButtonText}>Add Role</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
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

