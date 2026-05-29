import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Colors, CategoryColors, CategoryKey, FontFamily, FontSize } from '@/constants';

const MOCK_ARTICLES: Record<string, { category: CategoryKey; articles: { id: string; title: string; body: string }[] }> = {
  'love':   { category: 'love',   articles: [{ id: 'a1', title: '満月の夜に告白すべき理由', body: '月のエネルギーが感情を増幅させます。' }, { id: 'a2', title: '引き寄せを加速する言葉の使い方', body: '言葉は現実を形作る種です。' }] },
  'money':  { category: 'money',  articles: [{ id: 'a3', title: '金星期に投資を始めるタイミング', body: '金星の周期と豊かさの関係を解説。' }] },
  'family': { category: 'family', articles: [{ id: 'a4', title: '家族の星座バランスを読む', body: '家族それぞれの月のサインを活かす方法。' }] },
  'body':   { category: 'body',   articles: [{ id: 'a5', title: '月の満ち欠けとデトックス', body: '月齢に合わせた身体ケアのリズム。' }] },
};

export default function FeatureScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryId = id?.split('-')[0] as CategoryKey;
  const data = MOCK_ARTICLES[categoryId] ?? MOCK_ARTICLES['love'];
  const cat = CategoryColors[data.category];

  return (
    <SafeAreaView style={styles.root} edges={['bottom']}>
      <View style={[styles.hero, { backgroundColor: cat.light }]}>
        <Typography style={[styles.heroLabel, { color: cat.bg }]}>{cat.label}</Typography>
        <Typography variant="heading" style={styles.heroTitle}>特集</Typography>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {data.articles.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={styles.articleCard}
            onPress={() => router.push(`/article/${article.id}`)}
            activeOpacity={0.75}
          >
            <View style={[styles.articleThumb, { backgroundColor: cat.light }]} />
            <View style={styles.articleBody}>
              <Typography variant="subheading" style={styles.articleTitle}>
                {article.title}
              </Typography>
              <Typography variant="caption" style={styles.articlePreview}>
                {article.body}
              </Typography>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.backgroundAlt },
  hero: { padding: 24, paddingTop: 16, gap: 4 },
  heroLabel: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.xs,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heroTitle: { fontSize: FontSize['2xl'] },
  content: { padding: 16, gap: 12, paddingBottom: 40 },
  articleCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  articleThumb: { width: 80, height: 80 },
  articleBody: { flex: 1, padding: 12, gap: 4, justifyContent: 'center' },
  articleTitle: { fontSize: FontSize.sm, lineHeight: FontSize.sm * 1.4 },
  articlePreview: { lineHeight: FontSize.sm * 1.5 },
});
