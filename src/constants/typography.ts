export const FontFamily = {
  mincho: 'ShipporiMincho_400Regular',
  minchoMedium: 'ShipporiMincho_500Medium',
  minchoBold: 'ShipporiMincho_700Bold',
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
