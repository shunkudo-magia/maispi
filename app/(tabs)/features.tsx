import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Colors, CategoryColors, CategoryKey, FontFamily, FontSize } from '@/constants';

const ISSUES: { id: string; category: CategoryKey; title: string; subtitle: string }[] = [
  { id: 'love-01',   category: 'love',   title: '愛を引き寄せる月の引力',    subtitle: '2025年7月号' },
  { id: 'money-01',  category: 'money',  title: '豊かさを解放するリセット術', subtitle: '2025年7月号' },
  { id: 'family-01', category: 'family', title: '家族の絆を深める夏至の智慧', subtitle: '2025年7月号' },
  { id: 'body-01',   category: 'body',   title: '身体と対話する内なる声',    subtitle: '2025年7月号' },
];

export default function FeaturesScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Typography variant="heading" style={styles.pageTitle}>特集</Typography>
        {ISSUES.map((issue) => {
          const cat = CategoryColors[issue.category];
          return (
            <TouchableOpacity
              key={issue.id}
              style={styles.card}
              onPress={() => router.push(`/feature/${issue.id}`)}
              activeOpacity={0.75}
            >
              <View style={[styles.accent, { backgroundColor: cat.bg }]} />
              <View style={styles.cardBody}>
                <Typography style={[styles.categoryLabel, { color: cat.bg }]}>
                  {cat.label}
                </Typography>
                <Typography variant="subheading" style={styles.issueTitle}>
                  {issue.title}
                </Typography>
                <Typography variant="caption">{issue.subtitle}</Typography>
              </View>
              <View style={[styles.thumbnail, { backgroundColor: cat.light }]} />
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
