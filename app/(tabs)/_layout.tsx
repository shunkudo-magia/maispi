import { Tabs } from 'expo-router';
import { Colors, FontFamily, FontSize } from '@/constants';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          borderTopColor: Colors.border,
          backgroundColor: Colors.white,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontFamily: FontFamily.sans,
          fontSize: FontSize.xs,
        },
        headerStyle: { backgroundColor: Colors.white },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: FontFamily.minchoBold,
          fontSize: FontSize.md,
          color: Colors.text,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'ホーム', tabBarLabel: 'ホーム' }}
      />
      <Tabs.Screen
        name="features"
        options={{ title: '特集', tabBarLabel: '特集' }}
      />
      <Tabs.Screen
        name="diagnosis"
        options={{ title: '診断', tabBarLabel: '診断' }}
      />
      <Tabs.Screen
        name="log"
        options={{ title: 'ログ', tabBarLabel: 'ログ' }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: '設定', tabBarLabel: '設定' }}
      />
    </Tabs>
  );
}
