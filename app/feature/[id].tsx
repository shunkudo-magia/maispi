import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Colors, CategoryColors, CategoryKey, FontFamily, FontSize } from '@/constants';
import { getFeature, getArticlesByFeature, type Feature, type Article } from '@/lib/cms';

export default function FeatureScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [feature, setFeature] = useState<Feature | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([getFeature(id), getArticlesByFeature(id)])
      .then(([feat, arts]) => {
        setFeature(feat);
        setArticles(arts);
        if (feat) navigation.setOptions({ title: feat.title });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const cat = feature
    ? (CategoryColors[feature.category as CategoryKey] ?? CategoryColors.love)
    : CategoryColors.love;

  return (
    <SafeAreaView style={styles.root} edges={['bottom']}>
      {loading ? (
        <ActivityIndicator color={Colors.primary} style={styles.spinner} />
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={[styles.hero, { backgroundColor: cat.light }]}>
            <Typography style={[styles.heroLabel, { color: cat.bg }]}>{cat.label}</Typography>
            <Typography variant="heading" style={styles.heroTitle}>
              {feature?.title ?? '特集'}
            </Typography>
            <Typography variant="caption">{feature?.subtitle}</Typography>
          </View>

          <View style={styles.articleList}>
            {articles.length === 0 && (
              <Typography variant="caption" style={styles.empty}>記事はまだありません</Typography>
            )}
            {articles.map((article) => (
              <TouchableOpacity
                key={article.id}
                style={styles.articleCard}
                onPress={() => router.push(`/article/${article.id}`)}
                activeOpacity={0.75}
              >
                {article.thumbnail ? (
                  <View style={[styles.articleThumb, { backgroundColor: cat.light }]} />
                ) : (
                  <View style={[styles.articleThumb, { backgroundColor: cat.light }]} />
                )}
                <View style={styles.articleBody}>
                  <Typography variant="subheading" style={styles.articleTitle}>
                    {article.title}
                  </Typography>
                  <Typography variant="caption" style={styles.articlePreview} numberOfLines={2}>
                    {article.body.replace(/<[^>]+>/g, '')}
                  </Typography>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.backgroundAlt },
  spinner: { marginTop: 80 },
  content: { paddingBottom: 40 },
  hero: { padding: 24, paddingTop: 16, gap: 4 },
  heroLabel: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.xs,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heroTitle: { fontSize: FontSize['2xl'] },
  articleList: { padding: 16, gap: 12 },
  empty: { color: Colors.textMuted, textAlign: 'center', paddingVertical: 32 },
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
