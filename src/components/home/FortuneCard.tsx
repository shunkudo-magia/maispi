import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { Typography } from '../ui/Typography';
import { Colors, FontFamily, FontSize } from '@/constants';

interface FortuneCardProps {
  moonAge: number;
  pressure: number;
  overallScore: number;
  message: string;
}

export function FortuneCard({ moonAge, pressure, overallScore, message }: FortuneCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Typography variant="label">今日の運気</Typography>
        <View style={styles.scoreBadge}>
          <Typography style={styles.scoreText}>{overallScore}</Typography>
        </View>
      </View>
      <Typography variant="heading" style={styles.message}>{message}</Typography>
      <View style={styles.meta}>
        <MetaItem label="月齢" value={`${moonAge.toFixed(1)}`} />
        <MetaItem label="気圧" value={`${pressure} hPa`} />
      </View>
    </Card>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaItem}>
      <Typography variant="caption">{label}</Typography>
      <Typography style={styles.metaValue}>{value}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderTopWidth: 3,
    borderTopColor: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontFamily: FontFamily.minchoBold,
    fontSize: FontSize.md,
    color: Colors.primary,
  },
  message: {
    fontSize: FontSize.lg,
    marginBottom: 16,
    lineHeight: FontSize.lg * 1.5,
  },
  meta: {
    flexDirection: 'row',
    gap: 24,
  },
  metaItem: {
    gap: 2,
  },
  metaValue: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.sm,
    color: Colors.text,
  },
});
