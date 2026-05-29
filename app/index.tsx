import { Redirect } from 'expo-router';

// TODO: check AsyncStorage for onboarding completion
export default function Index() {
  return <Redirect href="/onboarding" />;
}
