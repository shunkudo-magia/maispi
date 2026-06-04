import React, { useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Colors, FontSize } from '@/constants';
import { LegalDocs, type LegalBlock } from '@/constants/legal';

export default function LegalScreen() {
  const { doc } = useLocalSearchParams<{ doc: string }>();
  const navigation = useNavigation();
  const data = doc ? LegalDocs[doc] : undefined;

  useEffect(() => {
    if (data) navigation.setOptions({ title: data.title });
  }, [data]);

  if (!data) {
    return (
      <SafeAreaView style={styles.root} edges={['bottom']}>
        <Typography variant="caption" style={styles.errorText}>
          ページが見つかりませんでした
        </Typography>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Typography variant="heading" style={styles.title}>
          {data.title}
        </Typography>
        <Typography variant="caption" style={styles.updated}>
          最終改定日：{data.updated}
        </Typography>

        {data.intro && (
          <Typography variant="body" style={styles.intro}>
            {data.intro}
          </Typography>
        )}

        {data.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function Block({ block }: { block: LegalBlock }) {
  return (
    <View style={styles.block}>
      {block.heading && (
        <Typography variant="subheading" style={styles.heading}>
          {block.heading}
        </Typography>
      )}

      {block.paragraphs?.map((p, i) => (
        <Typography key={i} variant="body" style={styles.paragraph}>
          {p}
        </Typography>
      ))}

      {block.bullets?.map((b, i) => (
        <View key={i} style={styles.bulletRow}>
          <Typography variant="body" style={styles.bulletDot}>
            ・
          </Typography>
          <Typography variant="body" style={styles.bulletText}>
            {b}
          </Typography>
        </View>
      ))}

      {block.rows && (
        <View style={styles.table}>
          {block.rows.map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Typography variant="caption" style={styles.tableLabel}>
                {row.label}
              </Typography>
              <Typography variant="body" style={styles.tableValue}>
                {row.value}
              </Typography>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  content: { padding: 24, paddingBottom: 60 },
  errorText: { color: Colors.error, textAlign: 'center', marginTop: 40 },
  title: { fontSize: FontSize.xl, lineHeight: FontSize.xl * 1.4 },
  updated: { color: Colors.textMuted, marginTop: 6, marginBottom: 20 },
  intro: { color: Colors.textSecondary, marginBottom: 12 },
  block: { marginTop: 20, gap: 6 },
  heading: { fontSize: FontSize.md, marginBottom: 2 },
  paragraph: { color: Colors.textSecondary },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start' },
  bulletDot: { color: Colors.primary },
  bulletText: { flex: 1, color: Colors.textSecondary },
  table: {
    marginTop: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
    gap: 2,
  },
  tableLabel: { color: Colors.textMuted },
  tableValue: { color: Colors.text },
});
