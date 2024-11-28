import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Users, Bell, Settings, FileText, BarChart } from 'lucide-react-native';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { key: 'users', icon: Users, label: 'Users' },
    { key: 'notifications', icon: Bell, label: 'Notifications' },
    { key: 'app-management', icon: Settings, label: 'App' },
    { key: 'content', icon: FileText, label: 'Content' },
    { key: 'analytics', icon: BarChart, label: 'Analytics' },
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {tabs.map(({ key, icon: Icon, label }) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.tab,
            activeTab === key && styles.activeTab
          ]}
          onPress={() => onTabChange(key)}
        >
          <Icon
            size={20}
            color={activeTab === key ? '#000' : '#666'}
          />
          <Text style={[
            styles.tabText,
            activeTab === key && styles.activeTabText
          ]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
});

