import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SeoHead } from '@/components/seo/SeoHead';
import { Colors, FontFamily, FontSize } from '@/constants';

const SIMPLE_QUESTIONS = [
  {
    q: 'あなたが直感的に惹かれる景色は？',
    options: ['深い森の中', '満月の砂浜', '嵐の前の空', '夜明けの山頂'],
  },
  {
    q: '感情が揺さぶられるとき、あなたはどうする？',
    options: ['一人で静かにいる', '誰かに話す', '体を動かす', '何かを作る'],
  },
  {
    q: '自分の最大の強みだと感じるものは？',
    options: ['深く感じる力', '全体を見渡す力', '変化を起こす力', '繋ぎとめる力'],
  },
];

export default function DiagnosisFlowScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const questions = SIMPLE_QUESTIONS; // TODO: use full questions for archetype-full
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const current = questions[step];
  const progress = (step / questions.length) * 100;

  function handleSelect(i: number) {
    setSelected(i);
  }

  function handleNext() {
    if (selected === null) return;
    const next = [...answers, selected];
    setAnswers(next);
    if (step + 1 < questions.length) {
      setStep(step + 1);
      setSelected(null);
    } else {
      router.replace({ pathname: '/diagnosis/result', params: { answers: JSON.stringify(next), type } });
    }
  }

  return (
    <SafeAreaView style={styles.root} edges={['bottom']}>
      <SeoHead
        title="診断フロー｜まいスピ"
        description="アーキタイプ診断に回答するページです。"
        path="/diagnosis/flow"
        noindex
      />
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.body}>
        <Typography variant="caption" style={styles.stepLabel}>
          {step + 1} / {questions.length}
        </Typography>
        <Typography variant="heading" style={styles.question}>{current.q}</Typography>

        <View style={styles.options}>
          {current.options.map((option, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.option, selected === i && styles.optionSelected]}
              onPress={() => handleSelect(i)}
              activeOpacity={0.75}
            >
              <Typography
                style={[styles.optionText, selected === i && styles.optionTextSelected]}
              >
                {option}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label={step + 1 < questions.length ? '次へ' : '結果を見る'}
          onPress={handleNext}
          disabled={selected === null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  progressBar: {
    height: 3,
    backgroundColor: Colors.border,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  body: { flex: 1, padding: 24, gap: 24 },
  stepLabel: { marginTop: 8 },
  question: { fontSize: FontSize.xl, lineHeight: FontSize.xl * 1.4 },
  options: { gap: 12 },
  option: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  optionText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.text,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontFamily: FontFamily.sansMedium,
  },
  footer: {
    padding: 24,
    paddingBottom: 32,
  },
});
