import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  ShipporiMincho_400Regular,
  ShipporiMincho_500Medium,
  ShipporiMincho_700Bold,
} from '@expo-google-fonts/shippori-mincho';
import {
  NotoSansJP_400Regular,
  NotoSansJP_500Medium,
  NotoSansJP_700Bold,
} from '@expo-google-fonts/noto-sans-jp';
import { Colors } from '@/constants';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ShipporiMincho_400Regular,
    ShipporiMincho_500Medium,
    ShipporiMincho_700Bold,
    NotoSansJP_400Regular,
    NotoSansJP_500Medium,
    NotoSansJP_700Bold,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.primary,
          headerTitleStyle: { color: Colors.text },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="feature/[id]" options={{ title: '特集' }} />
        <Stack.Screen name="article/[id]" options={{ title: '' }} />
        <Stack.Screen name="diagnosis/flow" options={{ title: '診断', headerBackTitle: '' }} />
        <Stack.Screen name="diagnosis/result" options={{ title: '診断結果', headerBackTitle: '' }} />
        <Stack.Screen name="legal/[doc]" options={{ title: '' }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
