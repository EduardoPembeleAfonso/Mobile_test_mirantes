import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#E6EDF2',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '400',
          marginTop: 2,
        },
        tabBarActiveTintColor: '#0B89CE',
        tabBarInactiveTintColor: '#A1AAB5',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Página inicial',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Vagas',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="briefcase" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="headhunter"
        options={{
          title: 'Headhunter',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Entrevistas',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="id-badge" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}