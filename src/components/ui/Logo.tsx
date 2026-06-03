import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Circle, G } from 'react-native-svg';
import { Typography } from '@/components/ui/Typography';
import { Colors, FontFamily } from '@/constants';

/**
 * まいすぴ ブランドロゴ
 *
 * コンセプト:「三日月とひらめきの光」
 *   三日月 = 月齢占い・女性性・直感
 *   きらめき = スピリチュアルな気づき・内なる光
 * 三日月がそっときらめきを抱くシンボルマーク。
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
        <LinearGradient id="maispiCrescent" x1="20" y1="14" x2="70" y2="86" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#ef9bb8" />
          <Stop offset="1" stopColor="#d4567f" />
        </LinearGradient>
        <LinearGradient id="maispiSpark" x1="60" y1="32" x2="86" y2="58" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#ffd9e6" />
          <Stop offset="1" stopColor="#f6a9c4" />
        </LinearGradient>
      </Defs>

      {/* 三日月（右側に開く） */}
      <Path
        d="M62 16 A34 34 0 1 0 62 84 A50 50 0 0 1 62 16 Z"
        fill={solid ? color : 'url(#maispiCrescent)'}
      />

      {/* きらめき（四芒星のスパークル） */}
      <Path
        d="M73 31
           Q75.3 47.7 88 50
           Q75.3 52.3 73 69
           Q70.7 52.3 58 50
           Q70.7 47.7 73 31 Z"
        fill={solid ? color : 'url(#maispiSpark)'}
        opacity={solid ? 0.85 : 1}
      />

      {/* 小さなアクセントのきらめき */}
      <Circle cx="84" cy="30" r="3" fill={solid ? color : '#f6a9c4'} opacity={solid ? 0.7 : 0.9} />
      <Circle cx="80" cy="70" r="2" fill={solid ? color : '#f6a9c4'} opacity={solid ? 0.6 : 0.8} />
    </Svg>
  );
}

export function Logo({
  size = 40,
  variant = 'horizontal',
  color,
  wordmarkColor = Colors.primary,
  style,
  accessibilityLabel = 'まいすぴ',
}: LogoProps) {
  if (variant === 'mark') {
    return (
      <View accessible accessibilityLabel={accessibilityLabel} style={style}>
        <LogoMark size={size} color={color} />
      </View>
    );
  }

  const wordmarkStyle: TextStyle = {
    fontFamily: FontFamily.minchoBold,
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
            { fontSize: size * 0.62, lineHeight: size * 0.8, letterSpacing: size * 0.02 },
          ]}
        >
          まいすぴ
        </Typography>
      </View>
    );
  }

  // horizontal
  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
      style={[styles.horizontal, { gap: size * 0.24 }, style]}
    >
      <LogoMark size={size} color={color} />
      <Typography
        style={[
          wordmarkStyle,
          { fontSize: size * 0.66, lineHeight: size * 0.85, letterSpacing: size * 0.02 },
        ]}
      >
        まいすぴ
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: { flexDirection: 'row', alignItems: 'center' },
  stacked: { alignItems: 'center' },
});

export default Logo;
