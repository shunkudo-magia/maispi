import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { SeoHead } from '@/components/seo/SeoHead';
import { Colors, FontFamily, FontSize } from '@/constants';

// Placeholder 30-day mock data
const MOCK_SCORES = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  score: 40 + Math.round(Math.sin((i / 29.53) * Math.PI * 2) * 30 + Math.random() * 15),
}));

const MAX_SCORE = 99;
const CHART_HEIGHT = 100;

export default function LogScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <SeoHead
        title="ログ｜まいスピ"
        description="あなたの運気の推移とタロット履歴を確認できるページです。"
        path="/log"
        noindex
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Typography variant="heading" style={styles.pageTitle}>ログ</Typography>

        {/* Fortune graph */}
        <Card>
          <Typography variant="label" style={styles.cardLabel}>30日の運気推移</Typography>
          <View style={styles.chart}>
            {MOCK_SCORES.map(({ day, score }) => (
              <View key={day} style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: (score / MAX_SCORE) * CHART_HEIGHT,
                      backgroundColor: score >= 70 ? Colors.primary : Colors.border,
                    },
                  ]}
                />
              </View>
            ))}
          </View>
          <View style={styles.chartAxis}>
            <Typography variant="caption">1日</Typography>
            <Typography variant="caption">30日</Typography>
          </View>
        </Card>

        {/* Tarot history placeholder */}
        <Card style={styles.section}>
          <Typography variant="label" style={styles.cardLabel}>タロット履歴</Typography>
          <Typography variant="caption" style={styles.emptyText}>
            まだタロットを引いていません
          </Typography>
        </Card>

        {/* Memo section */}
        <Card style={styles.section}>
          <Typography variant="label" style={styles.cardLabel}>気づきメモ</Typography>
          <Typography variant="caption" style={styles.emptyText}>
            メモはまだありません
          </Typography>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.backgroundAlt },
  content: { padding: 16, gap: 16, paddingBottom: 40 },
  pageTitle: { marginBottom: 8 },
  cardLabel: { marginBottom: 12 },
  chart: {
    height: CHART_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  barWrapper: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  bar: { width: '80%', borderRadius: 2, minHeight: 2 },
  chartAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  section: { gap: 8 },
  emptyText: { color: Colors.textMuted, textAlign: 'center', paddingVertical: 16 },
});
