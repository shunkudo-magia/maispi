import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { SeoHead } from '@/components/seo/SeoHead';
import { Colors, FontFamily, FontSize } from '@/constants';

const DIAGNOSIS_TYPES = [
  {
    id: 'archetype-simple',
    title: 'アーキタイプ診断',
    desc: '3問・約2分',
    badge: '定番',
    badgeColor: Colors.primary,
  },
  {
    id: 'archetype-full',
    title: '全次元アーキタイプ診断',
    desc: '8問・二層構造',
    badge: 'PREMIUM',
    badgeColor: '#d4940a',
  },
] as const;

export default function DiagnosisScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <SeoHead
        title="アーキタイプ診断｜まいスピ"
        description="3問・約2分でわかる無料のアーキタイプ診断。あなたの内なる本質を多角的に読み解く、まいスピの人気診断コンテンツ。"
        path="/diagnosis"
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Typography variant="heading" style={styles.pageTitle}>診断</Typography>
        <Typography variant="caption" style={styles.intro}>
          あなたの内なる本質を多角的に読み解きます
        </Typography>

        {DIAGNOSIS_TYPES.map((d) => (
          <TouchableOpacity
            key={d.id}
            onPress={() => router.push({ pathname: '/diagnosis/flow', params: { type: d.id } })}
            activeOpacity={0.75}
          >
            <Card style={styles.diagCard}>
              <View style={styles.diagHeader}>
                <Typography variant="subheading">{d.title}</Typography>
                <View style={[styles.badge, { backgroundColor: d.badgeColor }]}>
                  <Typography style={styles.badgeText}>{d.badge}</Typography>
                </View>
              </View>
              <Typography variant="caption">{d.desc}</Typography>
              <Typography style={styles.arrow}>診断を受ける →</Typography>
            </Card>
          </TouchableOpacity>
        ))}

        <Card style={styles.mbtiBanner}>
          <Typography variant="label" style={styles.mbtiLabel}>MBTI × 月齢</Typography>
          <Typography variant="subheading" style={styles.mbtiTitle}>今月のランキング</Typography>
          <Typography variant="caption">あなたのタイプはどこ？</Typography>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.backgroundAlt },
  content: { padding: 16, gap: 16, paddingBottom: 40 },
  pageTitle: { marginBottom: 0 },
  intro: { marginTop: -8, marginBottom: 4 },
  diagCard: { gap: 8, borderLeftWidth: 4, borderLeftColor: Colors.primary },
  diagHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 10,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  arrow: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.sm,
    color: Colors.primary,
    marginTop: 4,
  },
  mbtiBanner: {
    backgroundColor: Colors.primaryLight,
    gap: 4,
  },
  mbtiLabel: { color: Colors.primary },
  mbtiTitle: { fontSize: FontSize.base },
});
