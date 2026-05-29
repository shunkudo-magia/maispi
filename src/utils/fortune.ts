export function calcFortuneScore(moonAge: number, birthdate?: string): number {
  // placeholder: combine moon phase (0–29.5) with birth date numerology
  const moonFactor = Math.abs(Math.sin((moonAge / 29.53) * Math.PI)) * 40 + 40;

  if (!birthdate) return Math.round(moonFactor);

  const dateNum = birthdate.replace(/-/g, '').split('').reduce((acc, d) => acc + Number(d), 0);
  const birthFactor = ((dateNum % 20) - 10) * 1;

  return Math.min(99, Math.max(1, Math.round(moonFactor + birthFactor)));
}

export function getMoonPhaseName(moonAge: number): string {
  if (moonAge < 1.85) return '新月';
  if (moonAge < 7.38) return '三日月';
  if (moonAge < 9.22) return '上弦の月';
  if (moonAge < 12.92) return '十日夜';
  if (moonAge < 16.61) return '満月';
  if (moonAge < 20.30) return '十六夜';
  if (moonAge < 22.15) return '下弦の月';
  if (moonAge < 25.84) return '二十三夜';
  return '晦日月';
}
