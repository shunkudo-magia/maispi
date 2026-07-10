import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { ArticleBody } from '@/components/ui/ArticleBody';
import { SeoHead, SITE_URL, SITE_NAME, stripHtml } from '@/components/seo/SeoHead';
import { Colors, CategoryColors, CategoryKey, FontSize } from '@/constants';
import { getArticle, type Article } from '@/lib/cms';

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    getArticle(id)
      .then((data) => {
        setArticle(data);
        if (data) navigation.setOptions({ title: data.title });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const cat = article
    ? (CategoryColors[article.category as CategoryKey] ?? CategoryColors.love)
    : CategoryColors.love;

  if (loading) {
    return (
      <SafeAreaView style={styles.root} edges={['bottom']}>
        <ActivityIndicator color={Colors.primary} style={styles.spinner} />
      </SafeAreaView>
    );
  }

  if (error || !article) {
    return (
      <SafeAreaView style={styles.root} edges={['bottom']}>
        <Typography variant="caption" style={styles.errorText}>
          記事の取得に失敗しました
        </Typography>
      </SafeAreaView>
    );
  }

  const ogImage = article.thumbnail ? `${article.thumbnail.url}?w=1200` : undefined;

  return (
    <SafeAreaView style={styles.root} edges={['bottom']}>
      <SeoHead
        title={`${article.title}｜まいスピ`}
        description={stripHtml(article.body)}
        path={`/article/${id}`}
        ogImage={ogImage}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: stripHtml(article.body),
          image: ogImage ?? `${SITE_URL}/og-image.png`,
          datePublished: article.publishedAt,
          dateModified: article.revisedAt ?? article.updatedAt,
          author: { '@type': 'Organization', name: SITE_NAME },
          publisher: { '@type': 'Organization', name: SITE_NAME },
          mainEntityOfPage: `${SITE_URL}/article/${id}`,
        }}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero image */}
        {article.thumbnail ? (
          <Image
            source={{ uri: article.thumbnail.url + '?w=800' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.heroImage, { backgroundColor: cat.light }]} />
        )}

        <View style={styles.body}>
          {/* Category label */}
          <Typography style={[styles.categoryLabel, { color: cat.bg }]}>
            {cat.label}
          </Typography>

          {/* Title */}
          <Typography variant="heading" style={styles.title}>
            {article.title}
          </Typography>

          {/* Published date */}
          {article.publishedAt && (
            <Typography variant="caption" style={styles.date}>
              {new Date(article.publishedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          )}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Body */}
          <ArticleBody html={article.body} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  spinner: { marginTop: 80 },
  errorText: { color: Colors.error, textAlign: 'center', marginTop: 40 },
  content: { paddingBottom: 60 },
  heroImage: { width: '100%', height: 240 },
  body: { padding: 24, gap: 10 },
  categoryLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  title: { fontSize: FontSize.xl, lineHeight: FontSize.xl * 1.4, marginTop: 4 },
  date: { color: Colors.textMuted },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
});
