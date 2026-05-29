import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { Colors, FontFamily, FontSize } from '@/constants';

interface ArticleBodyProps {
  html: string;
}

const tagsStyles = {
  body: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.text,
    lineHeight: FontSize.base * 1.9,
  },
  p: {
    marginBottom: 16,
    marginTop: 0,
  },
  h2: {
    fontFamily: FontFamily.minchoBold,
    fontSize: FontSize.lg,
    color: Colors.text,
    marginTop: 28,
    marginBottom: 8,
    lineHeight: FontSize.lg * 1.4,
  },
  h3: {
    fontFamily: FontFamily.minchoMedium,
    fontSize: FontSize.md,
    color: Colors.text,
    marginTop: 20,
    marginBottom: 6,
  },
  a: {
    color: Colors.primary,
    textDecorationLine: 'none' as const,
  },
  strong: {
    fontFamily: FontFamily.sansBold,
  },
} as const;

const systemFonts = [
  ...defaultSystemFonts,
  FontFamily.sans,
  FontFamily.sansMedium,
  FontFamily.sansBold,
  FontFamily.mincho,
  FontFamily.minchoMedium,
  FontFamily.minchoBold,
];

export function ArticleBody({ html }: ArticleBodyProps) {
  const { width } = useWindowDimensions();
  return (
    <RenderHtml
      contentWidth={width - 48}
      source={{ html }}
      tagsStyles={tagsStyles}
      systemFonts={systemFonts}
    />
  );
}
