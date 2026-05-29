import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Colors, FontFamily, FontSize } from '@/constants';

type Variant = 'heading' | 'subheading' | 'body' | 'caption' | 'label';

interface TypographyProps extends TextProps {
  variant?: Variant;
  color?: string;
}

export function Typography({ variant = 'body', color, style, ...props }: TypographyProps) {
  return (
    <Text
      style={[styles[variant], color ? { color } : undefined, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: FontFamily.minchoBold,
    fontSize: FontSize.xl,
    color: Colors.text,
    lineHeight: FontSize.xl * 1.3,
  },
  subheading: {
    fontFamily: FontFamily.minchoMedium,
    fontSize: FontSize.md,
    color: Colors.text,
    lineHeight: FontSize.md * 1.4,
  },
  body: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.text,
    lineHeight: FontSize.base * 1.6,
  },
  caption: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: FontSize.sm * 1.5,
  },
  label: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
