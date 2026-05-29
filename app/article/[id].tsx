import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Colors, FontSize } from '@/constants';

// TODO: fetch from Headless CMS (microCMS / Contentful / Notion)
const MOCK: Record<string, { title: string; body: string }> = {
  a1: { title: '満月の夜に告白すべき理由', body: '満月は感情のエネルギーが頂点に達する瞬間。長い間心の中で育ててきた気持ちを言葉にするなら、このタイミングが最も自然です。\n\n月の引力は海の潮を動かすように、私たちの感情にも働きかけています。勇気を出した一歩が、大きな変化の始まりになるでしょう。' },
  a2: { title: '引き寄せを加速する言葉の使い方', body: '言葉は思考を形にする最初の器。ネガティブな否定語を取り除き、すでに実現しているかのように語ることが現実創造の鍵です。' },
};

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const article = MOCK[id ?? ''] ?? { title: '記事が見つかりません', body: '' };

  return (
    <SafeAreaView style={styles.root} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroImage} />
        </View>
        <View style={styles.body}>
          <Typography variant="heading" style={styles.title}>{article.title}</Typography>
          <Typography variant="body" style={styles.text}>{article.body}</Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  content: { paddingBottom: 60 },
  hero: { backgroundColor: Colors.primaryLight },
  heroImage: { width: '100%', height: 220 },
  body: { padding: 24, gap: 16 },
  title: { fontSize: FontSize.xl, lineHeight: FontSize.xl * 1.4 },
  text: { lineHeight: FontSize.base * 1.9, color: Colors.text },
});
