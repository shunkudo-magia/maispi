import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Circle } from 'react-native-svg';
import { Typography } from '@/components/ui/Typography';
import { Colors, FontFamily } from '@/constants';

/**
 * まいスピ ブランドロゴ
 *
 * コンセプト:「三日月と星屑」
 *   三日月 = 月齢占い・女性性・直感
 *   星屑（きらめき） = スピリチュアルな気づき・夜空に瞬く光
 * ワードマークは Zen Maru Gothic（丸ゴシック）でやわらかく親しみやすく。
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

// 五芒星（星屑）パスを生成
function star5(cx: number, cy: number, R: number, ratio = 0.45): string {
  let d = '';
  for (let k = 0; k < 10; k++) {
    const a = ((-90 + k * 36) * Math.PI) / 180;
    const rad = k % 2 ? R * ratio : R;
    d += (k ? 'L' : 'M') + (cx + rad * Math.cos(a)).toFixed(2) + ' ' + (cy + rad * Math.sin(a)).toFixed(2) + ' ';
  }
  return d + 'Z';
}

const CRESCENT = 'M62 16 A34 34 0 1 0 62 84 A50 50 0 0 1 62 16 Z';
const STAR_BIG = star5(76, 40, 11);
const STAR_SMALL = star5(82, 64, 6);

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
  const crescentFill = solid ? color : 'url(#maispiCrescent)';
  const starFill = solid ? color : Colors.accent;
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <Defs>
        <LinearGradient id="maispiCrescent" x1="20" y1="14" x2="70" y2="86" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#ef9bb8" />
          <Stop offset="1" stopColor="#d4567f" />
        </LinearGradient>
      </Defs>

      {/* 三日月 */}
      <Path d={CRESCENT} fill={crescentFill} />

      {/* 星屑 */}
      <Path d={STAR_BIG} fill={starFill} />
      <Path d={STAR_SMALL} fill={starFill} opacity={solid ? 0.85 : 0.9} />
      <Circle cx="68" cy="74" r="2.5" fill={starFill} opacity={solid ? 0.7 : 0.8} />
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
        style={[styles.stacked, { gap: size * 0.16 }, style]}
      >
        <LogoMark size={size} color={color} />
        <Typography
          style={[
            wordmarkStyle,
            { fontSize: size * 0.64, lineHeight: size * 0.86, letterSpacing: size * 0.04 },
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
      style={[styles.horizontal, { gap: size * 0.22 }, style]}
    >
      <LogoMark size={size} color={color} />
      <Typography
        style={[
          wordmarkStyle,
          { fontSize: size * 0.68, lineHeight: size * 0.92, letterSpacing: size * 0.04 },
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
