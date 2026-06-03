import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FortuneCard } from '@/components/home/FortuneCard';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Logo } from '@/components/ui/Logo';
import { Colors, CategoryColors, CategoryKey, FontFamily, FontSize } from '@/constants';
import { useMoonAge } from '@/hooks/useMoonAge';
import { getMoonPhaseName } from '@/utils/fortune';

const FEATURES: { id: string; category: CategoryKey; title: string; count: number }[] = [
  { id: 'love',   category: 'love',   title: 'LOVEの特集',   count: 4 },
  { id: 'money',  category: 'money',  title: 'MONEYの特集',  count: 4 },
  { id: 'family', category: 'family', title: 'FAMILYの特集', count: 4 },
  { id: 'body',   category: 'body',   title: 'BODYの特集',   count: 4 },
];

export default function HomeScreen() {
  const moonAge = useMoonAge();
  const phaseName = getMoonPhaseName(moonAge);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Logo variant="horizontal" size={30} />
          <View style={styles.moonBadge}>
            <Typography variant="caption">{phaseName}</Typography>
          </View>
        </View>

        {/* Today's fortune */}
        <FortuneCard
          moonAge={moonAge}
          pressure={1013}
          overallScore={78}
          message="静かに内省する日。焦りを手放すと道が開ける。"
        />

        {/* Features grid */}
        <Typography variant="subheading" style={styles.sectionTitle}>今月の特集</Typography>
        <View style={styles.featuresGrid}>
          {FEATURES.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[styles.featureCard, { backgroundColor: CategoryColors[f.category].light }]}
              onPress={() => router.push(`/feature/${f.id}`)}
              activeOpacity={0.75}
            >
              <Typography
                style={[styles.featureLabel, { color: CategoryColors[f.category].bg }]}
              >
                {CategoryColors[f.category].label}
              </Typography>
              <Typography variant="caption">{f.count} 記事</Typography>
            </TouchableOpacity>
          ))}
        </View>

        {/* Profile prompt */}
        <Card style={styles.profileCard}>
          <Typography variant="subheading" style={styles.profileTitle}>
            診断でより精度が上がります
          </Typography>
          <Typography variant="caption" style={styles.profileBody}>
            生年月日を登録するとパーソナライズされた運気が届きます
          </Typography>
          <TouchableOpacity onPress={() => router.push('/(tabs)/diagnosis')} activeOpacity={0.75}>
            <Typography style={styles.profileLink}>診断を受ける →</Typography>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.backgroundAlt },
  content: { padding: 16, gap: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  moonBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
  },
  sectionTitle: { marginTop: 4 },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    gap: 6,
  },
  featureLabel: {
    fontFamily: FontFamily.minchoBold,
    fontSize: FontSize.md,
  },
  profileCard: { gap: 8 },
  profileTitle: { fontSize: FontSize.base },
  profileBody: { lineHeight: FontSize.sm * 1.6 },
  profileLink: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.sm,
    color: Colors.primary,
    marginTop: 4,
  },
});
