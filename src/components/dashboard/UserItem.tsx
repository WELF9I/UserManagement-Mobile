import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Surface, Text, Badge, Button } from 'react-native-paper';
import { User } from '../../types/dashboard';

interface UserItemProps {
  user: User;
  onPress: (user: User) => void;
}

export const UserItem: React.FC<UserItemProps> = ({ user, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'pending': return '#eab308';
      case 'banned': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <Surface style={styles.container}>
      <TouchableOpacity onPress={() => onPress(user)}>
        <View style={styles.content}>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.date}>Registered: {user.registrationDate}</Text>
          </View>
          
          <View style={styles.metadata}>
            <Badge style={[styles.badge, { backgroundColor: '#e5e7eb' }]}>
              {user.role}
            </Badge>
            <Badge style={[styles.badge, { backgroundColor: getStatusColor(user.status) }]}>
              {user.status}
            </Badge>
          </View>
          
          <Button
            mode="outlined"
            onPress={() => onPress(user)}
            style={styles.editButton}
          >
            Edit
          </Button>
        </View>
      </TouchableOpacity>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  userInfo: {
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1f36',
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    borderRadius: 12,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
});

