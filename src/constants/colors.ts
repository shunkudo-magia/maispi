export const Colors = {
  primary: '#da668e',
  primaryDark: '#c14e74',
  primaryLight: '#fbe7ef',
  accent: '#f6a9c4',
  text: '#2a2230',
  textSecondary: '#6b6479',
  textMuted: '#a99fb0',
  background: '#ffffff',
  backgroundAlt: '#fbf4f7',
  surface: '#fdf7fa',
  border: '#efe2ea',
  white: '#ffffff',
  black: '#000000',
  error: '#e53e3e',
  success: '#38a169',
} as const;

export const CategoryColors = {
  love:   { bg: '#da668e', light: '#fbe7ef', label: 'LOVE' },
  money:  { bg: '#d4940a', light: '#fef3d0', label: 'MONEY' },
  family: { bg: '#4eb89e', light: '#e0f5f0', label: 'FAMILY' },
  body:   { bg: '#7b68ee', light: '#ede9ff', label: 'BODY' },
  work:   { bg: '#5b8dd9', light: '#e5eeff', label: 'WORK' },
  spirit: { bg: '#e8803d', light: '#fdeee3', label: 'SPIRIT' },
} as const;

export type CategoryKey = keyof typeof CategoryColors;
