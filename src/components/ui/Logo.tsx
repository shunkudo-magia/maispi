import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { Typography } from '@/components/ui/Typography';
import { Colors, FontFamily } from '@/constants';

/**
 * まいスピ ブランドロゴ
 *
 * コンセプト:「六芒星とひらめきの光」
 *   六芒星 = 天と地・調和・スピリチュアルなシンボル
 *   きらめき = 気づき・内なる光
 * ワードマークは M+ Rounded（丸ゴシック）をゆったりした字間で。
 *
 * 形状はビューポート 0 0 100 100 を基準に定義。
 */

export type LogoVariant =
  | 'mark'        // シンボルマークのみ
  | 'horizontal'  // マーク + 横並びワードマーク
  | 'stacked';    // マーク + 縦並びワードマーク

export interface LogoProps {
  /** マークの高さ(px)。ワードマークのサイズもこれに連動。 */
  size?: number;
  variant?: LogoVariant;
  /** 単色化したいときに色を指定（モノクロ用途）。未指定ならブランドグラデーション。 */
  color?: string;
  /** ワードマークの文字色（既定: ブランドローズ） */
  wordmarkColor?: string;
  style?: StyleProp<ViewStyle>;
  /** アクセシビリティ用ラベル */
  accessibilityLabel?: string;
}

// 六芒星（上向き三角＋下向き三角）+ きらめき。0..100 ビューポート基準。
const STAR_PATH = 'M50 14 L81.18 68 L18.82 68 Z M50 86 L18.82 32 L81.18 32 Z';
const SPARK_PATH = 'M82 15 Q84.38 19.62 89 22 Q84.38 24.38 82 29 Q79.62 24.38 75 22 Q79.62 19.62 82 15 Z';

/** シンボルマーク（SVG）単体。任意のサイズで描画可能。 */
export function LogoMark({
  size = 40,
  color,
  style,
}: {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const solid = !!color;
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <Defs>
        <LinearGradient id="maispiStar" x1="20" y1="14" x2="80" y2="86" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#ef9bb8" />
          <Stop offset="1" stopColor="#d4567f" />
        </LinearGradient>
      </Defs>

      {/* 六芒星 */}
      <Path d={STAR_PATH} fill={solid ? color : 'url(#maispiStar)'} />

      {/* きらめき（四芒星のスパークル） */}
      <Path
        d={SPARK_PATH}
        fill={solid ? color : '#f6a9c4'}
        opacity={solid ? 0.85 : 1}
      />
    </Svg>
  );
}

export function Logo({
  size = 40,
  variant = 'horizontal',
  color,
  wordmarkColor = Colors.primary,
  style,
  accessibilityLabel = 'まいスピ',
}: LogoProps) {
  if (variant === 'mark') {
    return (
      <View accessible accessibilityLabel={accessibilityLabel} style={style}>
        <LogoMark size={size} color={color} />
      </View>
    );
  }

  const wordmarkStyle: TextStyle = {
    fontFamily: FontFamily.roundedBold,
    color: wordmarkColor,
    includeFontPadding: false,
  };

  if (variant === 'stacked') {
    return (
      <View
        accessible
        accessibilityLabel={accessibilityLabel}
        style={[styles.stacked, { gap: size * 0.18 }, style]}
      >
        <LogoMark size={size} color={color} />
        <Typography
          style={[
            wordmarkStyle,
            { fontSize: size * 0.6, lineHeight: size * 0.84, letterSpacing: size * 0.14 },
          ]}
        >
          まいスピ
        </Typography>
      </View>
    );
  }

  // horizontal
  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
      style={[styles.horizontal, { gap: size * 0.28 }, style]}
    >
      <LogoMark size={size} color={color} />
      <Typography
        style={[
          wordmarkStyle,
          { fontSize: size * 0.64, lineHeight: size * 0.9, letterSpacing: size * 0.14 },
        ]}
      >
        まいスピ
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: { flexDirection: 'row', alignItems: 'center' },
  stacked: { alignItems: 'center' },
});

export default Logo;
