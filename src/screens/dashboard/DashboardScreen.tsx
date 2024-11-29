import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Text, Portal, Modal, Button, Searchbar, Appbar, DataTable, Chip, SegmentedButtons, Card, IconButton, Menu, Divider, TextInput, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Bell, Settings, BarChart, MoreVertical, Edit, Ban, Trash2, Search, FileDown, UserPlus } from 'lucide-react-native';
import { mockUsers, mockNotifications, mockLogs, mockContent } from './mockData';
import { User } from '../../types/dashboard';
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [roleMenuVisible, setRoleMenuVisible] = useState(false);
  const [statusMenuVisible, setStatusMenuVisible] = useState(false);
  const [newRoleModalVisible, setNewRoleModalVisible] = useState(false);
  const [users, setUsers] = useState<User[]>([...mockUsers]);
  const [newRole, setNewRole] = useState({
    name: '',
    permissions: {
      read: true,
      edit: false,
      delete: false,
    }
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (roleFilter === 'all' || user.role === roleFilter) &&
    (statusFilter === 'all' || user.status === statusFilter)
  );

  const handleExportPDF = () => {
    // Implementation for PDF export
    console.log('Exporting to PDF...');
  };

  const handleCreateRole = () => {
    console.log('Creating new role:', newRole);
    setNewRoleModalVisible(false);
    setNewRole({
      name: '',
      permissions: { read: true, edit: false, delete: false }
    });
  };

  const handleEditUser = (user: User) => {
    setSelectedUser({ ...user });
    setEditModalVisible(true);
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
      setEditModalVisible(false);
    }
  };

  const handleBanUser = (userId: number) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'banned' ? 'active' : 'banned' }
        : user
    ));
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(currentUsers => currentUsers.filter(u => u.id !== userId));
  };

  const renderUserItem = (user: User) => (
    <DataTable.Row 
      key={user.id} 
      style={styles.tableRow}
      onPress={() => {
        setSelectedUser(user);
        setMenuVisible(true);
      }}
    >
      <DataTable.Cell style={styles.nameCell}>
        <View style={styles.nameContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
      </DataTable.Cell>
      
      <DataTable.Cell style={styles.roleCell}>
        <View style={[
          styles.roleContainer,
          { backgroundColor: user.role === 'admin' ? '#E3F2FD' : 
                            user.role === 'moderator' ? '#FFF3E0' : '#F5F5F5' }
        ]}>
          <Text style={[
            styles.roleText,
            { color: user.role === 'admin' ? '#1976D2' : 
                     user.role === 'moderator' ? '#F57C00' : '#616161' }
          ]}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Text>
        </View>
      </DataTable.Cell>
  
      <DataTable.Cell style={styles.statusCell}>
        <View style={[
          styles.statusContainer,
          {
            backgroundColor:
              user.status === 'active' ? '#E8F5E9' :
              user.status === 'pending' ? '#FFF3E0' : '#FFEBEE'
          }
        ]}>
          <View style={[
            styles.statusDot,
            {
              backgroundColor:
                user.status === 'active' ? '#4CAF50' :
                user.status === 'pending' ? '#FFA000' : '#F44336'
            }
          ]} />
          <Text style={[
            styles.statusText,
            {
              color:
                user.status === 'active' ? '#2E7D32' :
                user.status === 'pending' ? '#F57C00' : '#C62828'
            }
          ]}>
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </Text>
        </View>
      </DataTable.Cell>
  
      <DataTable.Cell style={styles.actionsCell}>
        <IconButton
          icon={() => <MoreVertical size={20} color="#666" />}
          onPress={() => {
            setSelectedUser(user);
            setMenuVisible(true);
          }}
          style={styles.actionButton}
        />
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Admin Dashboard" />
        <Appbar.Action icon={() => <Bell size={24} color="#000" />} onPress={() => {}} />
        <Appbar.Action icon={() => <Settings size={24} color="#000" />} onPress={() => navigation.navigate('UpdateProfile' as never)} />
      </Appbar.Header>

      <SegmentedButtons
        value={activeTab}
        onValueChange={setActiveTab}
        buttons={[
          { value: 'users', label: 'Users', icon: () => <Users size={20} /> },
          { value: 'notifications', label: 'Notifications', icon: () => <Bell size={20} /> },
          { value: 'management', label: 'Management', icon: () => <Settings size={20} /> },
          { value: 'analytics', label: 'Analytics', icon: () => <BarChart size={20} /> },
        ]}
        style={styles.tabs}
      />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.content}
      >
        {activeTab === 'users' && (
          <View style={styles.section}>
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                onPress={() => setNewRoleModalVisible(true)}
                icon={() => <UserPlus size={20} color="#fff" />}
                style={styles.actionButton}
              >
                New Role
              </Button>
              <Button
                mode="contained"
                onPress={handleExportPDF}
                icon={() => <FileDown size={20} color="#fff" />}
                style={styles.actionButton}
              >
                Export PDF
              </Button>
            </View>

            <View style={styles.searchContainer}>
              <Search size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                placeholder="Search users..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
              />
            </View>

            <View style={styles.filters}>
              <Menu
                visible={roleMenuVisible}
                onDismiss={() => setRoleMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setRoleMenuVisible(true)}
                    style={styles.filterButton}
                  >
                    Role: {roleFilter}
                  </Button>
                }
              >
                <Menu.Item onPress={() => { setRoleFilter('all'); setRoleMenuVisible(false); }} title="All" />
                <Menu.Item onPress={() => { setRoleFilter('admin'); setRoleMenuVisible(false); }} title="Admin" />
                <Menu.Item onPress={() => { setRoleFilter('moderator'); setRoleMenuVisible(false); }} title="Moderator" />
                <Menu.Item onPress={() => { setRoleFilter('user'); setRoleMenuVisible(false); }} title="User" />
              </Menu>

              <Menu
                visible={statusMenuVisible}
                onDismiss={() => setStatusMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setStatusMenuVisible(true)}
                    style={styles.filterButton}
                  >
                    Status: {statusFilter}
                  </Button>
                }
              >
                <Menu.Item onPress={() => { setStatusFilter('all'); setStatusMenuVisible(false); }} title="All" />
                <Menu.Item onPress={() => { setStatusFilter('active'); setStatusMenuVisible(false); }} title="Active" />
                <Menu.Item onPress={() => { setStatusFilter('pending'); setStatusMenuVisible(false); }} title="Pending" />
                <Menu.Item onPress={() => { setStatusFilter('banned'); setStatusMenuVisible(false); }} title="Banned" />
              </Menu>
            </View>

            <DataTable style={styles.table}>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Role</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
                <DataTable.Title>Actions</DataTable.Title>
              </DataTable.Header>
              {filteredUsers.map(renderUserItem)}
            </DataTable>
          </View>
        )}
      </ScrollView>

      <Portal>
        <Modal
          visible={editModalVisible}
          onDismiss={() => setEditModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>Edit User</Text>
          <TextInput
            mode="outlined"
            label="Name"
            value={selectedUser?.name}
            onChangeText={(text) => setSelectedUser(prev => prev ? { ...prev, name: text } : null)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Email"
            value={selectedUser?.email}
            onChangeText={(text) => setSelectedUser(prev => prev ? { ...prev, email: text } : null)}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleUpdateUser}
            style={styles.modalButton}
          >
            Save Changes
          </Button>
        </Modal>

        <Modal
          visible={newRoleModalVisible}
          onDismiss={() => setNewRoleModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>Create New Role</Text>
          <TextInput
            mode="outlined"
            label="Role Name"
            value={newRole.name}
            onChangeText={(text) => setNewRole(prev => ({ ...prev, name: text }))}
            style={styles.input}
          />
          <Text style={styles.permissionsTitle}>Permissions</Text>
          <View style={styles.permissions}>
            <View style={styles.permission}>
              <Checkbox
                status={newRole.permissions.read ? 'checked' : 'unchecked'}
                onPress={() => setNewRole(prev => ({
                  ...prev,
                  permissions: { ...prev.permissions, read: !prev.permissions.read }
                }))}
              />
              <Text>Read</Text>
            </View>
            <View style={styles.permission}>
              <Checkbox
                status={newRole.permissions.edit ? 'checked' : 'unchecked'}
                onPress={() => setNewRole(prev => ({
                  ...prev,
                  permissions: { ...prev.permissions, edit: !prev.permissions.edit }
                }))}
              />
              <Text>Edit</Text>
            </View>
            <View style={styles.permission}>
              <Checkbox
                status={newRole.permissions.delete ? 'checked' : 'unchecked'}
                onPress={() => setNewRole(prev => ({
                  ...prev,
                  permissions: { ...prev.permissions, delete: !prev.permissions.delete }
                }))}
              />
              <Text>Delete</Text>
            </View>
          </View>
          <Button
            mode="contained"
            onPress={handleCreateRole}
            style={styles.modalButton}
          >
            Create Role
          </Button>
        </Modal>

        <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={{ x: 0, y: 0 }}
            >
            <Menu.Item
                onPress={() => {
                setMenuVisible(false);
                if (selectedUser) handleEditUser(selectedUser);
                }}
                title="Edit"
                leadingIcon={() => <Edit size={20} />}
            />
            <Menu.Item
                onPress={() => {
                setMenuVisible(false);
                if (selectedUser) {
                    handleBanUser(selectedUser.id);
                }
                }}
                title={selectedUser?.status === 'banned' ? 'Unban' : 'Ban'}
                leadingIcon={() => <Ban size={20} />}
            />
            <Divider />
            <Menu.Item
                onPress={() => {
                setMenuVisible(false);
                if (selectedUser) handleDeleteUser(selectedUser.id);
                }}
                title="Delete"
                leadingIcon={() => <Trash2 size={20} />}
            />
            </Menu>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabs: {
    margin: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 40,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    flex: 1,
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },

  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statusChip: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  modalButton: {
    marginTop: 16,
  },
  permissionsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
  },
  permissions: {
    marginTop: 8,
  },
  permission: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statsCard: {
    flex: 1,
    minWidth: '45%',
  },
  statsChange: {
    color: '#4CAF50',
    marginTop: 8,
  },

  nameCell: {
    flex: 2,
    paddingVertical: 12,
  },

  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: '500',
  },

  userName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#212121',
  },

  userEmail: {
    fontSize: 13,
    color: '#757575',
    marginTop: 2,
  },

  roleCell: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 5,
  },

  roleContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },

  roleText: {
    fontSize: 13,
    fontWeight: '500',
  },

  statusCell: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 5,
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 6,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },

  actionsCell: {
    flex: 0.5,
    justifyContent: 'center',
  },

  actionButton: {
    margin: 0,
  },

  tableHeader: {
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    height: 48,
  },

  headerText: {
    color: '#616161',
    fontSize: 13,
    fontWeight: '500',
  },
});

