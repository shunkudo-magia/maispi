import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LogoMark } from '../ui/Logo';
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
    <View style={styles.card}>
      {/* 装飾の三日月マーク（白・うっすら） */}
      <View style={styles.watermark} pointerEvents="none">
        <LogoMark size={150} color="#ffffff" />
      </View>

      <View style={styles.header}>
        <Typography style={styles.label}>今日の運気</Typography>
        <View style={styles.scoreBadge}>
          <Typography style={styles.scoreText}>{overallScore}</Typography>
        </View>
      </View>
      <Typography style={styles.message}>{message}</Typography>
      <View style={styles.meta}>
        <MetaItem label="月齢" value={`${moonAge.toFixed(1)}`} />
        <MetaItem label="気圧" value={`${pressure} hPa`} />
      </View>
    </View>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaItem}>
      <Typography style={styles.metaLabel}>{label}</Typography>
      <Typography style={styles.metaValue}>{value}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  watermark: {
    position: 'absolute',
    right: -28,
    top: -24,
    opacity: 0.12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontFamily: FontFamily.roundedBold,
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 1,
  },
  scoreBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontFamily: FontFamily.roundedBold,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
  message: {
    fontFamily: FontFamily.roundedBold,
    fontSize: FontSize.lg,
    color: Colors.white,
    marginBottom: 18,
    lineHeight: FontSize.lg * 1.5,
  },
  meta: {
    flexDirection: 'row',
    gap: 24,
  },
  metaItem: {
    gap: 2,
  },
  metaLabel: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.8)',
  },
  metaValue: {
    fontFamily: FontFamily.roundedBold,
    fontSize: FontSize.base,
    color: Colors.white,
  },
});
