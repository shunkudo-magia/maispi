import React from 'react';
import { View, ScrollView, StyleSheet, Share } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, FontFamily, FontSize } from '@/constants';

// Archetype map (placeholder — replace with real scoring logic)
const ARCHETYPES = [
  { id: 'sage',     name: '賢者',   desc: '深く考え、本質を見抜く知性の守護者。内なる世界を旅し、真実を求め続けます。' },
  { id: 'lover',    name: '愛人',   desc: '愛と美を体現し、深い繋がりを求める存在。感情の豊かさがあなたの強みです。' },
  { id: 'creator',  name: '創造者', desc: '何もないところから形を生み出す力。独創的なビジョンで世界を変えます。' },
  { id: 'explorer', name: '探求者', desc: '自由と冒険を愛し、常に新しい地平へ向かうエネルギーを持ちます。' },
] as const;

function deriveArchetype(answers: number[]): typeof ARCHETYPES[number] {
  const sum = answers.reduce((a, b) => a + b, 0);
  return ARCHETYPES[sum % ARCHETYPES.length];
}

export default function DiagnosisResultScreen() {
  const { answers: answersStr } = useLocalSearchParams<{ answers: string }>();
  const answers: number[] = answersStr ? JSON.parse(answersStr) : [0, 0, 0];
  const archetype = deriveArchetype(answers);

  async function handleShare() {
    await Share.share({
      message: `私のアーキタイプは「${archetype.name}」でした！\nまいすぴで占断を →`,
    });
  }

  return (
    <SafeAreaView style={styles.root} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Result hero */}
        <View style={styles.hero}>
          <View style={styles.archetypeIcon}>
            <Typography style={styles.archetypeInitial}>
              {archetype.name.charAt(0)}
            </Typography>
          </View>
          <Typography variant="label" style={styles.resultLabel}>あなたのアーキタイプ</Typography>
          <Typography style={styles.archetypeName}>{archetype.name}</Typography>
        </View>

        {/* Description */}
        <Card>
          <Typography variant="body" style={styles.desc}>{archetype.desc}</Typography>
        </Card>

        {/* Dimensions placeholder */}
        <Card style={styles.dimensionsCard}>
          <Typography variant="label" style={styles.dimLabel}>次元スコア（プレビュー）</Typography>
          {['直感力', '感情深度', '創造性', '社会性'].map((dim, i) => (
            <View key={dim} style={styles.dimRow}>
              <Typography variant="caption" style={styles.dimName}>{dim}</Typography>
              <View style={styles.dimBarBg}>
                <View style={[styles.dimBarFill, { width: `${(answers[i % answers.length] + 1) * 25}%` }]} />
              </View>
            </View>
          ))}
          <Typography variant="caption" style={styles.premiumHint}>
            全次元はプレミアムで解放されます
          </Typography>
        </Card>

        <Button label="シェアする" variant="outline" onPress={handleShare} />
        <Button label="ホームへ戻る" variant="ghost" onPress={() => router.replace('/(tabs)')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.backgroundAlt },
  content: { padding: 24, gap: 16, paddingBottom: 40, alignItems: 'stretch' },
  hero: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  archetypeIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primaryLight,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  archetypeInitial: {
    fontFamily: FontFamily.minchoBold,
    fontSize: FontSize['3xl'],
    color: Colors.primary,
  },
  resultLabel: { color: Colors.primary },
  archetypeName: {
    fontFamily: FontFamily.minchoBold,
    fontSize: FontSize['2xl'],
    color: Colors.text,
  },
  desc: { lineHeight: FontSize.base * 1.9 },
  dimensionsCard: { gap: 12 },
  dimLabel: { marginBottom: 4 },
  dimRow: { gap: 6 },
  dimName: { fontSize: FontSize.xs },
  dimBarBg: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  dimBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  premiumHint: {
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
});
