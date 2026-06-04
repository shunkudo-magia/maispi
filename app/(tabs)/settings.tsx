import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Colors, FontFamily, FontSize } from '@/constants';
import { LegalLinks } from '@/constants/legal';

export default function SettingsScreen() {
  const [morningNotif, setMorningNotif] = useState(true);
  const [moonNotif, setMoonNotif] = useState(true);
  const [featureNotif, setFeatureNotif] = useState(false);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Typography variant="heading" style={styles.pageTitle}>設定</Typography>

        {/* Account */}
        <Card style={styles.section}>
          <Typography variant="label" style={styles.sectionLabel}>アカウント</Typography>
          <SettingRow label="LINEアカウント" value="未連携" onPress={() => {}} />
          <SettingRow label="ニックネーム" value="未設定" onPress={() => {}} />
          <SettingRow label="生年月日" value="未設定" onPress={() => {}} />
        </Card>

        {/* Notifications */}
        <Card style={styles.section}>
          <Typography variant="label" style={styles.sectionLabel}>通知</Typography>
          <ToggleRow
            label="朝7時の運気通知"
            value={morningNotif}
            onValueChange={setMorningNotif}
          />
          <ToggleRow
            label="満月・新月リマインド"
            value={moonNotif}
            onValueChange={setMoonNotif}
          />
          <ToggleRow
            label="特集記事の新着"
            value={featureNotif}
            onValueChange={setFeatureNotif}
          />
        </Card>

        {/* Subscription */}
        <Card style={[styles.section, styles.premiumCard]}>
          <Typography variant="label" style={[styles.sectionLabel, { color: '#d4940a' }]}>
            PREMIUM
          </Typography>
          <Typography variant="subheading" style={styles.premiumTitle}>
            全次元診断をアンロック
          </Typography>
          <Typography variant="caption">
            広告除去 + 全次元診断 ¥480/月
          </Typography>
          <TouchableOpacity style={styles.premiumBtn} activeOpacity={0.75}>
            <Typography style={styles.premiumBtnText}>プレミアムを見る</Typography>
          </TouchableOpacity>
        </Card>

        {/* About */}
        <Card style={styles.section}>
          <Typography variant="label" style={styles.sectionLabel}>アプリについて</Typography>
          {LegalLinks.map((link) => (
            <SettingRow
              key={link.slug}
              label={link.label}
              onPress={() => router.push({ pathname: '/legal/[doc]', params: { doc: link.slug } })}
            />
          ))}
          <SettingRow label="バージョン" value="0.1.0" />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({
  label,
  value,
  onPress,
}: {
  label: string;
  value?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.6}
    >
      <Typography variant="body">{label}</Typography>
      <Typography variant="caption">{value ?? '›'}</Typography>
    </TouchableOpacity>
  );
}

function ToggleRow({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <Typography variant="body">{label}</Typography>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ true: Colors.primary, false: Colors.border }}
        thumbColor={Colors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.backgroundAlt },
  content: { padding: 16, gap: 16, paddingBottom: 40 },
  pageTitle: { marginBottom: 8 },
  section: { gap: 0 },
  sectionLabel: { marginBottom: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  premiumCard: { backgroundColor: '#fffbeb', borderWidth: 1, borderColor: '#f0d080' },
  premiumTitle: { fontSize: FontSize.base },
  premiumBtn: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#d4940a',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  premiumBtnText: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.sm,
    color: Colors.white,
  },
});
