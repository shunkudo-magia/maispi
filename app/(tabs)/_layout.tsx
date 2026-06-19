import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, FontSize } from '@/constants';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

function tabIcon(active: IoniconName, inactive: IoniconName) {
  return ({ color, focused, size }: { color: string; focused: boolean; size: number }) => (
    <Ionicons name={focused ? active : inactive} size={size - 2} color={color} />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          borderTopColor: Colors.border,
          backgroundColor: Colors.white,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontFamily: FontFamily.roundedMedium,
          fontSize: FontSize.xs,
        },
        headerStyle: { backgroundColor: Colors.surface },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: FontFamily.roundedBold,
          fontSize: FontSize.md,
          color: Colors.text,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'ホーム', tabBarLabel: 'ホーム', tabBarIcon: tabIcon('moon', 'moon-outline') }}
      />
      <Tabs.Screen
        name="features"
        options={{ title: '特集', tabBarLabel: '特集', tabBarIcon: tabIcon('sparkles', 'sparkles-outline') }}
      />
      <Tabs.Screen
        name="diagnosis"
        options={{ title: '診断', tabBarLabel: '診断', tabBarIcon: tabIcon('planet', 'planet-outline') }}
      />
      <Tabs.Screen
        name="log"
        options={{ title: 'ログ', tabBarLabel: 'ログ', tabBarIcon: tabIcon('book', 'book-outline') }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: '設定', tabBarLabel: '設定', tabBarIcon: tabIcon('settings', 'settings-outline') }}
      />
    </Tabs>
  );
}
