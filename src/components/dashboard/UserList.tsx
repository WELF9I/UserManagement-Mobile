import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { User } from '../../types/dashboard';
import { UserPlus, FileText } from 'lucide-react-native';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { UserItem } from './UserItem';
import { EditUserModal } from './EditUserModal';
import { AddRoleModal } from './AddRoleModal';
import { ExportUsersModal } from './ExportUserModal';
import { Button } from 'react-native-paper';

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onStatusChange: (userId: number, status: 'active' | 'pending' | 'banned') => void;
  onAddRole: (role: string) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  onEditUser,
  onStatusChange,
  onAddRole,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddRoleModalVisible, setIsAddRoleModalVisible] = useState(false);
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (roleFilter === 'all' || user.role === roleFilter) &&
      (statusFilter === 'all' || user.status === statusFilter)
    );
    setFilteredUsers(filtered);
  }, [users, searchQuery, roleFilter, statusFilter]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalVisible(true);
  };

  const ListHeaderComponent = () => (
    <View style={styles.header}>
      <Text style={styles.title}>User Management</Text>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FilterBar
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        onRoleFilterChange={setRoleFilter}
        onStatusFilterChange={setStatusFilter}
      />
    </View>
  );

  const ListFooterComponent = () => (
    <View style={styles.footer}>
      <Button
        mode="outlined"
        onPress={() => setIsAddRoleModalVisible(true)}
        icon={({ size, color }) => (
          <UserPlus size={size} color={color} />
        )}
        style={styles.button}
      >
        Add Role
      </Button>
      
      <Button
        mode="outlined"
        onPress={() => setIsExportModalVisible(true)}
        icon={({ size, color }) => (
          <FileText size={size} color={color} />
        )}
        style={styles.button}
      >
        Export Users
      </Button>
    </View>
  );

  return (
    <Surface style={styles.container}>
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <UserItem user={item} onPress={handleEditUser} />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        stickyHeaderIndices={[0]}
      />

      <EditUserModal
        isVisible={isEditModalVisible}
        user={selectedUser}
        onClose={() => setIsEditModalVisible(false)}
        onSave={onEditUser}
      />
      <AddRoleModal
        isVisible={isAddRoleModalVisible}
        onClose={() => setIsAddRoleModalVisible(false)}
        onAddRole={onAddRole}
      />
      <ExportUsersModal
        isVisible={isExportModalVisible}
        onClose={() => setIsExportModalVisible(false)}
        users={filteredUsers}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  header: {
    backgroundColor: '#f6f8fa',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1a1f36',
  },
  listContainer: {
    flexGrow: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  button: {
    flex: 0.48,
    borderRadius: 8,
  },
});

