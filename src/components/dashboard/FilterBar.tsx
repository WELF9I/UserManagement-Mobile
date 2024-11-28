import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Divider } from 'react-native-paper';
import { ChevronDown } from 'lucide-react-native';

interface FilterBarProps {
  roleFilter: string;
  statusFilter: string;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  roleFilter,
  statusFilter,
  onRoleFilterChange,
  onStatusFilterChange,
}) => {
  const [roleMenuVisible, setRoleMenuVisible] = useState(false);
  const [statusMenuVisible, setStatusMenuVisible] = useState(false);

  const roles = [
    { label: 'All Roles', value: 'all' },
    { label: 'Admin', value: 'admin' },
    { label: 'Moderator', value: 'moderator' },
    { label: 'User', value: 'user' },
  ];

  const statuses = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
    { label: 'Banned', value: 'banned' },
  ];

  return (
    <View style={styles.container}>
      <Menu
        visible={roleMenuVisible}
        onDismiss={() => setRoleMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setRoleMenuVisible(true)}
            contentStyle={styles.buttonContent}
            style={styles.button}
            icon={({ size, color }) => (
              <ChevronDown size={size} color={color} />
            )}
          >
            {roles.find(r => r.value === roleFilter)?.label}
          </Button>
        }
      >
        {roles.map((role) => (
          <Menu.Item
            key={role.value}
            onPress={() => {
              onRoleFilterChange(role.value);
              setRoleMenuVisible(false);
            }}
            title={role.label}
          />
        ))}
      </Menu>

      <Menu
        visible={statusMenuVisible}
        onDismiss={() => setStatusMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setStatusMenuVisible(true)}
            contentStyle={styles.buttonContent}
            style={styles.button}
            icon={({ size, color }) => (
              <ChevronDown size={size} color={color} />
            )}
          >
            {statuses.find(s => s.value === statusFilter)?.label}
          </Button>
        }
      >
        {statuses.map((status) => (
          <Menu.Item
            key={status.value}
            onPress={() => {
              onStatusFilterChange(status.value);
              setStatusMenuVisible(false);
            }}
            title={status.label}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  buttonContent: {
    flexDirection: 'row-reverse',
  },
});

