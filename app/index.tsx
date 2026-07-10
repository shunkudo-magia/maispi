import { Redirect } from 'expo-router';
import { Platform } from 'react-native';

// Web(my-spi.com)では毎回オンボーディングへ強制遷移すると、
// 検索エンジンや再訪ユーザーがトップページの実コンテンツに到達できない
// （クローラビリティ・直帰率の両面で不利）ため、web だけ本来のホームへ通す。
// ネイティブアプリの初回オンボーディング体験はそのまま維持する。
export default function Index() {
  if (Platform.OS === 'web') {
    return <Redirect href="/(tabs)" />;
  }

  // TODO: check AsyncStorage for onboarding completion
  return <Redirect href="/onboarding" />;
}
