import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Colors, CategoryColors, CategoryKey, FontFamily, FontSize } from '@/constants';
import { getFeatures, type Feature } from '@/lib/cms';

export default function FeaturesScreen() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFeatures()
      .then(setFeatures)
      .catch(() => setError('特集の取得に失敗しました'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Typography variant="heading" style={styles.pageTitle}>特集</Typography>

        {loading && <ActivityIndicator color={Colors.primary} style={styles.spinner} />}
        {error && <Typography variant="caption" style={styles.errorText}>{error}</Typography>}

        {features.map((f) => {
          const cat = CategoryColors[f.category as CategoryKey] ?? CategoryColors.love;
          return (
            <TouchableOpacity
              key={f.id}
              style={styles.card}
              onPress={() => router.push(`/feature/${f.id}`)}
              activeOpacity={0.75}
            >
              <View style={[styles.accent, { backgroundColor: cat.bg }]} />
              <View style={styles.cardBody}>
                <Typography style={[styles.categoryLabel, { color: cat.bg }]}>
                  {cat.label}
                </Typography>
                <Typography variant="subheading" style={styles.issueTitle}>
                  {f.title}
                </Typography>
                <Typography variant="caption">{f.subtitle}</Typography>
              </View>
              {f.coverImage ? (
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                <View style={[styles.thumbnail, { backgroundColor: cat.light }]} />
                // TODO: replace with <Image source={{ uri: f.coverImage.url }} />
              ) : (
                <View style={[styles.thumbnail, { backgroundColor: cat.light }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.backgroundAlt },
  content: { padding: 16, gap: 12, paddingBottom: 40 },
  pageTitle: { marginBottom: 8 },
  spinner: { marginTop: 40 },
  errorText: { color: Colors.error, textAlign: 'center', marginTop: 24 },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  accent: { width: 4, alignSelf: 'stretch' },
  cardBody: { flex: 1, padding: 16, gap: 4 },
  categoryLabel: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.xs,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  issueTitle: { fontSize: FontSize.base, lineHeight: FontSize.base * 1.4 },
  thumbnail: { width: 72, height: 72, margin: 12, borderRadius: 8 },
});
