import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Colors, FontSize } from '@/constants';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    title: '今日の運気を\n毎朝チェック',
    body: '気圧・月齢・あなたの属性から\nパーソナルな運気を算出します',
    bg: Colors.primaryLight,
  },
  {
    title: 'アーキタイプ診断で\n自分を知る',
    body: '3問2分の診断で\nあなたの本質タイプがわかります',
    bg: '#e5eeff',
  },
  {
    title: '運気の記録を\n積み重ねる',
    body: '30日の推移グラフとメモで\n自分のリズムが見えてきます',
    bg: '#e0f5f0',
  },
] as const;

export default function OnboardingScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    setPage(next);
  }

  function handleNext() {
    if (page < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (page + 1) * width, animated: true });
    } else {
      // TODO: save onboarding completion flag
      router.replace('/(tabs)');
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {SLIDES.map((slide, i) => (
          <View key={i} style={[styles.slide, { backgroundColor: slide.bg, width }]}>
            <View style={styles.illustrationPlaceholder} />
            <Typography variant="heading" style={styles.title}>{slide.title}</Typography>
            <Typography variant="body" style={styles.body}>{slide.body}</Typography>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === page && styles.dotActive]} />
          ))}
        </View>
        <Button
          label={page === SLIDES.length - 1 ? 'LINEではじめる' : '次へ'}
          onPress={handleNext}
          style={styles.btn}
        />
        {page < SLIDES.length - 1 && (
          <Button
            variant="ghost"
            label="スキップ"
            onPress={() => router.replace('/(tabs)')}
            style={styles.skipBtn}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  illustrationPlaceholder: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: Colors.primaryLight,
    marginBottom: 40,
  },
  title: {
    fontSize: FontSize['2xl'],
    textAlign: 'center',
    marginBottom: 16,
  },
  body: {
    textAlign: 'center',
    color: Colors.textSecondary,
    lineHeight: FontSize.base * 1.8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 8,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border,
  },
  dotActive: {
    width: 20,
    backgroundColor: Colors.primary,
  },
  btn: {
    width: '100%',
  },
  skipBtn: {
    paddingVertical: 8,
  },
});
