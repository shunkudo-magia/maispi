export const FontFamily = {
  // 見出し・ロゴ（丸ゴシック / Zen Maru Gothic）
  rounded: 'ZenMaruGothic_400Regular',
  roundedMedium: 'ZenMaruGothic_500Medium',
  roundedBold: 'ZenMaruGothic_700Bold',
  // 本文（Noto Sans JP）
  sans: 'NotoSansJP_400Regular',
  sansMedium: 'NotoSansJP_500Medium',
  sansBold: 'NotoSansJP_700Bold',
} as const;

export const FontSize = {
  xs:   11,
  sm:   13,
  base: 15,
  md:   17,
  lg:   20,
  xl:   24,
  '2xl': 28,
  '3xl': 34,
} as const;

export const LineHeight = {
  tight:  1.3,
  normal: 1.6,
  loose:  1.8,
} as const;
